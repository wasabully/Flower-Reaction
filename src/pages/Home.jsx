import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import FlowerBlock from '../components/FlowerBlock';
import Skeleton from '../components/FlowerBlock/Skeleton';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import NotFound from '../pages/NotFound';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
	const dispatch = useDispatch();

	const { categoryId, sortingType, currentPage } = useSelector(
		(state) => state.filter
	);
	const { searchValue } = React.useContext(SearchContext);

	const [items, setItems] = React.useState([]);
	const [isLoading, setLoading] = React.useState(true);
	const itemsPerPage = 4;

	const onClickCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onPageChange = (number) => {
		dispatch(setCurrentPage(number));
	};

	const category = categoryId > 0 ? `category=${categoryId}` : '';
	const search = searchValue ? `&search=${searchValue}` : '';
	const sortBy = sortingType?.SortingProperties
		? `&sortBy=${sortingType.SortingProperties}&order=asc`
		: '';

	React.useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const url = `https://6786132df80b78923aa54fbb.mockapi.io/items?${category}${search}${sortBy}&page=${currentPage}&limit=${itemsPerPage}`;

			try {
				const response = await axios.get(url);
				setItems(response.data);
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [category, search, sortBy, currentPage]);

	const filteredItems = items.map((obj) => (
		<FlowerBlock key={obj.id} {...obj} />
	));
	const skeletons = [...new Array(itemsPerPage)].map((_, index) => (
		<Skeleton key={index} />
	));

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories categoryId={categoryId} onClickCategory={onClickCategory} />
				<Sort />
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
				onPageChange={onPageChange}
			/>
		</div>
	);
};

export default Home;
