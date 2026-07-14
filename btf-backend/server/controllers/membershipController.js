const Membership = require('../models/Membership')
const MembershipPlan = require('../models/MembershipPlan')
const addMonths = require('../utils/addMonths')
const { validateAssignMembership } = require('../validators/membershipValidators')

// Admin assigns a plan to a member for the first time.
exports.assignMembership = async (req, res, next) => {
    try {
        const errors = validateAssignMembership(req.body);
        if (errors.length) {
            return res.status(400).json({ success: false, message: errors[0] });
        }

        const { user, plan, startDate } = req.body;
        const membershipPlan = await MembershipPlan.findById(plan);
        if (!membershipPlan) {
            return res.status(404).json({ success: false, message: 'Membership plan not found' });
        }

        const start = startDate ? new Date(startDate) : new Date();
        const end = addMonths(start, membershipPlan.durationInMonths);

        const membership = await Membership.create({
            user, plan, startDate: start, endDate: end, status: 'Active'
        });

        res.status(201).json({ success: true, message: 'Membership assigned successfully', data: membership });
    } catch (err) {
        next(err);
    }
}

// Admin renews a member's membership - creates a fresh record so the old
// one stays around as history, starting from today (or the old end date if
// it hasn't expired yet).
exports.renewMembership = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { plan } = req.body;

        const membershipPlan = await MembershipPlan.findById(plan);
        if (!membershipPlan) {
            return res.status(404).json({ success: false, message: 'Membership plan not found' });
        }

        const current = await Membership.findOne({ user: userId }).sort({ endDate: -1 });

        const today = new Date();
        const start = current && current.endDate > today ? current.endDate : today;
        const end = addMonths(start, membershipPlan.durationInMonths);

        if (current && current.status === 'Active') {
            current.status = 'Expired';
            await current.save();
        }

        const membership = await Membership.create({
            user: userId, plan, startDate: start, endDate: end, status: 'Active'
        });

        res.status(201).json({ success: true, message: 'Membership renewed successfully', data: membership });
    } catch (err) {
        next(err);
    }
}

exports.getMyMembership = async (req, res, next) => {
    try {
        const membership = await Membership.findOne({ user: req.user._id })
            .sort({ endDate: -1 })
            .populate('plan');

        res.status(200).json({ success: true, message: 'Membership fetched', data: membership });
    } catch (err) {
        next(err);
    }
}

exports.getMembershipHistoryForMember = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const history = await Membership.find({ user: userId }).sort({ endDate: -1 }).populate('plan');

        res.status(200).json({ success: true, message: 'Membership history fetched', data: history });
    } catch (err) {
        next(err);
    }
}

// small dashboard helpers for the admin panel
exports.getExpiringSoon = async (req, res, next) => {
    try {
        const { fromDays = 0, toDays = 3 } = req.query;
        const today = new Date();
        const from = new Date();
        from.setDate(today.getDate() + Number(fromDays));
        const to = new Date();
        to.setDate(today.getDate() + Number(toDays));

        const memberships = await Membership.find({
            status: 'Active',
            endDate: { $gte: from, $lte: to }
        }).sort({ endDate: 1 }).populate('user', '-password').populate('plan');

        res.status(200).json({ success: true, message: 'Fetched successfully', data: memberships });
    } catch (err) {
        next(err);
    }
}

exports.getExpired = async (req, res, next) => {
    try {
        const memberships = await Membership.find({
            status: 'Active',
            endDate: { $lt: new Date() }
        }).sort({ endDate: -1 }).populate('user', '-password').populate('plan');

        res.status(200).json({ success: true, message: 'Fetched successfully', data: memberships });
    } catch (err) {
        next(err);
    }
}
