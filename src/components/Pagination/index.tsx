import React from 'react';

import styles from './Pagination.module.scss';

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: any;
};

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const handlePageClick = (page: number) => {
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
