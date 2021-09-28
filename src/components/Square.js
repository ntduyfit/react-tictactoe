import React from 'react';
import propTypes from 'prop-types';

const Square = (props) => {
	const { value, onClick, isWin } = props;
	const classes = 'square' + (isWin ? ' winner' : '');
	return (
		<button className={classes} onClick={() => onClick()}>
			{value}
		</button>
	);
};

Square.propTypes = {
	onClick: propTypes.func,
	value: propTypes.string,
	isWin: propTypes.bool
};

export default Square;
