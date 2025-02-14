import React from 'react';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';

function Search() {
	const { setsearchValue } = React.useContext(SearchContext);
	const inputRef = React.useRef();
	const [value, setValue] = React.useState('');

	const updateSearchValue = React.useCallback(
		debounce((str) => {
			setsearchValue(str);
		}, 250),
		[]
	);

	const onChangeInput = (event) => {
		setValue(event.target.value);
		updateSearchValue(event.target.value);
	};
	const onClickClear = () => {
		setValue('');
		setsearchValue('');
		inputRef.current.focus();
	};
	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				xmlns='http://www.w3.org/2000/svg'
				x='0px'
				y='0px'
				width='30'
				height='30'
				viewBox='0 0 30 30'
			>
				<path d='M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z'></path>
			</svg>
			<input
				ref={inputRef}
				value={value}
				onChange={onChangeInput}
				placeholder='Поиск букетов'
				className={styles.input}
			/>
			{value && (
				<svg
					onClick={onClickClear}
					className={styles.clear}
					data-name='Capa 1'
					id='Capa_1'
					viewBox='0 0 20 19.84'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path d='M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z' />
				</svg>
			)}
		</div>
	);
}

export default Search;
