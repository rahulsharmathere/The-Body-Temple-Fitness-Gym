const GymInfo = require('../models/GymInfo');

// there is only ever one gymInfo document - fetches it, creating the
// default one the first time it's needed
const getOrCreateInfo = async () => {
    let info = await GymInfo.findOne({});
    if (!info) {
        info = await GymInfo.create({});
    }
    return info;
}

exports.getGymInfo = async (req, res, next) => {
    try {
        const info = await getOrCreateInfo();
        res.status(200).json({ success: true, message: 'Gym info fetched successfully', data: info });
    } catch (err) {
        next(err);
    }
}

exports.updateGymInfo = async (req, res, next) => {
    try {
        const { gymName, tagline, description, address, phone, email, timings, instagram, facebook, heroImage } = req.body;
        const info = await getOrCreateInfo();

        if (gymName !== undefined) info.gymName = gymName;
        if (tagline !== undefined) info.tagline = tagline;
        if (description !== undefined) info.description = description;
        if (address !== undefined) info.address = address;
        if (phone !== undefined) info.phone = phone;
        if (email !== undefined) info.email = email;
        if (timings !== undefined) info.timings = timings;
        if (instagram !== undefined) info.instagram = instagram;
        if (facebook !== undefined) info.facebook = facebook;
        if (heroImage !== undefined) info.heroImage = heroImage;

        await info.save();

        res.status(200).json({ success: true, message: 'Gym info updated successfully', data: info });
    } catch (err) {
        next(err);
    }
}

exports.addGalleryImage = async (req, res, next) => {
    try {
        const { image } = req.body;
        const info = await getOrCreateInfo();
        info.gallery.push(image);
        await info.save();
        res.status(200).json({ success: true, message: 'Image added successfully', data: info });
    } catch (err) {
        next(err);
    }
}

exports.removeGalleryImage = async (req, res, next) => {
    try {
        const { index } = req.params;
        const info = await getOrCreateInfo();
        info.gallery.splice(index, 1);
        await info.save();
        res.status(200).json({ success: true, message: 'Image removed successfully', data: info });
    } catch (err) {
        next(err);
    }
}
