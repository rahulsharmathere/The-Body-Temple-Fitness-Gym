const mongoose = require("mongoose");

// there is only ever one of these documents - it backs the public website
const gymInfoSchema = mongoose.Schema({
    gymName: {
        type: String,
        default: "My Gym"
    },
    tagline: {
        type: String,
        default: "Strength.Discipline.Results."
    },
    description: {
        type: String,
        default: "Write a few lines about your gym here from the Admin Settings page."
    },
    address: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    },
    timings: {
        type: String,
        default: "Mon-Sat : 6:00 AM - 10:00 PM"
    },
    instagram: {
        type: String,
        default: ""
    },
    facebook: {
        type: String,
        default: ""
    },
    heroImage: {
        type: String,
        default: ""
    },
    gallery: [{
        type: String
    }],
}, { timestamps: true })

const GymInfo = mongoose.model("GymInfo", gymInfoSchema);

module.exports = GymInfo;
