import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchFlowerById } from '../sdk/api/flowersApi';

interface Flower {
	imageUrl: string;
	title: string;
	price: number;
}

const FlowerDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [flower, setFlower] = useState<Flower | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const getFlower = async () => {
			if (!id) return;

			try {
				const data = await fetchFlowerById(id);
				setFlower(data);
			} catch (err) {
				if (err instanceof Error) {
					alert(err.message || 'Ошибка при загрузке цветка');
				}
				navigate('/');
			}
		};

		if (id) {
			getFlower();
		}
	}, [id, navigate]);

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
