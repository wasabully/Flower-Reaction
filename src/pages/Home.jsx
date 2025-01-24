import React from 'react';

import Catigories from '../components/Catigories';
import Sort from '../components/Sort';

import FlowerBlock from '../components/FlowerBlock';
import Skeleton from '../components/FlowerBlock/Skeleton';

export const Home = () => {
	const [Items, setItems] = React.useState([]);
	const [isLoading, setLoading] = React.useState(true);

	const getApiData = () => {
		fetch('https://6786132df80b78923aa54fbb.mockapi.io/items')
			.then((response) => response.json())
			.then((data) => {
				setItems(data);
				setLoading(false);
			});
	};

	React.useEffect(() => {
		getApiData();
	}, []);

	return (
		<>
			<div className='content__top'>
				<Catigories />
				<Sort />
			</div>
			<h2 className='content__title'>Все Цветы</h2>
			<div className='content__items'>
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: Items.map((obj) => <FlowerBlock key={obj.id} {...obj} />)}
			</div>
		</>
	);
};

export default Home;
