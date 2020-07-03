const { User } = require('../models/Users');
let auth = (req, res, next) => {
	//인증처리
	//client cookie import
	let token = req.cookies.x_auth;
	//token 복호화 후 유저 검색
	User.findByToken(token, (err, user) => {
		if (err) throw err;
		if (!user) return res.json({ isAuth: false, error: true });
		req.token = token;
		req.user = user;
		next();
	});
	//유저가 있으면 인증
	//유저가 없으면 미인증
};
module.exports = { auth };
