import React, { useEffect } from 'react';
import axios from 'axios';
function LandingPage(props) {
	useEffect(() => {
		axios.get('/api/testUrl').then(res => console.log('cors test', res));
		// fetch('/api/test', {
		// 	method: 'GET',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// }).then(response => {
		// 	console.log('cors test', response);
		// });
	}, []);

	const onClickHandler = e => {};
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				height: '100vh',
			}}>
			<h2>시작 페이지</h2>

			<button onClick={onClickHandler}>로그아웃</button>
		</div>
	);
}

export default LandingPage;
