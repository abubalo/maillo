export type Email = {
    id: number | string;
    subject: string;
    sender: string;
    address: string;
    preview: string;
    timestamp: string | number;
    isUnread: boolean;
    unStared: boolean;
    isSelected: boolean;
    link: string;
  };
  
  export type EmailMenuProps = {
    emails: Email[];
    allSelected: boolean;
    onSelectAll: () => void;
    onSelectEmail: (id: number | string) => void;
  };
  