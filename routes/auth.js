import express from 'express';
import { loginUser, registerUser, logoutUser } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route for registration
// Route for registration
router.post('/register', registerUser);


// Route for login
router.post('/login', loginUser);

// Route for logout
router.post('/logout', authenticateToken, logoutUser);

// Protected route example
router.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'Welcome to the protected route!', user: req.user });
});

export default router;
