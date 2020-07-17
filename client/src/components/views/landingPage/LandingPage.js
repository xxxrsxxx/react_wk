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

	const [LoadPrdConfig, setLoadPrdData] = useState({
		skip: 0,
		limit: 4,
		loadMore: false,
		filters: {},
		searchTerm: '',
	});

	const [Filters, setFilters] = useState({
		option: [],
		price: [],
	});

	const [LoadPrd, setLoadPrd] = useState(false); // product load state
	const [PostSize, setPostSize] = useState(0); // products res data length

	useEffect(() => {
		let config = {
			...LoadPrdConfig,
		};
		getProducts(config);
	}, [LoadPrdConfig]);

	const getProducts = config => {
		postApi(`${PRODUCT_SERVER}/products`, config).then(res => {
			console.log('get', LoadPrdConfig);
			if (LoadPrdConfig.loadMore) setPrdList([...PrdList, ...res.data.productsInfo]);
			else setPrdList(res.data.productsInfo);
			setLoadPrd(true);
			setPostSize(res.data.postSize);
		});
	};
	const loadMoreHandler = () => {
		let skipIdx = LoadPrdConfig.skip + LoadPrdConfig.limit;

		let config = {
			skip: skipIdx,
			limit: LoadPrdConfig.limit,
			loadMore: true,
		};
		setLoadPrdData({ ...LoadPrdConfig, ...config });
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
		loadFilterResults(newFilters);
		setFilters(newFilters);
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
	const updateSearchTerm = param => {
		const config = {
			skip: 0,
			limit: LoadPrdConfig.limit,
			loadMore: false,
			filters: LoadPrdConfig.filters,
			searchTerm: param,
		};
		setLoadPrdData({ ...LoadPrdConfig, ...config });
	};

	const loadProduct = type => {
		const config = {
			skip: 0,
			limit: 4,
			loadMore: false,
			filters: {},
			searchTerm: '',
		};
		switch (type) {
			case 'loadFilterResults':
				break;
			case 'updateSearchTerm':

				break;
		}
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
				<h2>Main Contents</h2>
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
				<SearchFeature refreshFunction={updateSearchTerm} />
			</div>
			{LoadPrd ? (
				<div>
					{/*Cards*/}
					{PrdList.length > 0 ? (
						<Row gutter={[16, 16]}>{renderPrd}</Row>
					) : (
						<p>Product does not exist.</p>
					)}

					{PostSize >= LoadPrdConfig.limit && (
						<div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
							<button onClick={loadMoreHandler}>더보기</button>
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
