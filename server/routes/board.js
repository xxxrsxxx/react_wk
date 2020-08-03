const express = require('express');
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');

const { v4: uuidv4 } = require('uuid');
const { Board } = require('../models/Board');
const config = require('../config/key');
//=================================
//             Board
//=================================

const s3 = new AWS.S3({
	accessKeyId: config.AWS_ID,
	secretAccessKey: config.AWS_SECRET,
});

console.log('s3', config);
const storage = multer.memoryStorage({
	destination: function (req, file, cb) {
		cb(null, '');
	},
});
const upload = multer({ storage }).single('file');
router.post('/upload', upload, (req, res) => {
	let myFile = req.file.originalname.split('.');
	const fileType = myFile[myFile.length - 1];

	console.log('req.file', req.file, '\n', myFile, '\n', fileType);
	const params = {
		Bucket: config.AWS_BUCKET_NAME,
		Key: `${uuidv4()}.${fileType}`,
		ACL: 'public-read',
		Body: req.file.buffer,
		ContentType: `image/${fileType}`,
	};
	s3.upload(params, (error, data) => {
		if (error) {
			res.status(400).json({
				success: false,
			});
		}
		res.status(200).json({ success: true, key: data.Key, imgUrl: data.Location });
	});
});
router.post('/', (req, res) => {
	const board = new Board(req.body);
	board.save(err => {
		if (err)
			return res.status(400).json({
				success: false,
				err,
			});
		return res.status(200).json({ success: true });
	});
});
module.exports = router;
