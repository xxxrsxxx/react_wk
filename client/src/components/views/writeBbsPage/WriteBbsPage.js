import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { postApi } from 'api/index';
import { Form, Icon, Input } from 'antd';
import Dropzone from 'react-dropzone';
const { TextArea } = Input;

const WriteBbsPage = props => {
	const user = useSelector(state => state.user);
	const [FormObj, setFormObj] = useState({
		title: '',
		description: '',
		images: [],
	});
	/**
	 * @dsc formData state setting
	 **/
	const formDataHandler = e => {
		switch (e.target.name) {
			case 'title':
				setFormObj({ ...FormObj, title: e.currentTarget.value });
				break;
			case 'dsc':
				setFormObj({ ...FormObj, description: e.currentTarget.value });
				break;
			default:
				setFormObj({ ...FormObj });
		}
	};
	/**
	 * @dsc drop zone file upload
	 **/
	const dropHandler = file => {
		let formData = new FormData();
		const config = {
			header: { 'content-type': 'multipart/form-data' },
		};
		formData.append('file', file[0]);
		postApi(`/board/upload`, formData, config)
			.then(res => {
				if (res.data.success) {
					setFormObj({ ...FormObj, images: [...FormObj.images, res.data.imgUrl] });
				} else {
					alert('file error');
				}
			})
			.catch(err => console.log('err', err));
	};
	/**
	 * @dsc 미리보기 리스트 제거
	 * @param { object } click event
	 * @param { string } drop img url
	 **/
	const deleteHandler = (event, img) => {
		event.preventDefault();
		const currentIndex = FormObj.images.indexOf(img);
		let newImages = [...FormObj.images];
		newImages.splice(currentIndex, 1);
		setFormObj({ ...FormObj, images: newImages });
	};
	/**
	 * @dsc 게시판 폼 전송
	 **/
	const submitHandler = e => {
		e.preventDefault();
		let i = 0;
		for (let e in FormObj) {
			if (!FormObj[e] && i == 0) {
				alert('empty');
				i++;
			}
		}
		if (i != 0) return;

		const config = {
			writer: user.userData._id,
			title: FormObj.title,
			description: FormObj.description,
			images: FormObj.images,
		};
	};
	return (
		<div style={{ maxWidth: '700px', margin: '2rem auto' }}>
			<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
				<h2>게시판 글쓰기 개발 중</h2>
			</div>
			<Form onSubmit={submitHandler}>
				<label htmlFor='title'>제목</label>
				<Input
					id='title'
					name='title'
					type='text'
					onChange={formDataHandler}
					value={FormObj.title}
				/>
				<label htmlFor='dsc'>내용</label>
				<TextArea
					id='dsc'
					name='dsc'
					onChange={formDataHandler}
					value={FormObj.description}
					style={{ height: '200px' }}
				/>
				<br />
				<br />
				<Dropzone onDrop={dropHandler}>
					{({ getRootProps, getInputProps }) => (
						<div
							style={{
								width: 40,
								height: 40,
								border: '1px solid lightgray',
								display: 'flex',
								flex: 1,
								alignItems: 'center',
								justifyContent: 'center',
							}}
							{...getRootProps()}>
							<input {...getInputProps()} />
							<Icon type='plus' style={{ fontSize: '2rem' }}></Icon>
						</div>
					)}
				</Dropzone>
				<br />
				<div className={'upload_list'} style={{ display: 'flex' }}>
					{FormObj.images.map((el, i) => (
						<div
							key={i}
							className={'list'}
							style={{ position: 'relative', width: '300px', height: 'auto' }}>
							<img src={el} alt='img' />
							<a
								href='#'
								onClick={event => deleteHandler(event, el)}
								style={{
									position: 'absolute',
									top: 0,
									right: 0,
									display: 'block',
									boxSizing: 'border-box',
									padding: '10px',
								}}>
								remove
							</a>
						</div>
					))}
				</div>
				<br />
				<br />
				<button type='submit'>confirm</button>
			</Form>
		</div>
	);
};

export default WriteBbsPage;
