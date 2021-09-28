import React from 'react';
import propTypes from 'prop-types';

import Square from './Square';

const Board = (props) => {
	const { squares, onClick, winner } = props;

	const Row = ({ firstElem }) => {
		const lastElem = firstElem + 3;
		const rawSquares = squares.slice(firstElem, lastElem);
		return (
			<div className='board-row'>
				{rawSquares.map((square, index) => {
					const exactIndex = index + firstElem;
					return (
						<Square
							key={'key' + exactIndex}
							value={square}
							onClick={() => onClick(exactIndex)}
							isWin={winner && winner.line.includes(exactIndex)}
						/>
					);
				})}
			</div>
		);
	};

	Row.propTypes = {
		firstElem: propTypes.number
	};

	const Rows = () => {
		const rows = [];
		for (let i = 0; i < squares.length; i += 3) {
			rows.push(<Row key={'row' + i} firstElem={i} />);
		}
		return rows;
	};

	return (
		<div>
			<Rows />
		</div>
	);
};

Board.propTypes = {
	squares: propTypes.array,
	onClick: propTypes.func,
	winner: propTypes.array
};

export default Board;
