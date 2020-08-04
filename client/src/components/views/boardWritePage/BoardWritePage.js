import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { postApi } from 'api/index';
import { Form, Icon, Input } from 'antd';
import Dropzone from 'react-dropzone';
const { TextArea } = Input;

const BoardPage = props => {
	const user = useSelector(state => state.user);
	const [FormObj, setFormObj] = useState({
		title: '',
		contents: '',
		file: [],
	});
	/**
	 * @dsc formData state setting
	 **/
	const formDataHandler = e => {
		switch (e.target.name) {
			case 'title':
				setFormObj({
					...FormObj,
					title: e.currentTarget.value,
				});
				break;
			case 'contents':
				setFormObj({
					...FormObj,
					contents: e.currentTarget.value,
				});
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
					setFormObj({
						...FormObj,
						file: [...FormObj.file, res.data.imgUrl],
					});
				} else {
					alert('file error');
				}
			})
			.catch(err => console.log('err', err));
	};
	/**
	 * @dsc 미리보기 리스트 제거
	 * @param { object } click event
	 * @param { string } drop file url
	 **/
	const deleteHandler = (event, file) => {
		event.preventDefault();
		const currentIndex = FormObj.file.indexOf(file);
		let newArray = [...FormObj.file];
		newArray.splice(currentIndex, 1);
		setFormObj({ ...FormObj, file: newArray });

		const string = file.replace('https://xx-bucket.s3.amazonaws.com/', '');
		postApi(`/board/delete`, { file: string }).then(res => {
			if (res.data.success) {
				console.log('s3 delete object');
			}
		});
	};
	/**
	 * @dsc 게시판 폼 전송
	 **/
	let commit = true;
	const submitHandler = e => {
		e.preventDefault();

		if (!commit) return;
		const config = {
			writer: user.userData._id,
			name: user.userData.name,
			title: FormObj.title,
			contents: FormObj.contents,
			file: FormObj.file,
		};

		if (config.title === '' || config.contents === '') {
			alert('제목,내용 필수 입력');
			return;
		}
		postApi('/board/write', config).then(res => {
			if (res.data.success) {
				alert('Add Comment');
				props.history.push('/board');
			} else {
				alert('Add Comment Failed');
			}
			commit = true;
		});
		commit = false;
	};
	return (
		<div style={{ maxWidth: '700px', margin: '2rem auto' }}>
			<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
				<h2>Board Write</h2>
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
				<label htmlFor='contents'>내용</label>
				<TextArea
					id='contents'
					name='contents'
					onChange={formDataHandler}
					value={FormObj.contents}
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
					{FormObj.file.map((el, i) => (
						<div
							key={i}
							className={'list'}
							style={{
								position: 'relative',
								width: '300px',
								height: 'auto',
							}}>
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
				<button type='submit'>Add Comment</button>
			</Form>
		</div>
	);
};

export default BoardPage;
