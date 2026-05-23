import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcryptjs";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import FoundItem from "./models/FoundItem.js";
import LostItem from "./models/LostItem.js";
import User from "./models/User.js";

const app = express();
app.use(cors());
app.use(express.json());

// ✅ For ES Modules: __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Uploads folder
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files are allowed"));
  },
});

// Serve uploaded images publicly
app.use("/uploads", express.static(uploadsDir));

// MongoDB Atlas
const MONGO_URI =
  "mongodb+srv://Amantik:student123@amantikdb.ctn3pjl.mongodb.net/AmantikDB?retryWrites=true&w=majority";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

/* =======================
   LOST & FOUND
======================= */

// GET found items (ALL)
app.get("/api/found", async (req, res) => {
  try {
    const items = await FoundItem.find().sort({ _id: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET found item by ID
app.get("/api/found/:id", async (req, res) => {
  try {
    const item = await FoundItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Found item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: "Invalid found item id" });
  }
});

// GET lost items (ALL)
app.get("/api/lost", async (req, res) => {
  try {
    const items = await LostItem.find().sort({ _id: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET lost item by ID
app.get("/api/lost/:id", async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Lost item not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: "Invalid lost item id" });
  }
});

// POST lost item (NOW SUPPORTS IMAGE UPLOAD)
app.post("/api/lost", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : (req.body.image || "placeholder.jpg");

    const item = await LostItem.create({
      ...req.body,
      image: imagePath,
    });

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST found item (NOW SUPPORTS IMAGE UPLOAD)
app.post("/api/found", upload.single("image"), async (req, res) => {
  try {
    const imagePath = req.file ? `/uploads/${req.file.filename}` : (req.body.image || "placeholder.jpg");

    const item = await FoundItem.create({
      ...req.body,
      image: imagePath,
    });

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   AUTH
======================= */

// SIGNUP
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password, college } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      college: college || "",
    });

    res.json({
      message: "Signup successful",
      userId: user._id,
      user: {
        username: user.username,
        email: user.email,
        college: user.college,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    res.json({
      message: "Login successful",
      userId: user._id,
      user: {
        username: user.username,
        email: user.email,
        college: user.college,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   USER
======================= */

app.get("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/user/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =======================
   SERVER
======================= */

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
