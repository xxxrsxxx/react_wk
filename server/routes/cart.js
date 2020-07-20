const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

router.post('/addToCart', auth, (req, res) => {
	//먼저  User Collection에 해당 유저의 정보를 가져오기
	User.findOne({ _id: req.user._id }, (err, userInfo) => {
		// 가져온 정보에서 카트에 넣으려 하는 상품이 이미 들어 있는지 확인
		let duplicate = false;
		userInfo.cart.forEach(item => {
			if (item.id === req.body.productId) {
				duplicate = true;
			}
		});
		// 중복 체크
		if (duplicate) {
			User.findOneAndUpdate(
				{ _id: req.user._id, 'cart.id': req.body.productId },
				{ $inc: { 'cart.$.quantity': 1 } },
				{ new: true }, // update 정보를 받기위해
				(err, userInfo) => {
					if (err) return res.status(200).json({ success: false, err });
					res.status(200).send(userInfo.cart);
				},
			);
		}
		// 해당되지 않을 경우
		else {
			User.findOneAndUpdate(
				{ _id: req.user._id },
				{
					$push: {
						cart: {
							id: req.body.productId,
							quantity: 1,
							date: Date.now(),
						},
					},
				},
				{ new: true },
				(err, userInfo) => {
					if (err) return res.status(400).json({ success: false, err });
					res.status(200).send(userInfo.cart);
				},
			);
		}
	});
});
module.exports = router;
