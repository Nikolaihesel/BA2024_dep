const mongoose = require('mongoose');
const { type } = require('os');

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
	},
	department: {
		type: String,
		required: true,
		lowercase: true,
	},
	role: {
		type: String,
		required: true,
		lowercase: true,
		enum: ['admin', 'user'],
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('User', UserSchema);
