import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import { PRODUCT_SERVER } from 'api/config';
import { postApi } from 'api/index';

const FileUpload = props => {
	const [Images, setImages] = useState([]);
	const dropHandler = file => {
		let formData = new FormData();
		const config = {
			header: { 'content-type': 'multipart/form-data' },
		};
		formData.append('file', file[0]);
		postApi(`${PRODUCT_SERVER}/image`, formData, config)
			.then(res => {
				if (res.data.success) {
					//Images value clone
					setImages([...Images, res.data.filePath]);
					props.refreshFunction([...Images, res.data.filePath]);
				} else {
					alert('file error');
				}
			})
			.catch(err => console.log('err', err));
	};
	const deleteHandler = (img, index) => {
		const currentIndex = Images.indexOf(img);
		//console.log('deleteImg', Images, img, index, currentIndex);
		let newImages = [...Images];
		newImages.splice(currentIndex, 1);
		setImages(newImages);
		props.refreshFunction(newImages);
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
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center',
						}}
						{...getRootProps()}>
						<input {...getInputProps()} />
						<Icon type='plus' style={{ fontSize: '3rem' }}></Icon>
					</div>
				)}
			</Dropzone>
			<div
				style={{
					display: 'flex',
					flex: 1,
					width: '350px',
					height: '240px',
					overflowX: 'scroll',
				}}>
				{Images.map((img, index) => (
					<div onClick={() => deleteHandler(img, index)} key={index}>
						<img
							style={{ minWidth: '300px', width: '300px', height: '240px' }}
							src={`/${img}`}
							alt='#'
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default FileUpload;
