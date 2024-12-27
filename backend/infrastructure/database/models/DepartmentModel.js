const mongoose = require('mongoose');

const DepartmentSchema = new mongoose.Schema({
	departmentName: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	users: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
		default: [],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	rooms: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
		default: [],
	},
});
DepartmentSchema.index({ departmentName: 1 }, { unique: true });

module.exports = mongoose.model('Department', DepartmentSchema);
