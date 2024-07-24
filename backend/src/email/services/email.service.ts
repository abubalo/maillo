import { ParsedMail, simpleParser } from "mailparser";
import { logger } from "../../utils/logger";
import { getImapClient, closeImapClient } from "../../config/imapClient";
import { Email, PaginatedResponse } from "../../types";

export async function fetchEmails(
  folder: string,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResponse<Email>> {
  const client = await getImapClient();
  const mailboxLock = await client.getMailboxLock(folder);
  try {
    const since = new Date();
    since.setDate(since.getDate() - 30);

    const messages = await client.search({ since }, { uid: true });

    const start = (page - 1) * limit;
    const end = start + limit;
    const messageUIDs = messages.slice(start, end);

    const emailPromises = messageUIDs.map(async (uid) => {
      const downloadObject = await client.download(String(uid));
      const parsed: ParsedMail = await simpleParser(downloadObject.content);

      const email: Email = {
        id: String(uid),
        subject: parsed.subject || "",
        sender: parsed.from || "",
        address: parsed.to || "",
        preview: parsed.textAsHtml || "",
        timestamp: parsed.date?.getTime() || Date.now(),
        isUnread: false,
        isStarred: false,
        isSelected: false,
        isDraft: folder === "Drafts",
        isSpam: folder === "Spam",
        isDeleted: folder === "Trash",
        isArchived: folder === "Archive",
        labels: [],
        attachments: parsed.attachments.map((att) => ({
          id: att.contentId,
          filename: att.filename || "",
          contentType: att.contentType,
          size: att.size,
          content: att.content,
        })),
        cc: parsed.cc
          ? Array.isArray(parsed.cc)
            ? parsed.cc.map((addr) => addr.text)
            : [parsed.cc.text]
          : [],
        bcc: parsed.bcc
          ? Array.isArray(parsed.bcc)
            ? parsed.bcc.map((addr) => addr.text)
            : [parsed.bcc.text]
          : [],
        body: parsed.html || parsed.textAsHtml || "",
        inReplyTo: parsed.inReplyTo || [],
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
  } catch (error) {
    logger.error("Error fetching emails", { error });
    throw error;
  } finally {
    mailboxLock.release();
    await closeImapClient();
  }
}

export async function moveEmail(
  uid: string,
  sourceFolder: string,
  destinationFolder: string
): Promise<boolean> {
  const client = await getImapClient();
  const sourceLock = await client.getMailboxLock(sourceFolder);
  const destinationLock = await client.getMailboxLock(destinationFolder);
  try {
    await client.messageMove(uid, destinationFolder);
    logger.info(
      `Email with UID ${uid} moved from ${sourceFolder} to ${destinationFolder}`
    );
    return true;
  } catch (error) {
    logger.error("Error moving email", { error });
    throw error;
  } finally {
    sourceLock.release();
    destinationLock.release();
    await closeImapClient();
  }
}
