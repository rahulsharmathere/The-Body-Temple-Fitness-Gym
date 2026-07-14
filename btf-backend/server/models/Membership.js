const mongoose = require("mongoose");

// Kept separate from MembershipPlan so renewal history is preserved -
// every renewal creates/updates one of these against the member.
const membershipSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    plan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MembershipPlan',
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Active', 'Expired', 'Cancelled'],
        default: 'Active',
    },
}, { timestamps: true })

const Membership = mongoose.model("Membership", membershipSchema);

module.exports = Membership;
