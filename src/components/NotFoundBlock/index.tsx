import React from 'react';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
	return (
		<div className={styles.NotFoundBlock}>
			<h1>Ничего не найдено</h1>
			<p className={styles.description}>
				К сожалению, запрашиваемая страница отсутствует. <br /> Попробуйте
				проверить адрес или вернуться на главную страницу.
			</p>
		</div>
	);
};

export default NotFoundBlock;
