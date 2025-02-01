import { Router } from "express";
import { PaymentController } from "../controllers/payment";
import { SettingsAccountController } from "../controllers/upload";
import upload from "../middleware/upload";
import { EventController } from "../controllers/event";
import { AuthController } from "../controllers/auth";

export const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/auth/login", new AuthController().loginWithEmail);

router.post("/auth/logout", new AuthController().requestLogout);

router.post("/payment/amount", new PaymentController().paymentAmount);

router.post("/payment/intent", new PaymentController().generatePaymentIntent);

router.post("/events/image/upload", upload.single("image"), new EventController().uploadImage);

router.post(
  "/settings/account/image/upload",
  upload.single("image_profile"),
  new SettingsAccountController().uploadImage
);

router.post("/settings/account/image/delete", new SettingsAccountController().deleteImage);
