const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ error: "Missing request body" });

    const { full_name, email, phone_number, password, role } = req.body;

    if (!full_name || !email || !phone_number || !password || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (role !== 'client' && role !== 'driver') {
      return res.status(400).json({ error: "Invalid role selected" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Drivers are unverified by default
    const is_verified = role === 'driver' ? false : true;

    await db.execute(
      "INSERT INTO users (full_name, email, phone_number, password, role, is_verified) VALUES (?, ?, ?, ?, ?, ?)",
      [full_name, email, phone_number, hashedPassword, role, is_verified]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "User already exists or server error" });
  }
};


exports.login = async (req, res) => {
  try {
    if (!req.body)
      return res.status(400).json({ error: "Missing request body" });

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0)
      return res.status(400).json({ error: "Invalid credentials" });

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Block access for unverified drivers
    if (user.role === 'driver' && !user.is_verified) {
      return res.status(403).json({ error: "Your account is awaiting verification." });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
        is_verified: user.is_verified,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
};

