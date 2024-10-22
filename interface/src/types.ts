

export type Attachment = {
  id: number | string;
  name: string;
  size: number;
  type: string;
  url: string;
};

export type Email = {
  id: string;
  subject: string;
  sender: string;
  address: string;
  preview: string;
  timestamp: number;
  isUnread: boolean;
  isStarred: boolean;
  isSelected: boolean;
  isDraft: boolean;
  isSpam: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  isPermanentlyDelete: boolean;
  labels: string[];
  attachments?: Attachment[];
  cc?: string[];
  bcc?: string[];
  body?: string;
  inReplyTo: Email[];
  folder: string;
};

// export type EmailMenuProps = {
//   emails: Email[];
//   allSelected: boolean;
//   onSelectAll: () => void;
//   onSelectEmail: (id: string) => void;
//   onStarEmail: (id: string) => void;
//   onDeleteEmail: (id: string) => void;
//   onMarkAsRead: (id: string) => void;
//   onMarkAsUnread: (id: string) => void;
//   onArchiveEmail: (id: string) => void;
//   onMarkAsSpam: (id: string) => void;
// };
