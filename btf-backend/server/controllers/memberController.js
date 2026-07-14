const User = require('../models/User')
const MemberProfile = require('../models/MemberProfile')
const bcrypt = require('bcryptjs')
const generateTempPassword = require('../utils/generateTempPassword')
const { validateCreateMember } = require('../validators/memberValidators')

// Admin creates a member: a temp password is generated and an empty profile
// is attached. The member finishes setup themselves on first login.
exports.createMember = async (req, res, next) => {
    try {
        const errors = validateCreateMember(req.body);
        if (errors.length) {
            return res.status(400).json({ success: false, message: errors[0] });
        }

        const { name, email, phone } = req.body;

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(409).json({ success: false, message: 'A user with this email already exists' });
        }

        const tempPassword = generateTempPassword();
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        const member = await User.create({
            name, email: email.toLowerCase(), phone, password: hashedPassword,
            role: 'member', isProfileCompleted: false, mustChangePassword: true
        });

        await MemberProfile.create({ user: member._id });

        const memberWithoutPassword = member.toObject();
        delete memberWithoutPassword.password;

        res.status(201).json({
            success: true,
            message: 'Member added successfully',
            data: { member: memberWithoutPassword, tempPassword }
        });
    } catch (err) {
        next(err);
    }
}

exports.getAllMembers = async (req, res, next) => {
    try {
        const { skip = 0, limit = 9, search = '' } = req.query;

        const filter = { role: 'member' };
        if (search) {
            filter.$or = [
                { name: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }

        const totalMembers = await User.countDocuments(filter);
        const members = await User.find(filter)
            .select('-password')
            .sort({ createdAt: -1 })
            .skip(Number(skip))
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            message: members.length ? 'Fetched members successfully' : 'No members registered yet',
            data: { members, totalMembers }
        });
    } catch (err) {
        next(err);
    }
}

exports.getMemberById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const member = await User.findOne({ _id: id, role: 'member' }).select('-password');
        if (!member) {
            return res.status(404).json({ success: false, message: 'No such member' });
        }

        const profile = await MemberProfile.findOne({ user: id });

        res.status(200).json({ success: true, message: 'Member fetched', data: { member, profile } });
    } catch (err) {
        next(err);
    }
}

exports.updateMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, phone, profilePhoto } = req.body;

        const member = await User.findOne({ _id: id, role: 'member' });
        if (!member) {
            return res.status(404).json({ success: false, message: 'No such member' });
        }

        if (name !== undefined) member.name = name;
        if (phone !== undefined) member.phone = phone;
        if (profilePhoto !== undefined) member.profilePhoto = profilePhoto;

        await member.save();

        res.status(200).json({ success: true, message: 'Member updated successfully', data: member });
    } catch (err) {
        next(err);
    }
}

exports.deleteMember = async (req, res, next) => {
    try {
        const { id } = req.params;
        const member = await User.findOneAndDelete({ _id: id, role: 'member' });
        if (!member) {
            return res.status(404).json({ success: false, message: 'No such member' });
        }

        await MemberProfile.findOneAndDelete({ user: id });

        res.status(200).json({ success: true, message: 'Member deleted successfully' });
    } catch (err) {
        next(err);
    }
}
