import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import qs from 'qs';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import FlowerBlock from '../components/FlowerBlock';
import Skeleton from '../components/FlowerBlock/Skeleton';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import { popupContent } from '../components/Sort';
import NotFound from '../pages/NotFound';
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const hasRendered = useRef(false);
	const isUrlSearch = useRef(false);

	const { categoryId, sort, currentPage } = useSelector(
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

	const fetchData = async () => {
		setLoading(true);

		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';
		const sortBy = sort?.SortingProperties
			? `&sortBy=${sort.SortingProperties}&order=asc`
			: '';

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

	React.useEffect(() => {
		if (hasRendered.current) {
			const queryString = qs.stringify({
				SortingProperties: sort.SortingProperties,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		} else {
			hasRendered.current = true;
		}
	}, [categoryId, sort.SortingProperties, currentPage]);

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sort = popupContent.find(
				(obj) => obj.SortingProperties === params.SortingProperties
			);

			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
			isUrlSearch.current = true;
		}
	}, []);

	React.useEffect(() => {
		window.scrollTo(0, 0);

		if (!isUrlSearch.current) {
			fetchData();
		}

		isUrlSearch.current = false;
	}, [categoryId, sort.SortingProperties, currentPage, searchValue]);

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
