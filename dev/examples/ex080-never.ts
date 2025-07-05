(async () => {
	type Shape = "circle" | "square";

	function getArea(shape: Shape): number {
		switch (shape) {
			case "circle":
				return Math.PI * 10 * 10;
			case "square":
				return 10 * 10;
			default:
				// this is merely here to be explicit, it will never be executed if TypeScript rules are obeyed
				// it is written for the develop to see in this line, that shape here is indeed of type never, i.e. no type will make it here
				throw new Error(`Unhandled shape: ${shape satisfies never}`); 
		}
	}

	// const ret = getArea("triangle"); // TypeScript won't allow this, 
	const ret = getArea("circle");
	console.log(ret);
})();
