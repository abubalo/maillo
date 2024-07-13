import { create } from "zustand";
import { Email } from "../types";
import { data } from "./data";

interface DialogState {
  isComposeEmailOpen: boolean;
  openComposeEmail: () => void;
  closeComposeEmail: () => void;
}

interface AttachmentFile {
  name: string;
  file: File;
  type: string;
}

export interface ComposeEmailState {
  to: string;
  subject: string;
  body: string;
  attachments: AttachmentFile[];
  setTo: (to: string) => void;
  setSubject: (subject: string) => void;
  setBody: (body: string) => void;
  addAttachments: (attachments: AttachmentFile[]) => void;
  removeAttachment: (index: number) => void;
  clearAttachments: () => void;
}

export interface EmailStoreState {
  emails: Email[];
  deletedEmails: Email[];
  searchQuery: string;
  view: string;
  reply: Email;
  setEmails: (emails: Email[]) => void;
  setView: (view: string) => void;
  setSearchQuery: (query: string) => void;
  handleSelectEmail: (id: string | number) => void;
  handleSelectAll: () => void;
  handleStarEmail: (id: string | number) => void;
  handleMarkAsRead: (id: string | number) => void;
  handleMarkAllAsRead: () => void;
  handleMarkAsUnread: (id: string | number) => void;
  handleMarkAllUnread: () => void;
  handleDeleteEmail: (id: string | number) => void;
  handleDeleteAllEmail: () => void;
  handleUndoDeleteEmail: () => void;
  handleReply: () => void;
  handleReplyAll: () => void;
  handleForward: () => void;
  handleSentEmail: (id: string | number) => void;
  handleBinEmail: (id: string | number) => void;
  handleMarkAsSpamEmail: (id: string | number) => void;
  handleArchiveEmail: (id: string | number) => void;
}


export const useDialogStore = create<DialogState>((set) => ({
  isComposeEmailOpen: false,
  openComposeEmail: () => set({ isComposeEmailOpen: true }),
  closeComposeEmail: () => set({ isComposeEmailOpen: false }),
}));

export const useComposeEmailStore = create<ComposeEmailState>((set) => ({
  to: "",
  subject: "",
  body: "",
  attachments: [],
  setTo: (to) => set({ to }),
  setSubject: (subject) => set({ subject }),
  setBody: (body) => set({ body }),
  addAttachments: (newAttachments) =>
    set((state) => ({
      attachments: [...state.attachments, ...newAttachments],
    })),
  removeAttachment: (index) =>
    set((state) => ({
      attachments: state.attachments.filter((_, i) => i !== index),
    })),
  clearAttachments: () => set({ attachments: [] }),
}));

export const useEmailStoreState = create<EmailStoreState>((set) => ({
  emails: data,
  deletedEmails: [],
  view: "inbox",
  searchQuery: "",
  setEmails: (emails) => set({ emails }),
  setView: (view) => set({ view }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  handleSelectEmail: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, isSelected: !email.isSelected } : email
      ),
    })),
  handleSelectAll: () =>
    set((state) => {
      const allSelected = state.emails.every((email) => email.isSelected);
      return {
        emails: state.emails.map((email) => ({
          ...email,
          isSelected: !allSelected,
        })),
      };
    }),

  handleStarEmail: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, isStarred: !email.isStarred } : email
      ),
    })),
  handleSentEmail: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id
          ? { ...email, isDraft: false, isArchived: false, isDeleted: false }
          : email
      ),
    })),
  handleMarkAsRead: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, isUnread: false } : email
      ),
    })),
  handleMarkAsUnread: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, isUnread: true } : email
      ),
    })),
  handleMarkAllAsRead: () =>
    set((state) => ({
      emails: state.emails.map((email) => ({ ...email, isUnread: false })),
    })),
  handleMarkAllUnread: () =>
    set((state) => ({
      emails: state.emails.map((email) => ({ ...email, isUnread: true })),
    })),
  handleMarkAsSpamEmail: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, isSpam: true, isDeleted: false } : email
      ),
    })),
  handleReply: () =>
    set((state) => {
      useComposeEmailStore.setState({
        to: state.reply.sender,
        subject: `Re ${state.reply.subject}`,
        body: `\n\nOn ${new Date(state.reply.timestamp).toLocaleString()}, ${
          state.reply.sender
        } wrote:\n${state.reply.body}`,
      });
      useDialogStore.setState({ isComposeEmailOpen: true });
    }),
  // handleReplyAll: () =>
  //   set((state) => {
  //     useComposeEmailStore.setState({
  //       to: [state.reply.sender, ...state.reply.cc ].join(", "),
  //       subject: `Re ${state.reply.subject}`,
  //       body: `\n\nOn ${new Date(state.reply.timestamp).toLocaleString()}, ${
  //         state.reply.sender
  //       } wrote:\n${state.reply.body}`,
  //     });
  //     useDialogStore.setState({ isComposeEmailOpen: true });
  //   }),

  onForward: () => set((state) => {}),

  handleDeleteEmail: (id) =>
    set((state) => {
      const emailToDelete = state.emails.find((email) => email.id === id);
      return emailToDelete
        ? {
            emails: state.emails.map((email) =>
              email.id === id
                ? { ...email, isDeleted: true, isSpam: false, isDraft: false }
                : email
            ),
            deletedEmails: [...state.deletedEmails, emailToDelete],
          }
        : state;
    }),
  handleDeleteAllEmail: () =>
    set((state) => {
      const emailsToDelete = state.emails.map((email) => ({
        ...email,
        isDeleted: true,
        isSpam: false,
        isDraft: false,
      }));

      return {
        emails: emailsToDelete,
        deletedEmails: [...state.deletedEmails, ...state.emails],
      };
    }),
  handleUndoDeleteEmail: () =>
    set((state) => {
      const lastDeletedEmail =
        state.deletedEmails[state.deletedEmails.length - 1];
      if (!lastDeletedEmail) return state;
      return {
        emails: state.emails.map((email) =>
          email.id === lastDeletedEmail.id
            ? { ...email, isDeleted: false }
            : email
        ),
        deletedEmails: state.deletedEmails.filter(
          (email) => email.id !== lastDeletedEmail.id
        ),
      };
    }),
  handleArchiveEmail: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, isArchived: true } : email
      ),
    })),
}));
