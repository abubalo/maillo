import { AddressObject, ParsedMail, simpleParser } from "mailparser";
import { logger } from "../utils/logger";
import {
  getSecureImapClient,
  releaseImapClient,
  ImapClient,
} from "../config/imapClient";
import { Attachment, Email, Folder, PaginatedResponse } from "../types";
import { createTransporter } from "@/config/smtp.config";
import { getUserFromCache } from "@/utils/user.cache";
import { MailloServiceError } from "@/errors/errors";

interface EmailError {
  message: string;
  status?: number;
  originalError?: unknown;
}

const createEmailError = (
  message: string,
  status?: number,
  originalError?: unknown
): EmailError => ({
  message,
  status,
  originalError,
});

const formatSenderName = (
  firstName: string,
  lastName: string,
  email: string
): string => `"${firstName} ${lastName}" <${email}>`;

export async function sendEmail(
  userId: string,
  email: Email
): Promise<true | EmailError> {
  const userResult = await getUserFromCache(userId);

  if (!userResult) {
    return createEmailError(`Failed to find user: `);
  }

  const { username, password, firstName, lastName } = userResult;

  if (!email.recipients.to?.length) {
    return createEmailError("No recipients specified", 400);
  }

  try {
    const transporter = createTransporter(username, password);

    await transporter.sendMail({
      from: formatSenderName(firstName, lastName, username),
      to: email.recipients.to,
      cc: email.recipients.cc || [],
      bcc: email.recipients.bcc || [],
      subject: email.subject,
      text: email.text,
      html: email.body,
      attachments: email.attachments.map((att) => ({
        filename: att.filename,
        content: att.content,
        contentType: att.contentType,
      })),
    });

    logger.info(`Email sent successfully by user ${userId}`);
    return true;
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    logger.error(`Error sending email: ${errorMessage}`);

    return createEmailError("Failed to send email", 500, error);
  }
}

export async function handleEmailSending(userId: string, emailData: Email) {
  const result = await sendEmail(userId, emailData);

  if (result === true) {
    console.log("Email sent successfully");
    return true;
  }

  switch (result.status) {
    case 404:
      console.error("User not found");
      break;
    case 400:
      console.error("Invalid email data:", result.message);
      break;
    case 500:
      console.error("Server error:", result.message);
      break;
    default:
      console.error("Unknown error:", result.message);
  }

  return false;
}

function _getAddressText(
  address: AddressObject | AddressObject[] | undefined
): string {
  if (!address) {
    return "";
  }
  if (Array.isArray(address)) {
    return address.map((addr) => addr.text).join(", ");
  }
  return address.text || "";
}

function getAddressText(
  addresses: AddressObject | AddressObject[] | undefined
): string {
  if (!addresses) return "";
  const addressList = Array.isArray(addresses) ? addresses : [addresses];
  return addressList
    .flatMap((addr) => addr.value.map((emailObj) => emailObj.address || ""))
    .join(", ");
}

