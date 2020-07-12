import React, { useEffect } from 'react';
import axios from 'axios';

import { FaCode } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

const LandingPage = props => {
	console.log('process', process, process.env);
	useEffect(() => {
		// fetch('/api/test', {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// }).then(response => {
		// 	console.log('cors test', response);
		// });
	}, []);

	const onClickHandler = () => {
		axios.get(`/api/users/logout`).then(response => {
			if (response.data.success) {
				props.history.push('/login');
			} else {
				alert('로그아웃 failed');
			}
		});
	};
	return (
		<>
			<div className="app">
				<FaCode style={{ fontSize: '4rem' }} />
				<br />
				<span style={{ fontSize: '2rem' }}>Start Point</span>
			</div>
		</>
	);
};

export default withRouter(LandingPage);
