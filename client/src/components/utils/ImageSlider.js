import React from 'react';
import { Carousel } from 'antd';

const ImageSlider = props => {
	return (
		<Carousel dotPosition='top'>
			{props.setData.images.map((img, idx) => (
				<div key={idx}>
					<img style={{ width: '100%', maxHeight: '150px' }} src={`/${img}`} />
				</div>
			))}
		</Carousel>
	);
};

export default ImageSlider;
