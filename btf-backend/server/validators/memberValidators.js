exports.validateCreateMember = ({ name, email, phone }) => {
    const errors = [];
    if (!name) errors.push('Name is required');
    if (!email) errors.push('Email is required');
    if (!phone) errors.push('Phone is required');
    return errors;
}

exports.validateCompleteProfile = ({ age, gender, height, currentWeight }) => {
    const errors = [];
    if (!age) errors.push('Age is required');
    if (!gender) errors.push('Gender is required');
    if (!height) errors.push('Height is required');
    if (!currentWeight) errors.push('Current weight is required');
    return errors;
}
