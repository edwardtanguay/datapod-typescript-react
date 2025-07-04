(() => {
	const display = (items: (number | string)[]): void => {
		for (const item of items) {
			console.log(item);
		}
	};

	// const items = [34, "small", 5, "large", 545, "medium", false];
	const items = [34, "small", 5, "large", 545, "medium"];
	display(items);
})();
