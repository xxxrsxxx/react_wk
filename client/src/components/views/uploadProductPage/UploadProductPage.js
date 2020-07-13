import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import { postApi } from 'api/index';
import FileUpload from 'components/utils/FileUpload';

const { TextArea } = Input;
const SelectOpt = [
	{ key: 1, value: 'opt1' },
	{ key: 2, value: 'opt2' },
	{ key: 3, value: 'opt3' },
	{ key: 4, value: 'opt4' },
	{ key: 5, value: 'opt5' },
	{ key: 6, value: 'opt6' },
	{ key: 7, value: 'opt7' },
];

const UploadProductPage = props => {
	const [FormObj, setFormObj] = useState({
		title: '',
		description: '',
		price: 0,
		option: 1,
		images: [],
	});
	const formDataHandler = e => {
		switch (e.target.name) {
			case 'title':
				setFormObj({ ...FormObj, title: e.currentTarget.value });
				break;
			case 'dsc':
				setFormObj({ ...FormObj, description: e.currentTarget.value });
				break;
			case 'price':
				setFormObj({ ...FormObj, price: e.currentTarget.value });
				break;
			case 'option':
				setFormObj({ ...FormObj, option: e.currentTarget.value });
				break;
			default:
				setFormObj({ ...FormObj });
		}
	};
	const updateImage = newImages => {
		setFormObj({ ...FormObj, images: newImages });
	};
	const submitHandler = e => {
		e.preventDefault();
		//validationSchema FormObj
		let i = 0;
		for (let e in FormObj) {
			if (!FormObj[e] && i == 0) {
				alert('empty');
				i++;
			}
		}
		if (i != 0) return;

		const config = {
			writer: props.user.userData._id,
			title: FormObj.title,
			description: FormObj.description,
			price: FormObj.price,
			images: FormObj.images,
			option: FormObj.option,
		};
		postApi('/product', config).then(res => {
			if (res.data.success) {
				alert('prd upload');
				props.history.push('/');
			} else alert('prd upload failed');
		});
	};
	return (
		<div style={{ maxWidth: '700px', margin: '2rem auto' }}>
			<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
				<h2>Product Upload</h2>
			</div>
			<Form onSubmit={submitHandler}>
				<FileUpload refreshFunction={updateImage}></FileUpload>
				<br />
				<br />
				<label htmlFor='title'>제목</label>
				<Input
					id='title'
					name='title'
					type='text'
					onChange={formDataHandler}
					value={FormObj.title}
				/>
				<label htmlFor='dsc'>설명</label>
				<TextArea
					id='dsc'
					name='dsc'
					onChange={formDataHandler}
					value={FormObj.description}
				/>
				<br />
				<br />
				<label htmlFor='price'>가격($)</label>
				<Input
					id='price'
					name='price'
					type='number'
					onChange={formDataHandler}
					value={FormObj.price}
				/>
				<br />
				<br />
				<select name='option' onChange={formDataHandler} value={FormObj.continent}>
					{SelectOpt.map(item => (
						<option key={item.key} value={item.key}>
							{item.value}
						</option>
					))}
				</select>
				<br />
				<br />
				<button type='submit'>confirm</button>
			</Form>
			UploadProductPage
		</div>
	);
};

export default UploadProductPage;
