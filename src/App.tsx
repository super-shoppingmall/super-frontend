import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Main from './components/Main';
import Order from './components/Order';
import ProductList from './components/List/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductRegister from './components/ProductRegister';
import Profile from './components/Profile';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import OrderCompleted from './components/OrderCompleted';
import Footer from './components/Footer/Footer';

import CartContextProvider from './context/cart-context';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Wrapper from './components/Wrapper/Wrapper';

const App: React.FC = () => {
	return (
		<>
			<Header />
			<Wrapper>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='/login' element={<Login />} />
					<Route path='/login/member' element={<Login />} />
					<Route path='/signup/' element={<Signup />} />
					<Route path='/signup/member' element={<Signup />} />
					<Route path='/productdetail' element={<ProductDetail />} />
					<Route path='/ordered' element={<OrderCompleted />} />
					<Route path='/detail/:productId' element={<ProductDetail />} />
					<Route path='/register' element={<ProductRegister />} />
					<Route path='/productlist/:pageName' element={<ProductList />} />
					<Route
						path='/profile'
						element={
							<CartContextProvider>
								<Profile />
							</CartContextProvider>
						}
					></Route>
					<Route
						path='/cart'
						element={
							<CartContextProvider>
								<ShoppingCart />
							</CartContextProvider>
						}
					></Route>
					<Route
						path='/order'
						element={
							<CartContextProvider>
								<Order />
							</CartContextProvider>
						}
					></Route>
				</Routes>
			</Wrapper>
			<Footer />
		</>
	);
};

export default App;
