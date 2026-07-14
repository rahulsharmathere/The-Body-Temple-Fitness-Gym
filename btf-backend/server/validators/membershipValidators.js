exports.validatePlan = ({ name, price, durationInMonths }) => {
    const errors = [];
    if (!name) errors.push('Plan name is required');
    if (price === undefined || price === null || price === '') errors.push('Price is required');
    if (!durationInMonths) errors.push('Duration in months is required');
    return errors;
}

exports.validateAssignMembership = ({ user, plan }) => {
    const errors = [];
    if (!user) errors.push('Member is required');
    if (!plan) errors.push('Plan is required');
    return errors;
}
