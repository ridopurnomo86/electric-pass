import { Router } from "express";
import { UploadController } from "../controllers/upload";
import upload from "../middleware/upload";
import { validateToken } from "../middleware/validate-token";

export const router = Router();

router.post(
  "/upload",
  [upload.single("image_profile"), validateToken],
  new UploadController().uploadImage
);
