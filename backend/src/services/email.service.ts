import { ParsedMail, simpleParser } from "mailparser";
import { logger } from "../utils/logger";
import { closeImapClient, getSecureImapClient } from "../config/imapClient";
import { Attachment, Email, PaginatedResponse } from "../types";
import { createTransporter } from "@/config/smpt.config";
import { getUserById } from "./auth.service";

export async function SendEmail(userId: string, email: Email) {
  
  const {username, password} = await getUserById(userId)

  const transporter = createTransporter({username, password})
  try {
    await transporter.sendMail({
      from: `"${email.sender}" <${email.sender}>}`
    })
    await transporter.sendMail({});
  } catch (error) {}
}


function getAddressText(address: AddressObject | AddressObject[] | undefined): string {
  if (!address) {
    return "";
  }
  if (Array.isArray(address)) {
    return address.map(addr => addr.text).join(', ');
  }
  return address.text || "";
}

export async function fetchEmails(
  folder: string,
  page: number = 1,
  limit: number = 20
): Promise<PaginatedResponse<Email>> {
  const client = await getSecureImapClient();
  const mailboxLock = await client.getMailboxLock(folder, {readonly: true});
  try {
    const since = new Date();
    since.setDate(since.getDate() - 30); // Get emails from the last 30 days

    const messages = await client.search({ since }, { uid: true });

    const start = (page - 1) * limit;
    const end = start + limit;
    const messageUIDs = messages.slice(start, end);

    const emailPromises = messageUIDs.map(async (uid) => {

      const fetchGenerator = await client.fetch(String(uid), {source: true, flags: true});

      const {value: message} = await fetchGenerator.next()

      if (!message) {
        throw new Error(`Message with UID ${uid} not found`);
      }


      const parsed: ParsedMail = await simpleParser(message.source);

      const email: Email = {
        id: String(uid),
        subject: parsed.subject || "",
        sender: parsed.from?.text || "",
        recipients: {
          to: getAddressText(parsed.to) || "",
          cc: getAddressText(parsed.cc) || "",
          bcc: getAddressText(parsed.bcc) || "",
        },
        preview: parsed.text?.substring(0, 100) || "",
        timestamp: parsed.date?.getTime() || Date.now(),
        flags: message.flags || [],
        labels: [], // Implement label fetching if supported by your IMAP server
        attachments: parsed.attachments.map((att): Attachment => ({
          id: att.contentId || '',
          filename: att.filename || "",
          contentType: att.contentType,
          size: att.size,
          // Don't include content here, implement separate fetching for attachments
        })),
        priority: parsed.priority,
        inReplyTo: parsed.inReplyTo || [],
        headers: parsed.headers,
        
        body: parsed.html || parsed.textAsHtml || "",
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
  const client = await getSecureImapClient();
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


// export async function toggleStarred(uid: string): Prmose<boolean | null>{
//   try {
    
//   } catch (error) {
//     throw error
//   }
// }
// export async function toggleRead(uid: string): Prmose<boolean | null>{
//   try {
    
//   } catch (error) {
//     throw error
//   }
// }
