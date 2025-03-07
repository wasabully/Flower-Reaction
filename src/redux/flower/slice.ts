import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flower } from '../../sdk/api/flowersApi';
import { FlowersState } from './types';
import { fetchFlowers } from './asyncActions';

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

export default flowersSlice.reducer;
