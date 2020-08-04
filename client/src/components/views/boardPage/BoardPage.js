import React, { useEffect, useState } from 'react';
import { getApi } from 'api/index';
import { Link } from 'react-router-dom';
import { Collapse } from 'antd';
import './Board.css';
const { Panel } = Collapse;
const BoardPage = props => {
	const [Board, setBoard] = useState({
		list: [],
	});
	useEffect(() => {
		console.log('board start page');
		getApi('/board').then(res => {
			if (res.data.success) {
				setBoard({ ...Board, list: res.data.board });
			}
		});
	}, []);
	/**
	 * @dsc panel element styling
	 * @param { obj } element
	 * @param { string } type
	 **/
	const extra = (el, type) => {
		if (type == 'title') return <span>{el.title}</span>;
		if (type == 'sub')
			return (
				<div>
					<span style={{ paddingRight: '10px' }}>{el.name}</span>
					<span>{el.createdAt}</span>
				</div>
			);
	};
	/**
	 * @dsc panel contents build
	 * @param { obj } element
	 **/
	const panelContent = el => {
		console.log('el', el);
		return (
			<React.Fragment>
				<div className={'img_view'}>
					{el.file.map((e, i) => (
						<div key={i.toString()}>
							<img src={e} alt={i.toString()} />
						</div>
					))}
				</div>
				<div style={{ marginTop: '2em' }}>
					<p>{el.contents}</p>
				</div>
			</React.Fragment>
		);
	};
	return (
		<div style={{ maxWidth: '700px', margin: '2rem auto' }}>
			<div style={{ textAlign: 'center', marginBottom: '2rem' }}>
				<h2>Board</h2>
			</div>
			<section className={'board_container'}>
				<div className={'board_list'}>
					{Board.list.map((e, i) => {
						return (
							<React.Fragment key={i.toString()}>
								<Collapse defaultActiveKey={['0']} style={{ marginBottom: '10px' }}>
									<Panel
										header={extra(e, 'title')}
										extra={extra(e, 'sub')}
										key='1'>
										{panelContent(e)}
									</Panel>
								</Collapse>
							</React.Fragment>
						);
					})}
				</div>
				<div className={'board_controller'}>
					<Link className={'write'} to='/board/write'>
						write
					</Link>
				</div>
			</section>
		</div>
	);
};

export default BoardPage;
