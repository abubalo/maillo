import { create } from "zustand";
import { Attachment, Email } from "../types";
import { dummyData } from "./temp";

interface DialogState {
  isComposeEmailOpen: boolean;
  openComposeEmail: () => void;
  closeComposeEmail: () => void;
}

export interface ComposeEmailState {
  to: string;
  subject: string;
  body: string;
  attachments: Attachment[];
  setTo: (to: string) => void;
  setSubject: (subject: string) => void;
  setBody: (body: string) => void;
  addAttachments: (attachments: Attachment[]) => void;
  removeAttachment: (index: number) => void;
  clearAttachments: () => void;
}

export interface EmailStoreState {
  emails: Email[];
  deletedEmails: Email[];
  searchQuery: string;
  view: string;
  allSelected: boolean;
  setEmails: (emails: Email[]) => void;
  setView: (view: string) => void;
  setSearchQuery: (query: string) => void;
  onSelectEmails: (ids: string[]) => void;
  toggleAllSelected: () => void;
  onStarEmail: (id: string) => void;
  onMarkAsRead: (id: string) => void;
  onMarkAsUnread: (id: string) => void;
  onDeleteEmails: (ids: string[]) => void;
  onUndoDeleteEmail: () => void;
  onReply: (id: string) => void;
  onForward: (id: string) => void;
  onSentEmail: (id: string) => void;
  onMarkAsSpam: (ids: string[]) => void;
  onArchive: (ids: string[]) => void;
  onPermanentDelete: (ids: string[]) => void;
}

type AdvanceOptiosStore = {
  from: string;
  to: string;
  subject: string;
  hasWords: string;
  doesntHave: string;
  size: string;
  byteOption: number | string;
  dateWithin: string | number;
  hasAttachment: "yes" | "no";
  doesntIncludeChats: "yes" | "no";
  setFrom: (from: string) => void;
  setTo: (to: string) => void;
  setSubject: (subject: string) => void;
  setHasWords: (hasWords: string) => void;
  setDoesntHave: (doesntHave: string) => void;
  setSize: (size: string) => void;
  setByteOption: (byteOption: string | number) => void;
  setDateWithin: (dateWith: string | number) => void;
  setHasAttachment: (hasAttachment: "yes" | "no") => void;
  setDoesntIncludeChats: (doesntIncludeChats: "yes" | "no") => void;
};

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

export const useAdvanceSearchStore = create<AdvanceOptiosStore>((set) => ({
  from: "",
  to: "",
  subject: "",
  hasWords: "",
  doesntHave: "",
  size: "",
  byteOption: "MB",
  dateWithin: "",
  hasAttachment: "no",
  doesntIncludeChats: "yes",
  setFrom: (from) => set({ from }),
  setTo: (to) => set({ to }),
  setSubject: (subject) => set({ subject }),
  setHasWords: (hasWords) => set({ hasWords }),
  setDoesntHave: (doesntHave) => set({ doesntHave }),
  setSize: (size) => set({ size }),
  setByteOption: (byteOption) => set({ byteOption }),
  setDateWithin: (dateWithin) => set({ dateWithin }),
  setHasAttachment: (hasAttachment) => set({ hasAttachment }),
  setDoesntIncludeChats: (doesntIncludeChats) => set({ doesntIncludeChats }),
}));

export const useEmailStoreState = create<EmailStoreState>((set) => ({
  emails: dummyData,
  deletedEmails: [],
  view: "inbox",
  searchQuery: "",
  allSelected: false,
  setEmails: (emails) => set({ emails }),
  setView: (view) => set({ view }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  onSelectEmails: (ids) =>
    set((state) => {
      const updatedEmails = state.emails.map((email) =>
        ids.includes(email.id)
          ? { ...email, isSelected: !email.isSelected }
          : email
      );
      return {
        emails: updatedEmails,
        allSelected: updatedEmails.every((email) => email.isSelected),
      };
    }),

  toggleAllSelected: () =>
    set((state) => {
      const newAllSelected = !state.allSelected;
      return {
        allSelected: newAllSelected,
        emails: state.emails.map((email) => ({
          ...email,
          isSelected: newAllSelected,
        })),
      };
    }),

  onStarEmail: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, isStarred: !email.isStarred } : email
      ),
    })),

  onSentEmail: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, isDraft: false } : email
      ),
    })),

  onMarkAsRead: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, isUnread: false } : email
      ),
    })),

  onMarkAsUnread: (id) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        email.id === id ? { ...email, isUnread: true } : email
      ),
    })),

  onMarkAsSpam: (ids) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        ids.includes(email.id)
          ? { ...email, isSpam: true, isDeleted: false }
          : email
      ),
    })),

  onReply: (id) =>
    set((state) => {
      const emailToReply = state.emails.find((email) => email.id === id);
      if (emailToReply) {
        useComposeEmailStore.setState({
          to: emailToReply.sender,
          subject: `Re: ${emailToReply.subject}`,
          body: `\n\nOn ${new Date(emailToReply.timestamp).toLocaleString()}, ${
            emailToReply.sender
          } wrote:\n${emailToReply.body}`,
        });
        useDialogStore.setState({ isComposeEmailOpen: true });
      }
    }),

  onForward: (id) =>
    set((state) => {
      const emailToForward = state.emails.find((email) => email.id === id);
      if (emailToForward) {
        useComposeEmailStore.setState({
          to: "",
          subject: `Fwd: ${emailToForward.subject}`,
          body: `\n\nOn ${new Date(
            emailToForward.timestamp
          ).toLocaleString()}, ${emailToForward.sender} wrote:\n${
            emailToForward.body
          }`,
        });
        useDialogStore.setState({ isComposeEmailOpen: true });
      }
    }),

  onDeleteEmails: (ids) =>
    set((state) => {
      const emailsToDelete = state.emails.filter((email) =>
        ids.includes(email.id)
      );
      const updatedEmails = state.emails.map((email) =>
        ids.includes(email.id) ? { ...email, isDeleted: true } : email
      );
      return {
        emails: updatedEmails,
        deletedEmails: [...state.deletedEmails, ...emailsToDelete],
        allSelected: updatedEmails.every((email) => email.isSelected),
      };
    }),

  onUndoDeleteEmail: () =>
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

  onArchive: (ids) =>
    set((state) => ({
      emails: state.emails.map((email) =>
        ids.includes(email.id) ? { ...email, isArchived: true } : email
      ),
    })),

  onPermanentDelete: (ids) =>
    set((state) => {
      const emailsToDelete = state.emails.filter((email) =>
        ids.includes(email.id)
      );
      return {
        emails: state.emails.map((email) =>
          ids.includes(email.id)
            ? { ...email, isPermanentlyDeleted: true }
            : email
        ),
        deletedEmails: [...state.deletedEmails, ...emailsToDelete],
      };
    }),
}));
