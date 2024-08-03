import { Router } from "express";
import { SettingsAccountController } from "../controllers/upload";
import upload from "../middleware/upload";
import { validateToken } from "../middleware/validate-token";

export const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.post(
  "/settings/account/upload",
  [upload.single("image_profile"), validateToken],
  new SettingsAccountController().uploadImage
);
