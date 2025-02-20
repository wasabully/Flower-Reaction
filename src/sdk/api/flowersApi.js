const BASE_URL = 'https://6786132df80b78923aa54fbb.mockapi.io/items';
const ITEMS_PER_PAGE = 4;

export const fetchFlowersApi = async ({
	categoryId,
	searchValue,
	sortBy,
	currentPage,
}) => {
	const category = categoryId > 0 ? `category=${categoryId}` : '';
	const search = searchValue ? `&search=${searchValue}` : '';
	const sort = sortBy ? `&sortBy=${sortBy}&order=asc` : '';
	const page = `&page=${currentPage}&limit=${ITEMS_PER_PAGE}`;

	const url = `${BASE_URL}?${category}${search}${sort}${page}`;
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error('Ошибка при загрузке данных');
	}

	return await response.json();
};
