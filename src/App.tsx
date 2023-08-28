import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Main from './components/Main';
import ProductDetail from './components/ProductDetail';
import ProductRegister from './components/ProductRegister';
import Profile from './components/Profile';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Signup from './components/Signup';

import Login from './pages/Login';

const App: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<Main />} />
			<Route path='/login' element={<Login />} />
			<Route path='/signup' element={<Signup />} />
			<Route path='/detail' element={<ProductDetail />} />
			<Route path='/register' element={<ProductRegister />} />
			<Route path='/profile' element={<Profile />} />
			<Route path='/cart' element={<ShoppingCart />} />
		</Routes>
	);
};

export default App;
