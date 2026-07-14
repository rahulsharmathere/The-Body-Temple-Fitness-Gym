const crypto = require('crypto');

// short, human-typeable temporary password for newly created members
const generateTempPassword = () => {
    return crypto.randomBytes(4).toString('hex');
}

module.exports = generateTempPassword;
