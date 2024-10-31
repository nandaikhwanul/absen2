import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new user
export const registerUser = async (req, res) => {
  const { nip, nama, email, password, role } = req.body;
  try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ nip, nama, email, password: hashedPassword, role });
      res.status(201).json({ 
          message: 'User registered successfully', 
          user: { 
              id: user.id, 
              nip: user.nip, 
              nama: user.nama, 
              email: user.email, 
              role: user.role 
          } 
      });
  } catch (error) {
      console.error("Registration error:", error); // Log error
      if (error.name === 'SequelizeUniqueConstraintError') {
          return res.status(400).json({ message: 'NIP or email already exists' });
      }
      res.status(500).json({ message: 'Internal server error' });
  }
};

// Login a user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        user.refresh_token = refreshToken;
        await user.save();

        res.status(200).json({ 
            message: 'Login successful', 
            accessToken, 
            refreshToken 
        });
    } catch (error) {
        console.error("Login error:", error); // Log error
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Logout a user
export const logoutUser = async (req, res) => {
    const { user } = req;

    try {
        user.refresh_token = null;
        await user.save();

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error("Logout error:", error); // Log error
        res.status(500).json({ message: 'Internal server error' });
    }
};
