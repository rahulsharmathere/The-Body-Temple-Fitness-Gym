const User = require('../models/User')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const { validateLogin, validateChangePassword } = require('../validators/authValidators')

const cookieOptions = {
    httpOnly: true,
    secure: false, // set to true in production
    sameSite: 'Lax'
}

const signToken = (userId) => jwt.sign({ user_id: userId }, process.env.JWT_SecretKey);

// creates the one and only admin account - only works while no admin exists yet
exports.registerAdmin = async (req, res, next) => {
    try {
        const alreadyExists = await User.countDocuments({ role: 'admin' });
        if (alreadyExists > 0) {
            return res.status(403).json({ success: false, message: 'Admin account already set up, please login instead' });
        }

        const { name, email, password, profilePhoto } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Name, email and password are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = await User.create({
            name, email, password: hashedPassword, profilePhoto,
            role: 'admin', isProfileCompleted: true
        });

        res.status(201).json({ success: true, message: 'Admin registered successfully', data: admin });
    } catch (err) {
        next(err);
    }
}

// shared login for both admin and member - role comes back with the user so
// the frontend can route to the right dashboard
exports.login = async (req, res, next) => {
    try {
        const errors = validateLogin(req.body);
        if (errors.length) {
            return res.status(400).json({ success: false, message: errors[0] });
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = signToken(user._id);
        res.cookie('cookie_token', token, cookieOptions);

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;

        res.status(200).json({ success: true, message: 'Logged in successfully', data: userWithoutPassword, token });
    } catch (err) {
        next(err);
    }
}

exports.logout = async (req, res) => {
    res.clearCookie('cookie_token', cookieOptions).json({ success: true, message: 'Logged out successfully' });
}

exports.getMe = async (req, res) => {
    res.status(200).json({ success: true, message: 'Fetched current user', data: req.user });
}

// used both for the "change password on first login" flow and normal password changes
exports.changePassword = async (req, res, next) => {
    try {
        const errors = validateChangePassword(req.body);
        if (errors.length) {
            return res.status(400).json({ success: false, message: errors[0] });
        }

        const { oldPassword, newPassword } = req.body;
        const user = await User.findById(req.user._id);

        if (!(await bcrypt.compare(oldPassword, user.password))) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.mustChangePassword = false;
        await user.save();

        res.status(200).json({ success: true, message: 'Password changed successfully' });
    } catch (err) {
        next(err);
    }
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
})

exports.sendOtp = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'No account with this email' });
        }

        const buffer = crypto.randomBytes(4);
        const otp = buffer.readUInt32BE(0) % 900000 + 100000; // 6 digit code

        user.resetPasswordToken = otp;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Password Reset for The BTF',
            text: `You requested a password reset. Your OTP is: ${otp}`
        };

        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return res.status(500).json({ success: false, message: 'Could not send mail, please try again later' });
            }
            res.status(200).json({ success: true, message: 'OTP sent to your mail' });
        })
    } catch (err) {
        next(err);
    }
}

exports.verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({
            email,
            resetPasswordToken: otp,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'OTP is invalid or has expired' });
        }

        res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (err) {
        next(err);
    }
}

exports.resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Something went wrong, please try again' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ success: true, message: 'Password reset successfully' });
    } catch (err) {
        next(err);
    }
}
