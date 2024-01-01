import User from "../models/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating the new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User Created Successfully" });
  } catch (err) {
    console.error(err); // Log the error for debugging

    // Handle specific error types if possible
    if (err.name === "ValidationError") {
      // Mongoose validation error
      return res.status(400).json({ message: err.message });
    }

    // For other types of errors, send a generic message
    res
      .status(500)
      .json({ message: "An error occurred while creating the user" });
  }
};
