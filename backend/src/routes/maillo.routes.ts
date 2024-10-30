import { Router } from "express";
import {
  archiveEmail,
  deleteEmail,
  getEmailByFolder,
  sendEmail,
  spamEmail,
  toggleRead,
  toggleStar,
  draftEmail,
  permanentlyDeleteEmail
} from "@/controllers/maillo.controller";
import { validateEmailData } from "@/middleware/validation.middleware";

const router = Router();

router.get("/folder/:folder", getEmailByFolder);

router.post("/send", validateEmailData, sendEmail);
router.post("/draft", validateEmailData, draftEmail);

router.patch("/toggle-star/:emailId/:folder", toggleStar);
router.patch("/toggle-read/:emailId/:folder", toggleRead);

router.post("/archive/:emailId/:folder", archiveEmail);
router.post("/spam/:emailId/:folder", spamEmail);

router.delete("/delete/:emailId/:folder", deleteEmail);
router.delete("/permanent-delete/:emailId", permanentlyDeleteEmail);

router.get("/search", (req, res) => {
  // TODO: Implement email search functionality
  res.status(501).json({ message: "Search functionality coming soon" });
});

router.get("/stats", (req, res) => {
  // TODO: Implement email statistics
  res.status(501).json({ message: "Email statistics coming soon" });
});

const emailRoutes = router;

export default emailRoutes;