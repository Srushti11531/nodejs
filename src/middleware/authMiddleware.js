const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'your_fallback_secret';


const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];


    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token missing or malformed' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        req.user = decoded; // Example: { id: 123 }
        next();
    });
};

module.exports = authenticateToken;
