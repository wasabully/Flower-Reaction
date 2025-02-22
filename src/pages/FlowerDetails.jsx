import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFlowerById } from '../sdk/api/flowersApi';

const FlowerDetails = () => {
	const { id } = useParams();
	const [flower, setFlower] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const getFlower = async () => {
			try {
				const data = await fetchFlowerById(id);
				setFlower(data);
			} catch (err) {
				setError(err.message || 'Ошибка при загрузке цветка');
			}
		};

		if (id) {
			getFlower();
		}
	}, [id]);

	if (error) {
		return (
			<div className='container'>
				<h1>Flowers</h1>
				<p style={{ color: 'red' }}>{error}</p>
			</div>
		);
	}

	if (!flower) {
		return (
			<div className='container'>
				<h1>Flowers</h1>
				<p>Загрузка...</p>
			</div>
		);
	}
	return (
		<div className='container'>
			<h1>Flowers</h1>

			<div>
				<img src={flower.imageUrl} alt={flower.title} />
				<h2>{flower.title}</h2>
				<h4>{flower.price}</h4>
			</div>
		</div>
	);
};

export default FlowerDetails;
