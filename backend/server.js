const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

console.log("DB_URL:", process.env.DB_URL);
console.log("PORT:", process.env.PORT);

const app = express();
app.use(express.json());
app.use(cors());

const db = process.env.DB_URL;
const PORT = process.env.PORT || 7878;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error", err));

// // Define Schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { collection: "users1" } // Explicitly set collection name
);

const User = mongoose.model("User1", UserSchema);

// Fetch Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
