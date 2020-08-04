const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const boardSchema = mongoose.Schema(
	{
		writer: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		name: {
			type: String,
		},
		title: {
			type: String,
			maxlength: 50,
		},
		contents: {
			type: String,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		updatedAt: { type: Date },
		file: {
			type: Array,
			default: [],
		},
		views: {
			type: Number,
			default: 0,
		},
	},
	{ timestamp: true },
);

const Board = mongoose.model('Board', boardSchema);
module.exports = { Board };
