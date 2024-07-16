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
  isDeleted: boolean;
  isArchived: boolean;
  labels: string[];
  attachments?: Attachment[];
  cc?: string[];
  bcc?: string[];
  body?: string;
  inReplyTo: string[] | Email[];
};

export type EmailMenuProps = {
  emails: Email[];
  allSelected: boolean;
  onSelectAll: () => void;
  onSelectEmail: (id: number | string) => void;
  onStarEmail: (id: string | number) => void;
  onDeleteEmail: (id: string | number) => void;
  onMarkAsRead: (id: string | number) => void;
  onMarkAsUnread: (id: string | number) => void;
  onArchiveEmail: (id: string | number) => void;
  onMarkAsSpam: (id: string | number) => void;
};
