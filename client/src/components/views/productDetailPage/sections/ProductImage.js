import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
function ProductImage(props) {
	const [Item, setItem] = useState([]);

	useEffect(() => {
		if (props.detail.images && props.detail.images.length > 0) {
			let images = [];

			props.detail.images.map(item => {
				images.push({
					original: `/${item}`,
					thumbnail: `/${item}`,
				});
			});
			setItem(images);
		}
	}, [props.detail]);

	return (
		<div>
			<ImageGallery items={Item} />
		</div>
	);
}

export default ProductImage;
