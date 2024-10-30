import { Request, Response } from "express";
import {
  fetchEmails,
  sendEmail as sendEmailService,
  moveEmail,
  toggleStarred,
  toggleRead as toggleReadService,
  getEmailById,
} from "../services/maillo.service";
import createHttpError from "http-errors";
import { Email, Folder } from "@/types";
import { logger } from "../utils/logger";
import { MailloError } from "@/errors/errors";

export async function getEmailByFolder(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { folder } = req.params;
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const { userId } = req;

    if (!userId) {
      throw createHttpError(401, "User ID is missing");
    }

    const result = await fetchEmails(userId, folder as Folder, page, limit);

    if ("message" in result) {
      throw createHttpError(result.status || 500, result.message);
    }

    const { emails, totalPages } = result;

    res.status(200).json({ emails, page, totalPages });
  } catch (error) {
    logger.error("Error fetching emails by folder", { error });
    // return MailloError("Serv")
    res.status(500).json({ error: "Server error" });
  }
}

export async function sendEmail(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req;
    const emailData: Email = req.body;

    if (!userId) {
      throw createHttpError(401, "User ID is missing");
    }

    const result = await sendEmailService(userId, emailData);

    if (result !== true) {
      throw createHttpError(result.status || 500, result.message);
    }

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    logger.error("Error sending email", { error });
    res.status(500).json({ error: "Failed to send email" });
  }
}

export async function deleteEmail(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req;
    const { emailId, folder } = req.params;

    if (!userId) {
      throw createHttpError(401, "User ID is missing");
    }

    const result = await moveEmail(userId, emailId, folder as Folder, "Trash");

    if (result !== true) {
      throw createHttpError(result.status || 500, result.message);
    }

    res.status(200).json({ message: "Email moved to trash" });
  } catch (error) {
    logger.error("Error deleting email", { error });
    res.status(500).json({ error: "Failed to delete email" });
  }
}

export async function spamEmail(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req;
    const { emailId, folder } = req.params;

    if (!userId) {
      throw createHttpError(401, "User ID is missing");
    }

    const result = await moveEmail(userId, emailId, folder as Folder, "Spam");

    if (result !== true) {
      throw createHttpError(result.status || 500, result.message);
    }

    res.status(200).json({ message: "Email marked as spam" });
  } catch (error) {
    logger.error("Error marking email as spam", { error });
    res.status(500).json({ error: "Failed to mark email as spam" });
  }
}

export async function toggleStar(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req;
    const { emailId, folder } = req.params;

    if (!userId) {
      throw createHttpError(401, "User ID is missing");
    }

    const result = await toggleStarred(userId, emailId, folder as Folder);

    if (typeof result !== "boolean") {
      throw createHttpError(result.status || 500, result.message);
    }

    res.status(200).json({ isStarred: result });
  } catch (error) {
    logger.error("Error toggling star", { error });
    res.status(500).json({ error: "Failed to toggle star" });
  }
}

export async function toggleRead(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req;
    const { emailId, folder } = req.params;

    if (!userId) {
      throw createHttpError(401, "User ID is missing");
    }

    const result = await toggleReadService(userId, emailId, folder as Folder);

    if (typeof result !== "boolean") {
      throw createHttpError(result.status || 500, result.message);
    }

    res.status(200).json({ isRead: result });
  } catch (error) {
    logger.error("Error toggling read status", { error });
    res.status(500).json({ error: "Failed to toggle read status" });
  }
}

export async function draftEmail(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req;
    const emailData: Email = req.body;

    if (!userId) {
      throw createHttpError(401, "User ID is missing");
    }

    const result = await sendEmailService(userId, {
      ...emailData,
      isDraft: true,
    });

    if (result !== true) {
      throw createHttpError(result.status || 500, result.message);
    }

    res.status(200).json({ message: "Draft saved successfully" });
  } catch (error) {
    logger.error("Error saving draft", { error });
    res.status(500).json({ error: "Failed to save draft" });
  }
}

export async function archiveEmail(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req;
    const { emailId, folder } = req.params;

    if (!userId) {
      throw createHttpError(401, "User ID is missing");
    }

    const result = await moveEmail(
      userId,
      emailId,
      folder as Folder,
      "Archive"
    );

    if ("message" in result) {
      throw createHttpError(result.status || 500, result.message);
    }

    res.status(200).json({ message: "Email archived successfully" });
  } catch (error) {
    logger.error("Error archiving email", { error });
    res.status(500).json({ error: "Failed to archive email" });
  }
}

export async function permanentlyDeleteEmail(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { userId } = req;
    const { emailId } = req.params;

    if (!userId) {
      throw createHttpError(401, "User ID is missing");
    }

    const emailDetails = await getEmailById(userId, emailId);

    if ("message" in emailDetails) {
      throw createHttpError(emailDetails.status || 500, emailDetails.message);
    }

    if (!emailDetails.isDeleted) {
      throw createHttpError(
        400,
        "Email must be in Trash before permanent deletion"
      );
    }

    // Todo: Move to a special deletion folder or implement permanent deletion logic here
    const result = await moveEmail(userId, emailId, "Trash", "Deleted Items");

    if (result !== true) {
      throw createHttpError(result.status || 500, result.message);
    }

    res.status(200).json({ message: "Email permanently deleted" });
  } catch (error) {
    logger.error("Error permanently deleting email", { error });
    res.status(500).json({ error: "Failed to permanently delete email" });
  }
}
