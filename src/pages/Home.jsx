import React from 'react';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import FlowerBlock from '../components/FlowerBlock';
import Skeleton from '../components/FlowerBlock/Skeleton';
import Pagination from '../components/Pagination';
import Sort from '../components/Sort';
import NotFound from '../pages/NotFound';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
	const dispatch = useDispatch();

	const categoryId = useSelector((state) => state.filter.categoryId);
	const sortingType = useSelector((state) => state.filter.sort);

	const { searchValue } = React.useContext(SearchContext);
	const [Items, setItems] = React.useState([]);
	const [isLoading, setLoading] = React.useState(true);
	// const [categoryId, setCategoryId] = React.useState(0);
	// const [sortingType, setSortingType] = React.useState({
	// 	name: 'Цене',
	// 	SortingProperties: 'price',
	// });

	const onClickCategory = (id) => {
		dispatch(setCategoryId(id)); // return {type: 'filters/setCategoryId, payload: id};
	};

	const [currentPage, setCurrentPage] = React.useState(1);
	const itemsPerPage = 4;

	const filteredItems = Items.map((obj) => (
		<FlowerBlock key={obj.id} {...obj} />
	));
	const skeletons = [...new Array(itemsPerPage)].map((_, index) => (
		<Skeleton key={index} />
	));
	const category = categoryId > 0 ? `category=${categoryId}` : '';
	const search = searchValue ? `&search=${searchValue}` : '';

	const getApiData = React.useCallback(() => {
		setLoading(true);
		const sortBy = `&sortBy=${sortingType.SortingProperties}&order=asc`;
		const url = `https://6786132df80b78923aa54fbb.mockapi.io/items?${category}${search}${sortBy}&page=${currentPage}&limit=${itemsPerPage}`;

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setItems(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setItems([]);
				setLoading(false);
			});
	}, [categoryId, sortingType, searchValue, currentPage]);

	React.useEffect(() => {
		getApiData();
	}, [categoryId, sortingType, searchValue, currentPage]);

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
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</div>
	);
};

export default Home;
