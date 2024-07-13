export type Attachment = {
    id: number | string;
    name: string;
    size: number;
    type: string;
    url: string;
  };
  
  
  export type Email = {
    id: number | string;
    subject: string;
    sender: string;
    address: string;
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
    inReplyTo: Email[]
  };
  
  
  