import React from 'react';
import { Route, Routes } from 'react-router';
import Header from './components/Header';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './scss/app.scss';

export const SearchContext = React.createContext('');

function App() {
	const [searchValue, setsearchValue] = React.useState('');

	return (
		<div className='wrapper'>
			<SearchContext.Provider value={{ searchValue, setsearchValue }}>
				<Header />
				<div className='content'>
					<Routes>
						<Route path='/' element={<Home searchValue={searchValue} />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</div>
			</SearchContext.Provider>
		</div>
	);
}

export default App;
