const express = require("express");
const {
  getAllUsers,
  registerUser,
  loginController,
} = require("../controller/userController");
const router = express.Router();

router.get("/all-users", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginController);

module.exports = router;
