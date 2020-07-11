import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

const FileUpload = () => {
	const BaseUrl = process.env.REACT_APP_API_URL;
	const [Images, setImages] = useState([]);
	const dropHandler = file => {
		let formData = new FormData();
		const config = {
			header: { 'content-type': 'multipart/form-data' },
		};
		formData.append('file', file[0]);
		axios.post('/api/product/image', formData, config).then(res => {
			if (res.data.success) {
				//Images 값 복제
				setImages([...Images, res.data.filePath]);
			} else {
				alert('file error');
			}
		});
	};
	const deleteHandler = (img, index) => {
		const currentIndex = Images.indexOf(img);
		console.log('deleteImg', Images, img, index, currentIndex);
		let newImages = [...Images];
		newImages.splice(currentIndex, 1);
		setImages(newImages);
	};
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Dropzone onDrop={dropHandler}>
				{({ getRootProps, getInputProps }) => (
					<div
						style={{
							width: 300,
							height: 240,
							border: '1px solid lightgray',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						{...getRootProps()}>
						<input {...getInputProps()} />
						<Icon type="plus" style={{ fontSize: '3rem' }}></Icon>
					</div>
				)}
			</Dropzone>
			<div
				style={{
					display: 'flex',
					width: '350px',
					height: '240px',
					overflowX: 'scroll',
				}}>
				{Images.map((img, index) => (
					<div onClick={() => deleteHandler(img, index)} key={index}>
						<img
							style={{ minWidth: '300px', width: '300px', height: '240px' }}
							src={`${BaseUrl}${img}`}
							alt="#"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default FileUpload;
