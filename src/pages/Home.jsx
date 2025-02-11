import React from 'react';
import { SearchContext } from '../App';
import Catigories from '../components/Catigories';
import FlowerBlock from '../components/FlowerBlock';
import Skeleton from '../components/FlowerBlock/Skeleton';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import NotFound from '../pages/NotFound';

const Home = () => {
	const { searchValue } = React.useContext(SearchContext);
	const [Items, setItems] = React.useState([]);
	const [isLoading, setLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0);
	const [sortingType, setSortingType] = React.useState({
		name: 'Цене',
		SortingProperties: 'price',
	});
	const [currentPage, setCurrentPage] = React.useState(1);
	const itemsPerPage = 4;

	console.log('categoryid:', categoryId, 'sortingType:', sortingType);

	// .filter((obj) => {
	// 	if (obj.title.toLowerCase().includes(searchValue.toLowerCase())) {
	// 		return true;
	// 	}
	// 	return false;
	// })// Если статичный массив подходит

	const filteredItems = Items.map((obj) => (
		<FlowerBlock key={obj.id} {...obj} />
	));
	const skeletons = [...new Array(itemsPerPage)].map((_, index) => (
		<Skeleton key={index} />
	));
	const category = categoryId > 0 ? `category=${categoryId}` : '';
	const search = searchValue ? `&search=${searchValue}` : '';

	const getApiData = () => {
		setLoading(true);
		const url = `https://6786132df80b78923aa54fbb.mockapi.io/items?${category}${search}&page=${currentPage}&limit=${itemsPerPage}`;
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error(`Error ${response.status}: Not Found`);
				}
				return response.json();
			})
			.then((data) => {
				setItems(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setItems([]);
				setLoading(false);
			});
	};

	React.useEffect(() => {
		getApiData();
	}, [categoryId, sortingType, searchValue, currentPage]);

	return (
		<div className='container'>
			<div className='content__top'>
				<Catigories
					categoryId={categoryId}
					onClickCategory={(id) => setCategoryId(id)}
				/>
				<Sort
					sortingType={sortingType}
					onClickSorting={(id) => setSortingType(id)}
				/>
			</div>
			<h2 className='content__title'>Все Букеты</h2>
			<div className='content__items'>
				{isLoading ? (
					skeletons
				) : filteredItems.length > 0 ? (
					filteredItems
				) : (
					<NotFound />
				)}
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={3}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	);
};

export default Home;
