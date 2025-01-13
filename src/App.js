import Catigories from './components/Catigories';
import FlowerBlock from './components/FlowerBlock';
import Header from './components/Header';
import Sort from './components/Sort';
import './scss/app.scss';

function App() {
	return (
		<div className='wrapper'>
			<Header />
			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Catigories />
						<Sort />
					</div>
					<h2 className='content__title'>Все Цветы</h2>
					<div className='content__items'>
						{[
							{ title: 'Alyi', price: 2500, size: 'M' },
							{ title: 'Rable', price: 2400, size: 'L' },
							{ title: 'Terra', price: 3200, size: 'S' },
						].map((flower, index) => (
							<FlowerBlock
								key={index}
								title={flower.title}
								price={flower.price}
								size={flower.size}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