export async function fetchEmails(
  userId: string,
  folder: Folder,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResponse<Email> | EmailError> {
  const user = await getUserFromCache(userId);

  if (!user) {
    return createEmailError("Failed to get user", 404);
  }

  const { email, password } = user;

  let imapClient: ImapClient | null = null;
  try {
    imapClient = await getSecureImapClient(userId, email, password);

    if (!imapClient) {
      throw new Error("Failed to acquire IMAP client");
    }

    const mailboxLock = await imapClient.client.getMailboxLock(folder, {
      readonly: true,
    });
    try {
      const since = new Date();
      since.setDate(since.getDate() - 30);

      const messages = await imapClient.client.search({ since }, { uid: true });

      const start = (page - 1) * limit;
      const end = start + limit;
      const messageUIDs = messages.slice(start, end);

      const emailPromises = messageUIDs.map(async (uid) => {
        const fetchGenerator = imapClient?.client.fetch(String(uid), {
          source: true,
          flags: true,
        });
        const { value: message } = (await fetchGenerator?.next()) || {};

        if (!message) {
          throw new Error(`Message with UID ${uid} not found`);
        }

        const parsed: ParsedMail = await simpleParser(message.source);

        const email: Email = {
          id: String(uid),
          headers: parsed.headers,
          subject: parsed.subject || "",
          sender: parsed.from?.text || "",
          recipients: {
            to: getAddressText(parsed.to) || "",
            cc: getAddressText(parsed.cc) || "",
            bcc: getAddressText(parsed.bcc) || "",
          },
          text: parsed.text?.substring(0, 100) || "",
          date: parsed.date,
          flags: new Set(message.flags || []),
          attachments: parsed.attachments.map(
            (att): Attachment => ({
              id: att.contentId || "",
              filename: att.filename || "",
              contentType: att.contentType,
              size: att.size,
            })
          ),
          priority: parsed.priority,
          inReplyTo: parsed.inReplyTo || [],
          replyTo: parsed.replyTo,
          body: parsed.html || parsed.textAsHtml || "",
          isRead: message.flags.has("\\Seen"),
          isStarred: message.flags.has("\\Flagged"),
          isSelected: false,
          isDraft: message.flags.has("\\Draft"),
          isSpam: folder.toLowerCase() === "spam",
          isDeleted: message.flags.has("\\Deleted"),
          isArchived: folder.toLowerCase() === "archive",
        };

        return email;
      });

      const emails = await Promise.all(emailPromises);
      const totalPages = Math.ceil(messages.length / limit);

      return {
        emails,
        page,
        totalPages,
      };
    } finally {
      mailboxLock.release();
      await releaseImapClient(imapClient);
    }
  } catch (error) {
    logger.error("Error fetching emails", { error });
    throw error;
  }
}
export async function getEmailById(
  userId: string,
  emailUid: string
): Promise<Email | EmailError> {
  let imapClient: ImapClient | null = null;
  try {
    const user = await getUserFromCache(userId);

    if (!user) {
      return createEmailError(`Failed to find user`, 404);
    }

    const { email, password } = user;

    imapClient = await getSecureImapClient(userId, email, password);

    if (!imapClient) {
      throw new Error("Failed to acquire IMAP client");
    }

    const folders: Folder[] = [
      "INBOX",
      "Sent",
      "Draft",
      "Archive",
      "Spam",
      "Trash",
    ];

    for (const folder of folders) {
      const mailboxLock = await imapClient.client.getMailboxLock(folder, {
        readonly: true,
      });

      try {
        const fetchGenerator = imapClient.client.fetch(emailUid, {
          source: true,
          flags: true,
        });

        const { value: message, done } = await fetchGenerator.next();

        if (!done && message) {
          const parsed: ParsedMail = await simpleParser(message.source);

          const isRecipient = Array.isArray(parsed.to)
            ? parsed.to.some((addr) =>
                addr.value.some(
                  (emailObj) =>
                    emailObj.address?.toLowerCase() === email.toLowerCase()
                )
              )
            : parsed.to?.value.some(
                (emailObj) =>
                  emailObj.address?.toLowerCase() === email.toLowerCase()
              );

          const isSender = parsed.from?.value?.some(
            (addr) => addr.address?.toLowerCase() === email.toLowerCase()
          );

          if (!isRecipient && !isSender) {
            return createEmailError("Unauthorized access to email", 403);
          }

          return {
            id: emailUid,
            messageId: parsed.messageId,
            headers: parsed.headers,
            subject: parsed.subject || "",
            sender: parsed.from?.text || "",
            recipients: {
              to: getAddressText(parsed.to) || "",
              cc: getAddressText(parsed.cc) || "",
              bcc: getAddressText(parsed.bcc) || "",
            },
            text: parsed.text?.substring(0, 100) || "",
            date: parsed.date,
            flags: new Set(message.flags || []),
            attachments: parsed.attachments.map(
              (att): Attachment => ({
                id: att.contentId || "",
                filename: att.filename || "",
                contentType: att.contentType,
                size: att.size,
              })
            ),
            priority: parsed.priority,
            inReplyTo: parsed.inReplyTo || [],
            replyTo: parsed.replyTo,
            body: parsed.html || parsed.textAsHtml || "",
            isRead: message.flags.has("\\Seen"),
            isStarred: message.flags.has("\\Flagged"),
            isSelected: false,
            isDraft: message.flags.has("\\Draft"),
            isSpam: folder.toLowerCase() === "spam",
            isDeleted: message.flags.has("\\Deleted"),
            isArchived: folder.toLowerCase() === "archive",
          };
        }
      } finally {
        mailboxLock.release();
      }
    }

    return createEmailError("Email not found", 404);
  } catch (error) {
    logger.error("Error fetching email by ID", { error, userId, emailUid });
    return createEmailError("Failed to fetch email", 500, error);
  } finally {
    if (imapClient) {
      await releaseImapClient(imapClient);
    }
  }
}

export async function moveEmail(
  userId: string,
  emailUid: string,
  sourceFolder: Folder,
  destinationFolder: Folder
): Promise<boolean | EmailError> {
  let imapClient: ImapClient | null = null;
  try {
    const user = await getUserFromCache(userId);

    if (!user) {
      return createEmailError(`Failed to find user`, 404);
    }

    const { email, password } = user;

    imapClient = await getSecureImapClient(userId, email, password);
    const sourceLock = await imapClient.client.getMailboxLock(sourceFolder);
    const destinationLock = await imapClient.client.getMailboxLock(
      destinationFolder
    );
    try {
      await imapClient.client.messageMove(emailUid, destinationFolder);
      logger.info(
        `Email with UID ${emailUid} moved from ${sourceFolder} to ${destinationFolder} for user ${userId}`
      );
      return true;
    } finally {
      sourceLock.release();
      destinationLock.release();
      await releaseImapClient(imapClient);
    }
  } catch (error) {
    logger.error("Error moving email", { error, userId });
    throw error;
  }
}

export async function toggleStarred(
  userId: string,
  emailUid: string,
  folder: Folder
): Promise<boolean | EmailError> {
  let imapClient: ImapClient | null = null;
  try {
    const user = await getUserFromCache(userId);

    if (!user) {
      return createEmailError(`Failed to find user`, 404);
    }

    const { email, password } = user;
    imapClient = await getSecureImapClient(userId, email, password);
    const mailboxLock = await imapClient.client.getMailboxLock(folder);
    try {
      const message = await imapClient.client.fetchOne(emailUid, {
        flags: true,
      });
      const isStarred = message.flags.has("\\Flagged");

      if (isStarred) {
        await imapClient.client.messageFlagsRemove(emailUid, ["\\Flagged"]);
      } else {
        await imapClient.client.messageFlagsAdd(emailUid, ["\\Flagged"]);
      }

      logger.info(
        `Starred status toggled for email UID ${emailUid} by user ${userId}`
      );
      return !isStarred;
    } finally {
      mailboxLock.release();
      await releaseImapClient(imapClient);
    }
  } catch (error) {
    logger.error("Error toggling starred status", { error, userId });
    throw error;
  }
}

export async function toggleRead(
  userId: string,
  emailUid: string,
  folder: Folder
): Promise<boolean | EmailError> {
  let imapClient: ImapClient | null = null;
  try {
    const user = await getUserFromCache(userId);

    if (!user) {
      return createEmailError(`Failed to find user`, 404);
    }

    const { email, password } = user;

    imapClient = await getSecureImapClient(userId, email, password);
    const mailboxLock = await imapClient.client.getMailboxLock(folder);
    try {
      const message = await imapClient.client.fetchOne(emailUid, {
        flags: true,
      });
      const isRead = message.flags.has("\\Seen");

      if (isRead) {
        await imapClient.client.messageFlagsRemove(emailUid, ["\\Seen"]);
      } else {
        await imapClient.client.messageFlagsAdd(emailUid, ["\\Seen"]);
      }

      logger.info(
        `Read status toggled for email UID ${emailUid} by user ${userId}`
      );
      return !isRead;
    } finally {
      mailboxLock.release();
      await releaseImapClient(imapClient);
    }
  } catch (error) {
    logger.error("Error toggling read status", { error, userId });
    throw new MailloServiceError("Error toggling read status");
  }
}
