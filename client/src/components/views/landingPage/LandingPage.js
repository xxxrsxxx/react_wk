import React, { useEffect, useState } from 'react';
import { PRODUCT_SERVER } from 'api/config';
import { getApi, postApi } from 'api/index';

import ImageSlider from 'components/utils/ImageSlider';
import { Icon, Col, Card, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';

import CheckBox from './sections/CheckBox';
import RadioBox from './sections/RadioBox';
import SearchFeature from './sections/SearchFeature';
import { options, price } from './sections/Datas';

const LandingPage = props => {
	const [PrdList, setPrdList] = useState([]); // product list

	// 상품 로드 정보
	const [LoadPrdConfig, setLoadPrdConfig] = useState({
		skip: 0,
		limit: 8,
		loadMore: false,
		filters: {},
		searchTerm: '',
	});
	// 필터 타입 정보
	const [Filters, setFilters] = useState({
		option: [],
		price: [],
	});
	// 상품 로드 상태
	const [LoadPrdState, setLoadPrdState] = useState({
		loadState: false,
		PostSize: 0,
	});

	useEffect(() => {
		let config = {
			...LoadPrdConfig,
		};
		getProducts(config);
	}, [LoadPrdConfig]);

	const getProducts = config => {
		postApi(`${PRODUCT_SERVER}/products`, config).then(res => {
			console.log('api logic\n', LoadPrdConfig, '\n', res.data);
			if (LoadPrdConfig.loadMore) setPrdList([...PrdList, ...res.data.productsInfo]);
			else setPrdList(res.data.productsInfo);

			setLoadPrdState({
				loadState: true,
				PostSize: res.data.postSize,
			});
		});
	};

	const loadProduct = (type, param) => {
		const config = {
			skip: 0,
			limit: LoadPrdConfig.limit,
			loadMore: false,
			filters: LoadPrdConfig.filters,
			searchTerm: LoadPrdConfig.searchTerm,
		};
		switch (type) {
			case 'loadMoreResults':
				let skipIdx = LoadPrdConfig.skip + LoadPrdConfig.limit;
				config.skip = skipIdx;
				config.loadMore = true;
				break;
			case 'loadFilterResults':
				config.filters = param;
				break;
			case 'updateSearchTerm':
				config.searchTerm = param;
				break;
		}
		setLoadPrdConfig({ ...LoadPrdConfig, ...config });
	};

	const handlePrice = value => {
		const data = price;
		let array = [];
		for (let key in data) {
			if (data[key].id === parseInt(value, 10)) {
				array = data[key].array;
			}
		}
		return array;
	};

	const handleFilters = (filters, key) => {
		const newFilters = { ...Filters };
		newFilters[key] = filters;
		if (key === 'price') {
			let priceValues = handlePrice(filters);
			newFilters[key] = priceValues;
		}
		setFilters(newFilters);
		loadProduct('loadFilterResults', newFilters);
	};

	const renderPrd = PrdList.map((prd, idx) => {
		return (
			<Col lg={6} sm={12} md={12} xs={24} key={idx}>
				<Card
					cover={
						<a href={`/product/productView/${prd._id}`}>
							<ImageSlider setData={prd}></ImageSlider>
						</a>
					}>
					<Meta title={prd.title} description={`$${prd.price}`}></Meta>
				</Card>
			</Col>
		);
	});
	return (
		<div style={{ width: '75%', margin: '3rem auto' }}>
			<div style={{ textAlign: 'center' }}>
				<h2>Main Contents Page</h2>
			</div>
			{/* Filter*/}
			<Row gutter={[16, 16]}>
				<Col lg={12} xs={24}>
					<CheckBox
						list={options}
						handleFilters={filters => handleFilters(filters, 'option')}
					/>
				</Col>
				<Col lg={12} xs={24}>
					<RadioBox
						list={price}
						handleFilters={filters => handleFilters(filters, 'price')}
					/>
				</Col>
			</Row>
			{/*Search*/}
			<div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>
				<SearchFeature
					refreshFunction={search => loadProduct('updateSearchTerm', search)}
				/>
			</div>
			{LoadPrdState.loadState ? (
				<div>
					{/*Cards*/}
					{PrdList.length > 0 ? (
						<Row gutter={[16, 16]}>{renderPrd}</Row>
					) : (
						<p>Product does not exist.</p>
					)}

					{LoadPrdState.PostSize >= LoadPrdConfig.limit && (
						<div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
							<button onClick={() => loadProduct('loadMoreResults')}>더보기</button>
						</div>
					)}
				</div>
			) : (
				<div>
					<p>loading...</p>
				</div>
			)}
		</div>
	);
};

export default LandingPage;
