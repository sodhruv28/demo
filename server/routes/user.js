const express = require("express");
const router = express.Router();
const upload = require('../middleware/multer');
const {
  isAuthenticated,
  authUser,
  isAdmin,
} = require("../controllers/authControllers");
const {
  userLogin,
  userRegister,
  userLogout,
  validateUsername,
  validateEmail,
  sendOTP,
  userUpdate,
  fetchAllUsers,
  changeRole,
  userDelete,
  Forgot,
  Reset,
  currentuser,

} = require("../controllers/userController");
const nodemailer = require("nodemailer");


// User Login Route
router.post("/login", userLogin);

// User Register Route
router.post("/register", userRegister);

// User Logout Route
router.get("/logout", isAuthenticated, userLogout);

// User Authenticate Route
router.get("/authenticate", authUser);
// router.get('/playlists',fetchAllPlaylists)

// Fetch All Users Route
router.get("/fetch-allusers", isAdmin, fetchAllUsers);

// User name available status route
router.get("/validateUsername/:username", validateUsername);

// User email available status route
router.get("/validateEmail/:email", validateEmail);

// User update Route
router.put("/update", isAuthenticated, userUpdate);

// User change role Route
router.put("/role/:userId", isAdmin, changeRole);

// User delete role Route
router.delete("/delete/:userId", isAdmin, userDelete);

// Example verification endpoint
router.get("/sendotp", sendOTP);

// Forget password
router.put('/forgot', Forgot);

// Reset password
router.post("/reset", Reset);

// Fetch current user information Route
router.get("/current-user", isAuthenticated, currentuser);


module.exports = router;
