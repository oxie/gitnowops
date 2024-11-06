import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const db = new Database('database.sqlite');

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
`);

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user exists
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const result = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)').run(email, hashedPassword);
    
    // Generate token
    const token = jwt.sign({ id: result.lastInsertRowid, email }, process.env.JWT_SECRET || 'your-secret-key');

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    // Generate token
    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET || 'your-secret-key');

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = db.prepare('SELECT id, email, created_at FROM users WHERE id = ?').get(req.user.id);
  res.json(user);
});

// Inquiry routes
app.get('/api/inquiries', authenticateToken, (req, res) => {
  const inquiries = db.prepare('SELECT * FROM inquiries WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id);
  res.json(inquiries);
});

app.post('/api/inquiries', authenticateToken, (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: 'Title and description are required' });
  }

  const result = db.prepare(
    'INSERT INTO inquiries (user_id, title, description) VALUES (?, ?, ?)'
  ).run(req.user.id, title, description);

  const inquiry = db.prepare('SELECT * FROM inquiries WHERE id = ?').get(result.lastInsertRowid);
  res.json(inquiry);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});