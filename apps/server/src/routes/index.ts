import { Router } from "express";
import { PaymentController } from "../controllers/payment";
import { SettingsAccountController } from "../controllers/upload";
import upload from "../middleware/upload";
import { EventController } from "../controllers/event";
import { AuthController } from "../controllers/auth";
import AuthMiddleware from "../middleware/auth";

export const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/auth/email", new AuthController().loginWithEmail);

router.post("/auth/logout", new AuthController().requestLogout);

router.post("/payment/amount", AuthMiddleware.requireAuth, new PaymentController().paymentAmount);

router.post("/payment/order", AuthMiddleware.requireAuth, new PaymentController().paymentOrder);

router.post(
  "/payment/intent",
  AuthMiddleware.requireAuth,
  new PaymentController().generatePaymentIntent
);

router.post(
  "/events/image/upload",
  [AuthMiddleware.requireAuth, upload.single("image")],
  new EventController().uploadImage
);

router.post(
  "/settings/account/image/upload",
  [AuthMiddleware.requireAuth, upload.single("image_profile")],
  new SettingsAccountController().uploadImage
);

router.post(
  "/settings/account/image/delete",
  AuthMiddleware.requireAuth,
  new SettingsAccountController().deleteImage
);
