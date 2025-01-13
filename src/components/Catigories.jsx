import React from 'react';

function Categories() {
	const categories = ['Все Букеты', 'Моно', 'Эффект', 'Комплимент', 'Хиты'];
	const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0);

	console.log(activeCategoryIndex);

	return (
		<div className='categories'>
			<ul>
				{categories.map((value, i) => (
					<li
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
