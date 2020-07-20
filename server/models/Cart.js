const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		cartList: [],
	},
	{ timestamp: true },
);
// cartSchema.pre('save', function (next) {
// 	next();
// });
const Cart = mongoose.model('Cart', cartSchema);
module.exports = { Cart };
