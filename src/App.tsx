import { Route, Routes, Navigate } from 'react-router-dom';

import Cart from './pages/Cart';
import Home from './pages/Home';
import FlowerDetails from './pages/FlowerDetails';
import NotFound from './pages/NotFound';
import './scss/app.scss';
import Layout from './Layout/Layout';

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				<Route path='' element={<Home />} />
				<Route path='cart' element={<Cart />} />
				<Route path='flowers/:id' element={<FlowerDetails />} />
				<Route path='Flower-Reaction/' element={<Navigate to='/' replace />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
