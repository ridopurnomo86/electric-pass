import { Router } from "express";
import { UploadController } from "../controllers/upload";
import upload from "../middleware/upload";

export const router = Router();

router.post("/upload", upload.single("image_profile"), new UploadController().uploadImage);
