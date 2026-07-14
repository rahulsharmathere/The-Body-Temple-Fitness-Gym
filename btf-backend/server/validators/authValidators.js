// simple, dependency-free validators - just enough to catch bad requests early

exports.validateLogin = ({ email, password }) => {
    const errors = [];
    if (!email) errors.push('Email is required');
    if (!password) errors.push('Password is required');
    return errors;
}

exports.validateChangePassword = ({ oldPassword, newPassword }) => {
    const errors = [];
    if (!oldPassword) errors.push('Current password is required');
    if (!newPassword) errors.push('New password is required');
    if (newPassword && newPassword.length < 6) errors.push('New password must be at least 6 characters');
    return errors;
}
