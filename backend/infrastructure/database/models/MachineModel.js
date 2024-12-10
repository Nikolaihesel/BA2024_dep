const mongoose = require('mongoose');

const MachineSchema = new mongoose.Schema({
	name: { type: String, required: true },
	room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
	state: { type: String, default: 'stopped' },
	connectedAt: { type: Date },
	value: { type: Number, default: 0 },
});

module.exports = mongoose.model('Machine', MachineSchema);
