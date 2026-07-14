const mongoose = require("mongoose");

const membershipPlanSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    durationInMonths: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

const MembershipPlan = mongoose.model("MembershipPlan", membershipPlanSchema);

module.exports = MembershipPlan;
