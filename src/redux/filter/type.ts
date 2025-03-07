export type SortType = {
	name: string;
	sortingProperties: 'price' | 'title' | 'rating';
};

export interface FilterState {
	categoryId: number;
	sort: SortType;
	searchValue: string;
}
