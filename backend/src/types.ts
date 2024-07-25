import { AddressObject } from "mailparser";
import { userSchema } from "./models/user.model";
import { Document, InferSchemaType } from "mongoose";

export type User = Partial<Omit<InferSchemaType<typeof userSchema>, '$' | '__v'>> & Document;

export type Folder = "INBOX" | "DRAFTS" | "SENT" | "SPAM" | "TRASH";

export type _Email = {
  id: number | string;
  subject: string;
  sender: string | AddressObject | AddressObject[];
  address: string | AddressObject | AddressObject[];
  preview: string;
  timestamp: number;
  isUnread: boolean;
  isStarred: boolean;
  isSelected: boolean;
  detailUrl?: string;
  isDraft: boolean;
  isSpam: boolean;
  isDeleted: boolean;
  isArchived: boolean;
  labels: string[];
  attachments?: Attachment[];
  cc?: string[];
  bcc?: string[];
  body?: string;
  inReplyTo?: string | string[];
};

export interface Email<T = any> {
  id: string;
  subject: string;
  sender: string;
  recipients: {
    to: string;
    cc: string;
    bcc: string;
  };
  preview: string;
  timestamp: number;
  flags: Set<string>;
  labels: string[];
  attachments: Attachment[];
  inReplyTo?: string[] | string;
  headers: T;
  priority?: "low" | "high" | "normal";
  body: string;

  // Added states
  isUnread: boolean;
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
