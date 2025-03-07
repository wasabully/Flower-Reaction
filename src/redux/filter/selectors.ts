import { RootState } from '../store';

export const filterSelector = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;
