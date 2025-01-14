import flowers from './assets/flower.json';
import Catigories from './components/Catigories';
import FlowerBlock from './components/FlowerBlock';
import Header from './components/Header';
import Sort from './components/Sort';
import './scss/app.scss';

console.log(flowers);
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
						{flowers.map((obj) => (
							<FlowerBlock
								// title={obj.title}
								// price={obj.price}
								// sizes={obj.sizes}
								// imageUrl={obj.imageUrl}
								key={obj.id}
								{...obj}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
