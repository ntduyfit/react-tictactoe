import React from 'react';
import PropTypes from 'prop-types';

const History = (props) => {
	const { history, steps, isAscending, jumpTo } = props;

	let moves;
	if (isAscending) {
		moves = history.map((step, move) => {
			const stepList = move
				? 'Go to move #' + move + ` (${step.position.row}, ${step.position.col})`
				: 'Go to game start';
			return (
				<li key={'move' + move} className={move === steps.current && 'bold'}>
					<button onClick={() => jumpTo(move)}>{stepList}</button>
				</li>
			);
		});
	} else {
		const revertHistory = history.slice().reverse();
		moves = revertHistory.map((step, move) => {
			const displayMove = steps.max - move;
			const stepList =
				step.position.col !== -1
					? 'Go to move #' + displayMove + ` (${step.position.row}, ${step.position.col})`
					: 'Go to game start';
			return (
				<li key={'move' + displayMove} className={displayMove === steps.current && 'bold'}>
					<button onClick={() => jumpTo(displayMove)}>{stepList}</button>
				</li>
			);
		});
	}
	return <React.Fragment>{moves}</React.Fragment>;
};

History.propTypes = {
	history: PropTypes.array,
	steps: PropTypes.object,
	isAscending: PropTypes.bool,
	jumpTo: PropTypes.func
};

export default History;
