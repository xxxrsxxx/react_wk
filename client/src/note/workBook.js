import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

class WorkBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			x: null,
			y: null,
			option: {
				limit: 10,
				array: [],
			},
			num: 0,
		};
		const { closer } = this;
		const test1 = closer();
		test1.init();
	}
	componentDidMount() {
		console.log('componentDidMount');
	}
	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('componentDidUpdate');
	}
	componentWillUnmount() {
		//componentWillUnmount()는 컴포넌트가 마운트 해제되어 제거되기 직전에 호출됩니다. 이 메서드 내에서 타이머 제거,
		// 네트워크 요청 취소, componentDidMount() 내에서 생성된 구독 해제 등 필요한 모든 정리 작업을 수행하세요.
		//이제 컴포넌트는 다시 렌더링되지 않으므로, componentWillUnmount() 내에서 setState()를 호출하면 안 됩니다.
		// 컴포넌트 인스턴스가 마운트 해제되고 나면, 절대로 다시 마운트되지 않습니다.
		console.log('componentWillUnmount');
	}
	closer = () => {
		const initialValues = {
			text: '',
			num: 0,
			array: [],
		};
		const closerInit = () => {
			console.log('closer init', initialValues);
			reFormat();
		};
		const reFormat = () => {
			const { state } = this;
			let newArray = [];
			for (let i = 0; i < state.option.limit; i++) {
				newArray.push(i);
			}
			state.option.array = newArray;
		};
		return {
			init: closerInit,
		};
	};
	testhandler = () => {
		this.setState(current => ({ num: current.num + 1 }));
	};
	render() {
		console.log('render');
		return (
			<div
				style={{
					display: 'flex',
					height: '100vh',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
				<Row>
					<Col>
						<div>
							<p>array length map</p>
							<ul>
								{/*{[...Array(5)].map(num, index => (*/}
								{/*	<li key={num}>test</li>*/}
								{/*))}*/}
							</ul>
						</div>
					</Col>
					<Col>
						<div>
							<button onClick={this.testhandler}>testHandler {this.state.num}</button>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}
// WorkBook.PropTypes = {}
export default WorkBook;
