const express = require('express');
const app = express();
const port = process.env.PORT || 7000;
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require('./models/Users');

//application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// cors access
app.use(
	cors({
		origin: 'http://localhost:3000', // 허락하고자 하는 요청 주소
		credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가
	}),
);
//application/json
app.use(bodyParser.json());
app.use(cookieparser());
const mongoose = require('mongoose');
mongoose
	.connect(config.mongoURI, {
		userNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFIndAndModify: true,
	})
	.then(() => console.log('mongoDB connected'))
	.catch(err => console.log('err'));

app.get('/', (req, res) => res.send('Hello World!'));
app.get('/api/testUrl', (req, res) => res.send('procy test'));

app.post('/api/users/register', (req, res) => {
	//bodyParser 통해 파싱
	//회원정보를 받아 데이터 베이스에 인젝트
	const user = new User(req.body);
	user.save((err, userInfo) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).json({
			success: true,
		});
	});
});

app.post('/api/users/login', (req, res) => {
	//요청된 이메일 db서 조회
	User.findOne({ email: req.body.email }, (err, userInfo) => {
		// emailInfo 없을
		if (!userInfo) {
			return res.json({
				loginSuccess: false,
				message: 'email match failed',
			});
		}
		//요청된 이메일 있을시 비밀번호 매치 확인
		userInfo.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) return res.json({ loginSuccess: false, message: '비밀번호 매치 실패' });
			//비밀번호 access시 토큰 생성
			userInfo.generateToken((err, user) => {
				if (err) return res.status(400).send(err);
				//토근 저장
				res.cookie('x_auth', user.token)
					.status(200)
					.json({ loginSuccess: true, userId: user._id });
			});
		});
	});
});

app.get('/api/users/auth', auth, (req, res) => {
	res.status(200).json({
		_id: req.user._id,
		isAdmin: req.user.role === 0 ? false : true,
		isAuth: true,
		email: req.user.email,
		name: req.user.name,
		lastname: req.user.lastname,
		role: req.user.role,
		image: req.user.image,
	});
});

app.get('/api/users/logout', auth, (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
		if (err) return res.json({ success: false, err });
		return res.status(200).send({
			success: true,
		});
	});
});
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
