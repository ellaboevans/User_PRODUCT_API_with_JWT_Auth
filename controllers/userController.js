const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//@ GET api/users/
//@ desc Get all users
//@ access Public

const GetUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(400).json({ message: "No users found" });
  res.json(users);
});

// @ POST api/user/register
// @ des Register a user
// @ access Public

const RegisterUser = asyncHandler(async (req, res) => {
  // LET VALIDATE THE USER BEFORE WE MAKE A USER
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Checking if the user is already in the database
  const isEmailExists = await User.findOne({ email: req.body.email });
  if (isEmailExists)
    return res.status(400).json({ message: "Email already exists" });

  // Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// @ GET api/users/:userID
// @ desc Get a user with a specific id
// access Public

const GetUser = asyncHandler(async (req, res) => {
  const id = req.params.userID;
  const user = await User.findById({ _id: id });
  if (!user) res.status(404).json({ message: "User not found" });
  try {
    const singleUser = await User.findOne({ _id: id });
    res.json(singleUser);
  } catch (error) {
    res.json({ message: error.message });
  }
});
// @ PATCH api/users/:userID
// @ desc Update a user with a specific id
// access Public

const UpdateUser = asyncHandler(async (req, res) => {
  const id = req.params.userID;
  const { name, email, password } = req.body;
  const user = await User.findById({ _id: id });
  if (!user) return res.status(404).json({ message: "User not found" });
  try {
    const updatedUser = await User.updateOne(
      { _id: id },
      {
        $set: {
          name,
          email,
          password,
        },
      }
    );
    res.json(updatedUser);
  } catch (error) {
    res.json({ message: error.message });
  }
});

// @ DELETE api/users/:userID
// @ desc Delete a user with a specific id
// access Public

const DeletUser = asyncHandler(async (req, res) => {
  const id = req.params.userID;
  const user = await User.findById({ _id: id });
  if (!user) return res.status(404).json({ message: "User not found" });
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: id });
    res.json(deletedUser);
  } catch (error) {
    res.json({ message: error.message });
  }
});

const LoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // LET VALIDATE THE USER BEFORE WE MAKE A USER
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Checking if the user is in the database
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Email does not exists" });

  // PASSWORD IS CORRECT
  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ message: "Invalid password" });

  // Create and Assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).json({ token: token });
});

module.exports = {
  GetUsers,
  RegisterUser,
  GetUser,
  UpdateUser,
  DeletUser,
  LoginUser,
};
