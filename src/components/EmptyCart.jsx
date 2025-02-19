import React from 'react';
import { Link } from 'react-router-dom';
import CartEmpty from '../assets/img/CartEmpty.png';

const EmptyCart = () => {
	return (
		<div className='cart cart--empty'>
			<h2>Корзина пустая</h2>
			<p>Добавьте товары, чтобы оформить заказ</p>

			<img src={CartEmpty} alt='CartEmpty' />
			<div>
				{' '}
				<Link to='/' className='button button--black'>
					<span>Вернуться назад</span>
				</Link>
			</div>
		</div>
	);
};

export default EmptyCart;
