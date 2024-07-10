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
      (email) => !email.isDraft && !email.isSpam && !email.isDeleted
    ),
    starred: filteredEmails.filter((email) => email.isStarred),
    drafts: filteredEmails.filter(
      (email) => email.isDraft && !email.isSpam && !email.isDeleted
    ),
    sent: filteredEmails.filter((email) => !email.isDraft),
    spam: filteredEmails.filter((email) => email.isSpam && !email.isDeleted),
    deleted: filteredEmails.filter((email) => email.isDeleted && !email.isSpam),
  };
}
