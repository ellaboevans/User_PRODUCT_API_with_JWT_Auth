const express = require("express");
const router = express.Router();

const {
  GetUsers,
  RegisterUser,
  GetUser,
  UpdateUser,
  DeletUser,
  LoginUser,
} = require("../controllers/userController");

// Imports Routes
router.get("/", GetUsers);

router.post("/register", RegisterUser);

// Get a specific user
router.get("/:userID", GetUser);

// Update a user
router.patch("/:userID", UpdateUser);

// Delete a user
router.delete("/:userID", DeletUser);

// LOGIN
router.post("/login", LoginUser);

module.exports = router;
