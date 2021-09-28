const calculatePosition = (index) => {
	const row = Math.floor(index / 3 + 1);
	const col = (index % 3) + 1;
	return { row, col };
};

export default calculatePosition;
