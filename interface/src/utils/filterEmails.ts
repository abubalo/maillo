import { Email } from "../types";

export function filterEmails(emails: Email[], searchQueary: string) {
  const toLower = (slug: string) => slug.toLowerCase();
  const lowerCasedQuery = toLower(searchQueary);

  const filteredEmails = emails.filter(
    (email) =>
      toLower(email.subject).includes(lowerCasedQuery) ||
      toLower(email.sender).includes(lowerCasedQuery) ||
      toLower(email.preview).includes(lowerCasedQuery)
  );

  return {
    inbox: filteredEmails.filter(
      (email) =>
        !email.isDraft &&
        !email.isSpam &&
        !email.isDeleted &&
        !email.isArchived &&
        !email.isPermanentlyDelete
    ),
    starred: filteredEmails.filter(
      (email) =>
        email.isStarred &&
        !email.isDeleted &&
        !email.isArchived &&
        !email.isPermanentlyDelete
    ),
    drafts: filteredEmails.filter(
      (email) =>
        email.isDraft &&
        !email.isSpam &&
        !email.isDeleted &&
        !email.isArchived &&
        !email.isPermanentlyDelete
    ),
    sent: filteredEmails.filter(
      (email) =>
        !email.isDraft &&
        !email.isDeleted &&
        !email.isArchived &&
        !email.isPermanentlyDelete
    ),
    spam: filteredEmails.filter(
      (email) => email.isSpam && !email.isDeleted && !email.isPermanentlyDelete
    ),
    deleted: filteredEmails.filter(
      (email) => email.isDeleted && !email.isSpam && !email.isPermanentlyDelete
    ),
  };
}
