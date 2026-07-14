const mongoose = require("mongoose");

// Authentication only - no fitness/member data lives here.
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member',
    },
    profilePhoto: {
        type: String,
        default: "https://imgs.search.brave.com/fmTMVn_jm3TKF3KZ8l0_O221vwTEM4I_t7D7dWebcI8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9zaHV0dGVy/c3RvY2svcGhvdG9z/LzExNTM2NzM3NTIv/ZGlzcGxheV8xNTAw/L3N0b2NrLXZlY3Rv/ci1wcm9maWxlLXBs/YWNlaG9sZGVyLWlt/YWdlLWdyYXktc2ls/aG91ZXR0ZS1uby1w/aG90by0xMTUzNjcz/NzUyLmpwZw",
    },
    isProfileCompleted: {
        type: Boolean,
        default: false,
    },
    // used only for the "change password on first login" flow
    mustChangePassword: {
        type: Boolean,
        default: false,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
}, { timestamps: true })

const User = mongoose.model("User", userSchema);

module.exports = User;
