const User = require('../models/User')
const jwt = require('jsonwebtoken');

// verifies the JWT cookie and attaches the logged in user to req.user
const auth = async (req, res, next) => {
    try {
        const token = req.cookies.cookie_token;

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SecretKey);

        req.user = await User.findById(decoded.user_id).select('-password');

        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Token is not valid' });
        }

        next();

    } catch (err) {
        res.status(401).json({ success: false, message: 'Token is not valid' });
    }
}

// restricts a route to specific roles, use after auth
// e.g. restrictTo('admin')
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: 'You are not allowed to perform this action' });
        }
        next();
    }
}

module.exports = { auth, restrictTo };
