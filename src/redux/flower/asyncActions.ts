import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchFlowersParams, Flower } from './types';
import { fetchFlowersApi } from '../../sdk/api/flowersApi';

export const fetchFlowers = createAsyncThunk<
	Flower[],
	FetchFlowersParams,
	{ rejectValue: string }
>('flowers/fetchFlowers', async (params, { rejectWithValue }) => {
	try {
		const data = await fetchFlowersApi(params);
		return data;
	} catch (error) {
		if (error instanceof Error) {
			return rejectWithValue(error.message);
		}
		return rejectWithValue('Произошла неизвестная ошибка');
	}
});
