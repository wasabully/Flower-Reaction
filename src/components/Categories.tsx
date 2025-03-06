import React from 'react';
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
	categoryId: number;
	onClickCategory: (id: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
	({ categoryId, onClickCategory }) => {
		// предотвратил лишнюю перерисовку memo
		const categories = ['Все', 'Моно', 'Эффект', 'Комплимент', 'Хиты'];

		useWhyDidYouUpdate('Categories', { categoryId, onClickCategory });

		return (
			<div className='categories'>
				<ul>
					{categories.map((value, id) => (
						<li
							key={id}
							onClick={() => onClickCategory(id)}
							className={categoryId === id ? 'active' : ''}
						>
							{value}
						</li>
					))}
				</ul>
			</div>
		);
	}
);

export default Categories;
