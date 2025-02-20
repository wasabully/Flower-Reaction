import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchFlowersApi } from '../../sdk/api/flowersApi';

export const fetchFlowers = createAsyncThunk(
	'flowers/fetchFlowers',
	async (params, { rejectWithValue }) => {
		try {
			const data = await fetchFlowersApi(params);
			return data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const flowersSlice = createSlice({
	name: 'flowers',
	initialState: {
		items: [],
		isLoading: false,
		error: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchFlowers.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchFlowers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.items = action.payload;
			})
			.addCase(fetchFlowers.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			});
	},
});

export default flowersSlice.reducer;
