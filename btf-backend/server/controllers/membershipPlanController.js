const MembershipPlan = require('../models/MembershipPlan')
const { validatePlan } = require('../validators/membershipValidators')

exports.getPlans = async (req, res, next) => {
    try {
        const plans = await MembershipPlan.find({}).sort({ price: 1 });
        res.status(200).json({ success: true, message: 'Plans fetched successfully', data: plans });
    } catch (err) {
        next(err);
    }
}

exports.createPlan = async (req, res, next) => {
    try {
        const errors = validatePlan(req.body);
        if (errors.length) {
            return res.status(400).json({ success: false, message: errors[0] });
        }

        const { name, price, durationInMonths } = req.body;
        const plan = await MembershipPlan.create({ name, price, durationInMonths });

        res.status(201).json({ success: true, message: 'Plan added successfully', data: plan });
    } catch (err) {
        next(err);
    }
}

exports.updatePlan = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, price, durationInMonths } = req.body;

        const plan = await MembershipPlan.findById(id);
        if (!plan) {
            return res.status(404).json({ success: false, message: 'No such plan' });
        }

        if (name !== undefined) plan.name = name;
        if (price !== undefined) plan.price = price;
        if (durationInMonths !== undefined) plan.durationInMonths = durationInMonths;
        await plan.save();

        res.status(200).json({ success: true, message: 'Plan updated successfully', data: plan });
    } catch (err) {
        next(err);
    }
}

exports.deletePlan = async (req, res, next) => {
    try {
        const { id } = req.params;
        const plan = await MembershipPlan.findOneAndDelete({ _id: id });
        if (!plan) {
            return res.status(404).json({ success: false, message: 'No such plan' });
        }

        res.status(200).json({ success: true, message: 'Plan deleted successfully' });
    } catch (err) {
        next(err);
    }
}
