import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
const { Search } = Input;

const SearchFeature = props => {
	const [SearchTrigger, setSearchTrigger] = useState(false);
	const [SearchTerm, setSearchTerm] = useState('');

	const searchHandler = e => {
		setSearchTerm(e.currentTarget.value);
		props.refreshFunction(e.currentTarget.value);
	};
	/**
	 * @dsc hook created
	 **/
	useEffect(() => {
		setSearchTrigger(true);
	}, []);
	/**
	 * @dsc hook mount and update from SearchTerm
	 **/
	useEffect(() => {
		queryTerm(SearchTrigger, 'stateUpdate');
	}, [SearchTerm]);
	/**
	 * @dsc 쿼리 스트링 테스트 로직
	 * @param {boolean} 훅 상태 체크 하고 실행 여부
	 * @param {string} 훅 체크
	 **/
	const queryTerm = (trigger, hook) => {
		console.log('queryTerm', trigger, hook, SearchTerm);
		if (trigger == false) return;
		props.route.history.push(`?q=${SearchTerm}`);
	};
	return (
		<div>
			<Search
				placeholder='input search text'
				onChange={searchHandler}
				value={SearchTerm}
				style={{ width: 200 }}
			/>
		</div>
	);
};
SearchFeature.propTypes = {
	refreshFunction: PropTypes.func,
	route: PropTypes.object,
};
export default SearchFeature;
