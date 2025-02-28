import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice.ts';
import cart from './slices/cartSlice.ts';
import flowers from './slices/flowersSlice.ts';
import { useDispatch } from 'react-redux';

const rootReducer = {
	filter,
	cart,
	flowers,
};

const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
