import React from 'react';

function Categories({ categoryId, onClickCategory }) {
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

export default Categories;
