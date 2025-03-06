import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

import { fetchFlowersApi } from '../../sdk/api/flowersApi';

export interface Flower {
	id: string;
	title: string;
	price: number;
	sizes: string[];
	imageUrl: string;
	count: number;
}

export interface FetchFlowersParams {
	categoryId: number;
	searchValue: string;
	sortBy: string;
}

export interface FlowersState {
	items: Flower[];
	isLoading: boolean;
	error: string | null;
}

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

const initialState: FlowersState = {
	items: [],
	isLoading: false,
	error: null,
};

const flowersSlice = createSlice({
	name: 'flowers',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFlowers.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(
				fetchFlowers.fulfilled,
				(state, action: PayloadAction<Flower[]>) => {
					state.isLoading = false;
					state.items = action.payload;
				}
			)
			.addCase(fetchFlowers.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const selectFlowersData = (state: RootState) => state.flowers;
export default flowersSlice.reducer;
