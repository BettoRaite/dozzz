export function calcAngle(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	isDegrees?: boolean,
) {
	const dx = x2 - x1;
	const dy = y2 - y1;

	const angleRadians = Math.atan2(dy, dx);
	let angle = angleRadians;

	if (isDegrees) {
		// converting to degrees.
		angle = angleRadians * (180 / Math.PI);
	}

	return angle;
}
