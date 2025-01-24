import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
	<ContentLoader
		className='flower-block'
		speed={2}
		width={280}
		height={465}
		viewBox='0 0 280 465'
		backgroundColor='#f3f3f3'
		foregroundColor='#ecebeb'
	>
		<rect x='80' y='72' rx='0' ry='0' width='1' height='0' />
		<rect x='0' y='259' rx='6' ry='6' width='280' height='53' />
		<rect x='68' y='212' rx='0' ry='0' width='11' height='0' />
		<rect x='0' y='217' rx='6' ry='6' width='280' height='27' />
		<rect x='0' y='332' rx='6' ry='6' width='95' height='30' />
		<rect x='124' y='325' rx='25' ry='25' width='152' height='45' />
		<rect x='0' y='0' rx='6' ry='6' width='280' height='196' />
	</ContentLoader>
);

export default Skeleton;
