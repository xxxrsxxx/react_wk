import React, { Suspense, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { uiState } from 'store/actions/uiAction/uiAction';

import LandingPage from './views/landingPage/LandingPage';
import LoginPage from './views/loginPage/LoginPage';
import RegisterPage from './views/registerPage/RegisterPage';
import NavBar from './views/navBar/NavBar';
import Footer from './views/footer/Footer';

import UploadProductPage from 'components/views/uploadProductPage/UploadProductPage';
import BoardPage from 'components/views/boardPage/BoardPage';
import BoardWritePage from 'components/views/boardWritePage/BoardWritePage';
import ProductDetailPage from './views/productDetailPage/productDetailPage';
import CartPage from './views/cartPage/CartPage';
import workBook from 'note/workBook';
import Auth from '../hoc/auth';

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		const uiConfig = {
			envState: process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
		};
		dispatch(uiState(uiConfig));
	}, []);
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<NavBar></NavBar>
			<div className='container' style={{ minHeight: 'calc(100vh - 80px)' }}>
				<Switch>
					<Route exact path='/' component={Auth(LandingPage, null)} />
					<Route exact path='/login' component={Auth(LoginPage, false)} />
					<Route exact path='/register' component={Auth(RegisterPage, false)} />
					<Route exact path='/product/upload' component={Auth(UploadProductPage, true)} />
					<Route exact path='/board' component={Auth(BoardPage, true)} />
					<Route exact path='/board/write' component={Auth(BoardWritePage, true)} />
					<Route
						exact
						path='/product/products_by_id/:productId'
						component={Auth(ProductDetailPage, null)}
					/>
					<Route exact path='/user/cart' component={Auth(CartPage, true)} />
					<Route exact path='/workbook' component={workBook} />
				</Switch>
			</div>
			<Footer />
		</Suspense>
	);
}

export default App;
