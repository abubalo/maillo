import { randomBytes, randomUUID } from "crypto";
import { Email } from "../types";
import { formatSenderName } from "@/services/maillo.service";
import { encodeQuotedPrintable } from "@utils/encodeQuotedPrintable";

export async function createMimeMessage(
  email: Partial<Email>,
  user: any
): Promise<string> {
  
  const boundary = `----=_NextPart_${randomUUID()}`;
  const messageId =
    email.messageId || `<${randomUUID()}@${user.email.split("@")[1]}>`;

  let mimeMessage = "";
  mimeMessage += `Message-ID: ${messageId}\r\n`;
  mimeMessage += `Date: ${new Date().toUTCString()}\r\n`;
  mimeMessage += `From: ${formatSenderName(
    user.firstName,
    user.lastName,
    user.email
  )}\r\n`;
  mimeMessage += `To: ${email.recipients?.to?.join(", ")}\r\n`;

  if (email.recipients?.cc?.length) {
    mimeMessage += `Cc: ${email.recipients.cc.join(", ")}\r\n`;
  }
  if (email.recipients?.bcc?.length) {
    mimeMessage += `Bcc: ${email.recipients.bcc.join(", ")}\r\n`;
  }

  mimeMessage += `Subject: ${email.subject || "(No subject)"}\r\n`;
  mimeMessage += `MIME-Version: 1.0\r\n`;

  // Set up multipart content if needed
  if (email.attachments?.length || (email.text && email.body)) {
    mimeMessage += `Content-Type: multipart/mixed; boundary="${boundary}"\r\n\r\n`;

    // Add alternative parts if text and HTML are both present
    if (email.text && email.body) {
      const alternativeBoundary = `----=${randomBytes(12).toString("hex")}`;
      mimeMessage += `--${boundary}\r\n`;
      mimeMessage += `Content-Type: multipart/alternative; boundary="${alternativeBoundary}"\r\n\r\n`;

      // Plain text part
      mimeMessage += `--${alternativeBoundary}\r\n`;
      mimeMessage += `Content-Type: text/plain; charset=utf-8\r\n`;
      mimeMessage += `Content-Transfer-Encoding: quoted-printable\r\n\r\n`;
      mimeMessage += encodeQuotedPrintable(email.text) + `\r\n\r\n`;

      // HTML part
      mimeMessage += `--${alternativeBoundary}\r\n`;
      mimeMessage += `Content-Type: text/html; charset=utf-8\r\n`;
      mimeMessage += `Content-Transfer-Encoding: quoted-printable\r\n\r\n`;
      mimeMessage += encodeQuotedPrintable(email.body) + `\r\n\r\n`;
      mimeMessage += `--${alternativeBoundary}--\r\n`;
    } else {
      // Single part (either text or HTML)
      mimeMessage += `--${boundary}\r\n`;
      const contentType = email.body ? "text/html" : "text/plain";
      mimeMessage += `Content-Type: ${contentType}; charset=utf-8\r\n`;
      mimeMessage += `Content-Transfer-Encoding: quoted-printable\r\n\r\n`;
      mimeMessage +=
        encodeQuotedPrintable(email.body || email.text || "") + `\r\n\r\n`;
    }

    // Attachments
    for (const attachment of email.attachments || []) {
      mimeMessage += `--${boundary}\r\n`;
      const mimeType = attachment.contentType || "application/octet-stream";
      mimeMessage += `Content-Type: ${mimeType}; name="${attachment.filename}"\r\n`;
      mimeMessage += `Content-Disposition: attachment; filename="${attachment.filename}"\r\n`;
      mimeMessage += `Content-Transfer-Encoding: base64\r\n\r\n`;
      mimeMessage += attachment.content?.toString("base64") + `\r\n\r\n`;
    }

    mimeMessage += `--${boundary}--\r\n`;
  } else {
    // Simple message with one body part
    const contentType = email.body ? "text/html" : "text/plain";
    mimeMessage += `Content-Type: ${contentType}; charset=utf-8\r\n`;
    mimeMessage += `Content-Transfer-Encoding: quoted-printable\r\n\r\n`;
    mimeMessage +=
      encodeQuotedPrintable(email.body || email.text || "") + `\r\n`;
  }

  return mimeMessage;
}
