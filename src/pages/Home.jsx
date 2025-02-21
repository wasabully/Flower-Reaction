import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';

import { SearchContext } from '../App';
import Categories from '../components/Categories';
import FlowerBlock from '../components/FlowerBlock';
import Skeleton from '../components/FlowerBlock/Skeleton';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import { popupContent } from '../components/Sort';
import NotFound from '../pages/NotFound';
import { fetchFlowers, selectFlowersData } from '../redux/slices/flowersSlice';
import {
	filterSelector,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const hasRendered = useRef(false);
	const isUrlSearch = useRef(false);

	const { categoryId, sort, currentPage } = useSelector(filterSelector);
	const { items, isLoading } = useSelector(selectFlowersData);
	const { searchValue } = React.useContext(SearchContext);

	const itemsPerPage = 4;

	const onClickCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onPageChange = (number) => {
		dispatch(setCurrentPage(number));
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

		dispatch(
			fetchFlowers({
				categoryId,
				searchValue,
				sortBy: sort.SortingProperties,
				currentPage,
			})
		);
	}, [categoryId, sort.SortingProperties, currentPage, searchValue, dispatch]);

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
