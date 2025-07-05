(async () => {
	// you have to handle null and undefined
	// e.g. with if or ?

	type DirtyNumber = number | undefined | null;

	const showDecimalPlaces = (
		dirtyNumber: DirtyNumber
	): string | undefined => {
		if (dirtyNumber) {
			const num: number = dirtyNumber;
			return num.toFixed(2);
		} else {
			return `ERROR: ${dirtyNumber} is not a number`;
		}
	};

	const nums: DirtyNumber[] = [1, 6, undefined, null, 2, 3];

	console.log("function", showDecimalPlaces(nums[0]));
	console.log("function", showDecimalPlaces(nums[2]));

	const n1 = nums[0];
	console.log("direct", n1?.toFixed(2));
	const n2 = nums[2];
	console.log("direct", n2?.toFixed(2));
})();
