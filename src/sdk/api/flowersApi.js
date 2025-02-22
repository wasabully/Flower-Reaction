import axios from 'axios';

const BASE_URL = 'https://6786132df80b78923aa54fbb.mockapi.io/items';
const ITEMS_PER_PAGE = 4;

export const fetchFlowersApi = async ({
	categoryId,
	searchValue,
	sortBy,
	currentPage,
}) => {
	try {
		const response = await axios.get(BASE_URL, {
			params: {
				category: categoryId > 0 ? categoryId : undefined,
				search: searchValue || undefined,
				sortBy: sortBy || undefined,
				order: sortBy ? 'asc' : undefined,
				page: currentPage,
				limit: ITEMS_PER_PAGE,
			},
		});
		return response.data;
	} catch (error) {
		console.error('Ошибка при загрузке данных:', error);
		throw error;
	}
};

export const fetchFlowerById = async (id) => {
	try {
		const response = await axios.get(`${BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error('Ошибка при загрузке данных:', error);
		throw error;
	}
};
