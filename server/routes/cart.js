const express = require('express');
const router = express.Router();
const { Cart } = require('../models/Cart');
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

router.post('/', (req, res) => {
	console.log('initial Cart', req.body);
	const cart = new Cart(req.body);
	cart.save(err => {
		if (err)
			return res.status(400).json({
				success: false,
				err,
			});
		return res.status(200).json({ success: true });
	});
});

router.post('/addToCart', auth, (req, res) => {
	console.log('addToCart', req.user._id);
	// 	//먼저  Cart Collection에 해당 유저의 정보를 가져오기
	Cart.findOne({ userId: req.user._id }, (err, cartInfo) => {
		console.log('addToCart Match Info', cartInfo);
		// 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는지 확인
		let duplicate = false;
		cartInfo.cartList.forEach(item => {
			if (item.id === req.body.prdId) {
				duplicate = true;
			}
		});
		//상품이 이미 있을때
		if (duplicate) {
			Cart.findOneAndUpdate(
				{ userId: req.user._id, 'cartList.id': req.body.prdId },
				{ $inc: { 'cartList.$.quantity': 1 } },
				{ new: true },
				(err, cartInfo) => {
					if (err) return res.status(200).json({ success: false, err });
					res.status(200).send(cartInfo.cartList);
				},
			);
		}
		// //상품이 이미 있지 않을때
		else {
			Cart.findOneAndUpdate(
				{ userId: req.user._id },
				{
					$push: {
						cartList: {
							id: req.body.prdId,
							quantity: 1,
							date: Date.now(),
						},
					},
				},
				{ new: true },
				(err, cartInfo) => {
					if (err) return res.status(400).json({ success: false, err });
					res.status(200).send(cartInfo.cartList);
				},
			);
		}
	});
	//return res.status(200).json({ success: true, req });
});

module.exports = router;
