import React from 'react';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const handlePageClick = (page) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	return (
		<div className={styles.pagination}>
			<button
				onClick={() => handlePageClick(currentPage - 1)}
				disabled={currentPage === 1}
			>
				{'<'}
			</button>

			{[...Array(totalPages)].map((_, index) => {
				const pageNumber = index + 1;
				return (
					<button
						key={index}
						className={pageNumber === currentPage ? styles.active : ''}
						onClick={() => handlePageClick(pageNumber)}
					>
						{pageNumber}
					</button>
				);
			})}

			<button
				onClick={() => handlePageClick(currentPage + 1)}
				disabled={currentPage === totalPages}
			>
				{'>'}
			</button>
		</div>
	);
};

export default Pagination;
