import React, { useEffect, useState } from 'react';
import { getApi } from 'api/index';
import ProductImage from './sections/ProductImage';
import ProductInfo from './sections/ProductInfo';
import { Row, Col } from 'antd';

const ProductDetailPage = props => {
	const base = props.match.params;
	const params = {
		_id: base.productId,
		type: 'single',
	};
	const [DetailConfig, setDetailConfig] = useState({
		product: {},
		loadState: false,
	});
	useEffect(() => {
		getApi(`/product/products_by_id?id=${params._id}&type=${params.type}`).then(res => {
			if (res.data.success) {
				setDetailConfig({
					product: res.data.product[0],
					loadState: true,
				});
			} else {
				alert('load failed');
			}
		});
	}, []);

	return (
		<div style={{ width: '100%', padding: '3rem 4rem' }}>
			{DetailConfig.loadState ? (
				<React.Fragment>
					<div style={{ display: 'flex', justifyContent: 'center' }}>
						<h1>{DetailConfig.product.title}</h1>
					</div>
					<br />
					<Row gutter={[16, 16]}>
						<Col lg={12} sm={24}>
							{/* ProductImage */}
							<ProductImage detail={DetailConfig.product} />
						</Col>
						<Col lg={12} sm={24}>
							{/* ProductInfo */}
							<ProductInfo detail={DetailConfig.product} />
						</Col>
					</Row>
				</React.Fragment>
			) : (
				<p>loading...</p>
			)}
		</div>
	);
};

export default ProductDetailPage;
