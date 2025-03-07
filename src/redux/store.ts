import { configureStore } from '@reduxjs/toolkit';
import filter from './filter/slice.ts';
import cart from './cart/slice.ts';
import flowers from './flower/slice.ts';
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
