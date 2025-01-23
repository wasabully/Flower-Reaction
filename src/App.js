import React from 'react';

import Catigories from './components/Catigories';
import FlowerBlock from './components/FlowerBlock';
import Header from './components/Header';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {
	const [Items, setItems] = React.useState([]);

	const getApiData = () => {
		fetch('https://6786132df80b78923aa54fbb.mockapi.io/items')
			.then((response) => response.json())
			.then((data) => {
				setItems(data);
			});
	};

	React.useEffect(() => {
		getApiData();
	}, []);

	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Catigories />
						<Sort />
					</div>
					<h2 className='content__title'>Все Цветы</h2>
					<div className='content__items'>
						{Items.map((obj) => (
							<FlowerBlock
								// title={obj.title}
								// price={obj.price}
								// sizes={obj.sizes}
								// imageUrl={obj.imageUrl}
								key={obj.id}
								{...obj}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
