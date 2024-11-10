const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema({
    discordId: { type: String, required: true },
    robloxId: { type: String, required: true }
});

module.exports = mongoose.model('Verification', verificationSchema);
