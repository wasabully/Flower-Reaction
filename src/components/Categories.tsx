import React from 'react';

type CategoriesProps = {
	categoryId: number;
	onClickCategory: (id: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
	({ categoryId, onClickCategory }) => {
		const categories = ['Все', 'Моно', 'Эффект', 'Комплимент', 'Хиты'];

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
