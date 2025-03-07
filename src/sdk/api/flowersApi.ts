import axios from 'axios';
import { FetchFlowersParams, Flower } from '../../redux/flower/types';

const BASE_URL = 'https://6786132df80b78923aa54fbb.mockapi.io/items';
const ITEMS_PER_PAGE = 4;

export const fetchFlowersApi = async (
	params: FetchFlowersParams
): Promise<Flower[]> => {
	try {
		const { data } = await axios.get<Flower[]>(BASE_URL, {
			params: {
				category: params.categoryId > 0 ? params.categoryId : undefined,
				search: params.searchValue,
				sortBy: params.sortBy,
				order: params.sortBy ? 'asc' : undefined,
				limit: ITEMS_PER_PAGE,
			},
		});
		return data;
	} catch (error) {
		console.error('Ошибка при загрузке данных:', error);
		throw error;
	}
};

export const fetchFlowerById = async (id: string): Promise<Flower> => {
	try {
		const { data } = await axios.get<Flower>(`${BASE_URL}/${id}`);
		return data;
	} catch (error) {
		console.error('Ошибка при загрузке данных:', error);
		throw error;
	}
};
export type { Flower };
