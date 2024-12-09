const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	machines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Machine' }],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Room', RoomSchema);
