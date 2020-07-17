import React, { useEffect } from 'react';
import { getApi } from 'api/index';

const ProductDetailPage = props => {
	const base = props.match.params;
	const params = {
		_id: base.productId,
		type: 'single',
	};
	useEffect(() => {
		getApi(`/product/productView?id=${params._id}&type=${params.type}`).then(res => {
			console.log(res);
			if (res.data.success) {
			} else {
				alert('load faild');
			}
		});
	}, []);

	return <div>productView</div>;
};

export default ProductDetailPage;
