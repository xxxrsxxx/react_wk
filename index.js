const express = require('express');
const app = express();
const port = 7000;
const bodyParser = require('body-parser');
const config = require('./config/key');
const { User } = require('./models/Users');

//application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json
app.use(bodyParser.json());

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

app.post('/register', (req, res) => {
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
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
