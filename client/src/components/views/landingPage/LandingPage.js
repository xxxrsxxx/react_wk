import React, { useEffect, useState } from 'react';
import { PRODUCT_SERVER } from 'api/config';
import { getApi, postApi } from 'api/index';

import ImageSlider from 'components/utils/ImageSlider';

import { Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';

const LandingPage = props => {
	const [PrdList, setPrdList] = useState([]);
	useEffect(() => {
		postApi(`${PRODUCT_SERVER}/products`).then(res => {
			console.log('Products IMG', res.data);
			setPrdList(res.data.productsInfo);
		});
	}, []);

	const renderPrd = PrdList.map((prd, idx) => {
		return (
			<Col lg={6} sm={12} md={12} xs={24} key={idx}>
				<Card cover={<ImageSlider setData={prd}></ImageSlider>}>
					<Meta title={prd.title} description={`$${prd.price}`}></Meta>
				</Card>
			</Col>
		);
	});
	return (
		<div style={{ width: '75%', margin: '3rem auto' }}>
			<div style={{ textAlign: 'center' }}>
				<h2>Top</h2>
			</div>
			{/* Filter*/}
			{/*Search*/}
			{/*Cards*/}
			<Row gutter={[16, 16]}>{renderPrd}</Row>
			<div style={{ justifyContent: 'center' }}>
				<button>더보기</button>
			</div>
		</div>
	);
};

export default LandingPage;
