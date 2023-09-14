import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Main from './components/Main';
import Order from './components/Order';
import ProductList from './components/List/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductRegister from './components/ProductRegister';
import Profile from './components/Profile';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

import MobileAuthForm from './layouts/Signup/MobileAuthForm';
import SignupForm from './layouts/Signup/SignupForm';
import CartContextProvider from './context/cart-context';

import Login from './pages/Login';
import Signup from './pages/Signup';
import OrderCompleted from './components/OrderCompleted';
import Header from './components/Header/Header';
import MyProductList from './components/List/MyProductList';
const App: React.FC = () => {
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/login' element={<Login />} />
				<Route path='/signup' element={<Signup />}>
					<Route index element={<MobileAuthForm />} />
					<Route path='step1' element={<SignupForm />} />
				</Route>
				<Route path='/productdetail' element={<ProductDetail />} />
				<Route path='/ordered' element={<OrderCompleted />} />
				<Route path='/detail/:productId' element={<ProductDetail />} />
				<Route path='/register' element={<ProductRegister />} />
				<Route path='/productlist/:pageName' element={<ProductList />} />
				<Route path='/myproductlist' element={<MyProductList />} />
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
		</>
	);
};

export default App;
