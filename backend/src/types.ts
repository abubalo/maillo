import { AddressObject } from "mailparser";
import { userSchema } from "./models/user.model";
import { InferSchemaType, ObjectId } from "mongoose";

export type User = InferSchemaType<typeof userSchema> & { _id: ObjectId };

export type Folder = "INBOX" | "Draft" | "Sent" | "Spam" | "Archive" | "Trash";

export interface Email<T = any> {
  id: string;
  headers: T;
  messageId?: string;
  subject: string;
  sender: string;
  recipients: {
    to: string;
    cc: string;
    bcc: string;
  };
  text: string;
  body: string;
  date?: Date;
  flags: Set<string>;
  labels?: string[];
  attachments: Attachment[];
  inReplyTo?: string[] | string;
  replyTo?: AddressObject;
  priority?: "low" | "high" | "normal";
  references?: string | string[];

  // Added states
  isRead: boolean;
  isStarred: boolean;
  isSelected: boolean;
  isDraft: boolean;
  isSpam: boolean;
  isDeleted: boolean;
  isArchived: boolean;
}

export type Attachment = {
  id?: string;
  filename: string;
  size: number;
  contentType: string;
  content?: Buffer;
};

export interface PaginatedResponse<T> {
  emails: T[];
  page: number;
  totalPages: number;
}

export type ResponseData<T> = {
  success: boolean;
  value?: T;
  errorMessage?: string;
};

declare global {
  namespace NodeJS {
    interface processEnv {
      MONGODB_URL: string;
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      user?: User;
    }
  }
}
