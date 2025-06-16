import { Router } from "express";
import AuthController from "../controllers/userController.js";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import passport from "../config/passport.js";
import { generateToken, generateRefreshToken } from "../utils/tokenUtils.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", authenticate, AuthController.logout);
router.get("/profile", authenticate, AuthController.getCurrentLoginInfo);
router.post("/change-password", authenticate, AuthController.changePassword);
// Admin routes
router.get("/", authenticate, authorize(["admin"]), AuthController.getAllUsers);
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  AuthController.deleteUser
);
router.put(
  "/:id/role",
  authenticate,
  authorize(["admin"]),
  AuthController.updateUserRole
);
//google
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get("/google/callback", (req, res, next) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    async (err, user) => {
      if (err || !user) {
        return res.redirect(
          `${process.env.CLIENT_URL}/login?error=oauth_failed`
        );
      }
      try {
        req.logIn(user, (err) => {
          if (err) {
            return res.redirect(
              `${process.env.CLIENT_URL}/login?error=login_failed`
            );
          }

          // Generate JWT tokens
          const tokenPayload = { id: user.id, email: user.email };
          const accessToken = generateToken(tokenPayload);
          const refreshToken = generateRefreshToken(tokenPayload);

          // Set HTTP-only cookies for security
          res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
          });

          // Determine the redirect URL based on user role
          let redirectUrl = `${process.env.CLIENT_URL}/dashboard`;
          if (user.role === "admin") redirectUrl = `${process.env.CLIENT_URL}/dashboard/admin`;
          else if (user.role === "instructor") redirectUrl = `${process.env.CLIENT_URL}/dashboard/instructor`;
          else if (user.role === "student") redirectUrl = `${process.env.CLIENT_URL}/dashboard/student`;      

          // Redirect to the appropriate dashboard
          return res.redirect(redirectUrl);
        });
      } catch (error) {
        return res.redirect(
          `${process.env.CLIENT_URL}/login?error=processing_error`
        );
      }
    }
  )(req, res, next);
});



export default router;
