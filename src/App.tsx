import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Order from './components/Order';
import ProductDetail from './components/ProductDetail';
import ProductRegister from './components/ProductRegister';
import Profile from './components/Profile';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';

import Login from './pages/Login';
import Signup from './pages/Signup';
import CartContextProvider from './store/cart-context';
import MobileAuthForm from './layouts/Signup/MobileAuthForm';
import SignupForm from './layouts/Signup/SignupForm';

const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<Main />} />
			<Route path='/login' element={<Login />} />
			<Route path='/signup' element={<Signup />}>
				<Route index element={<MobileAuthForm />} />
				<Route path='step1' element={<SignupForm />} />
			</Route>
			<Route path='/detail' element={<ProductDetail />} />
			<Route path='/register' element={<ProductRegister />} />
			<Route path='/profile' element={<Profile />} />
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
	);
};

export default App;
