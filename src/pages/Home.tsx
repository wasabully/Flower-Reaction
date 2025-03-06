import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';

import Categories from '../components/Categories';
import FlowerBlock from '../components/FlowerBlock';
import Skeleton from '../components/FlowerBlock/Skeleton';
import Sort from '../components/Sort';
import { popupContent } from '../components/Sort';
import NotFound from './NotFound';
import {
	fetchFlowers,
	selectFlowersData,
} from '../redux/slices/flowersSlice.ts';
import {
	filterSelector,
	setCategoryId,
	setFilters,
} from '../redux/slices/filterSlice.ts';
import { useAppDispatch } from '../redux/store.ts';

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const hasRendered = useRef(false);
	const isUrlSearch = useRef(false);

	const { categoryId, sort, currentPage, searchValue } =
		useSelector(filterSelector);
	const { items, isLoading } = useSelector(selectFlowersData);

	const itemsPerPage = 4;

	const onClickCategory = React.useCallback((index: number) => {
		dispatch(setCategoryId(index));
	}, []);

	React.useEffect(() => {
		if (hasRendered.current) {
			const queryString = qs.stringify({
				sortingProperties: sort.sortingProperties,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		} else {
			hasRendered.current = true;
		}
	}, [categoryId, sort.sortingProperties, currentPage]);

	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));

			const sort = popupContent.find(
				(obj) => obj.sortingProperties === params.sortingProperties
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
				sortBy: sort.sortingProperties,
				currentPage,
			})
		);
	}, [categoryId, sort.sortingProperties, currentPage, searchValue, dispatch]);

	const filteredItems = items.map((obj: any) => (
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
		</div>
	);
};

export default Home;
