import React, { useEffect, useState } from 'react';
import { PRODUCT_SERVER } from 'api/config';
import { getApi, postApi } from 'api/index';

import ImageSlider from 'components/utils/ImageSlider';
import { Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';

import CheckBox from './sections/CheckBox';
import { options } from './sections/Datas';

const LandingPage = props => {
	const [PrdList, setPrdList] = useState([]);

	const [LoadPrdConfig, setLoadPrdData] = useState({
		skip: 0,
		limit: 4,
		loadMore: false,
		filters: {},
	});
	const [PostSize, setPostSize] = useState(0); // pruducts res data length

	const [Filters, setFilters] = useState({
		option: [],
		price: [],
	});
	useEffect(() => {
		let config = {
			...LoadPrdConfig,
		};
		getProducts(config);
		console.log('??');
	}, [LoadPrdConfig]);

	const getProducts = config => {
		postApi(`${PRODUCT_SERVER}/products`, config).then(res => {
			if (LoadPrdConfig.loadMore) setPrdList([...PrdList, ...res.data.productsInfo]);
			else setPrdList(res.data.productsInfo);
			console.log('API', res.data, '/n', LoadPrdConfig);
			setPostSize(res.data.postSize);
		});
		console.log('get', LoadPrdConfig);
	};
	const loadMoreHandler = () => {
		let skipIdx = LoadPrdConfig.skip + LoadPrdConfig.limit;

		let config = {
			skip: skipIdx,
			limit: LoadPrdConfig.limit,
			loadMore: true,
		};
		setLoadPrdData({ ...LoadPrdConfig, ...config });
		//getProducts(config);
	};
	const handleFilters = (filters, key) => {
		const newFilters = { ...Filters };
		newFilters[key] = filters;
		loadFilterResults(newFilters);
	};
	const loadFilterResults = filters => {
		let config = {
			skip: 0,
			limit: LoadPrdConfig.limit,
			loadMore: false,
			filters: filters,
		};
		setLoadPrdData({ ...LoadPrdConfig, ...config });
	};
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
				<h2>Top Contents</h2>
			</div>
			{/* Filter*/}
			<CheckBox list={options} handleFilters={filters => handleFilters(filters, 'option')} />
			{/*Search*/}
			{/*Cards*/}
			<Row gutter={[16, 16]}>{renderPrd}</Row>
			{PostSize >= LoadPrdConfig.limit && (
				<div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
					<button onClick={loadMoreHandler}>더보기</button>
				</div>
			)}
		</div>
	);
};

export default LandingPage;
