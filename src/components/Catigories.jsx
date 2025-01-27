import React from 'react';

function Categories() {
	const categories = ['Все', 'Моно', 'Эффект', 'Комплимент', 'Хиты'];
	const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0);

	console.log('activeCategoryIndex:', activeCategoryIndex);

	return (
		<div className='categories'>
			<ul>
				{categories.map((value, i) => (
					<li
						key={i}
						onClick={() => setActiveCategoryIndex(i)}
						className={activeCategoryIndex === i ? 'active' : ''}
					>
						{value}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Categories;
