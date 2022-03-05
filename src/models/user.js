const mongoose = require('mongoose');
const hashPassword = require('../utils/hashPassword');
const comparePassword = require('../utils/comparePassword');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		match: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	},
	firstname: {
		type: String,
		required: true,
	},
	dob: {
		type: String,
		match: /\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/
	},
	location: {
		type: String,
		required: true,
	},
	interests: [{
		type: String,
		required: true,
	}],
	description: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		required: true,
	},
	activated: {
		type: Number,
		required: false,
	},
	likes: {
		type: Array,
		required: false,
	},
});

userSchema.pre('save', hashPassword);
userSchema.methods.comparePassword = comparePassword;

const User = mongoose.model('users', userSchema);

module.exports = User;