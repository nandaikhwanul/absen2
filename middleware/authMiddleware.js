import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';

export const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }
        req.user = user; // Store user data in request
        next(); // Proceed to next middleware
    });
};
