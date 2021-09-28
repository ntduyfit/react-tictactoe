import React, { useState } from 'react';

import Board from './components/Board';
import History from './components/History';
import CalculatePosition from './helpers/CalculatePosition';
import CalculateWinner from './helpers/CalculateWinner';

import './App.css';

export const CELLS_NUM = 9;

const initHistory = [
	{
		squares: Array(CELLS_NUM).fill(null),
		position: {
			row: -1,
			col: -1
		}
	}
];

const initStepNumber = {
	max: 0,
	current: 0
};

const Game = () => {
	const [history, setHistory] = useState(initHistory);
	const [stepNumber, setStepNumber] = useState(initStepNumber);
	const [xIsNext, setXIsNext] = useState(true);
	const [isAscending, setIsAscending] = useState(true);

	const jumpTo = (step) => {
		setStepNumber((prev) => ({
			...prev,
			current: step
		}));
		const check = step % 2 === 0;
		setXIsNext(check);
	};

	const handleClick = (i) => {
		const current = history[stepNumber.current];
		const squares = current.squares.slice();
		if (CalculateWinner(squares) || squares[i]) {
			return;
		}
		squares[i] = xIsNext ? 'X' : 'O';
		const position = CalculatePosition(i);

		const currentHistory = history.slice(0, stepNumber.current + 1);

		setHistory(() => [
			...currentHistory,
			{
				position,
				squares
			}
		]);

		const newStepNumber = currentHistory.length;
		setStepNumber({
			current: newStepNumber,
			max: newStepNumber
		});
		const checkNext = !xIsNext;
		setXIsNext(checkNext);
	};

	const handleSortChange = () => {
		const toggle = !isAscending;
		setIsAscending(toggle);
	};

	const current = history[stepNumber.current];
	const winner = CalculateWinner(current.squares);

	const isDraw = stepNumber.current === 9 && !winner;

	return (
		<div className='game'>
			<div className='game-board'>
				<Board squares={current.squares} onClick={handleClick} winner={winner} />
			</div>
			<div className='game-info'>
				<button onClick={handleSortChange}>Sort steps order</button>
				<span>{isAscending ? 'Ascending' : 'Descending'}</span>
				{isDraw ? (
					<div>Draw</div>
				) : (
					<div>{winner ? 'Winner: ' + winner.symbol : 'Next player: ' + (xIsNext ? 'X' : 'O')}</div>
				)}
				<ol>
					<History steps={stepNumber} history={history} jumpTo={jumpTo} isAscending={isAscending} />
				</ol>
			</div>
		</div>
	);
};

export default Game;
