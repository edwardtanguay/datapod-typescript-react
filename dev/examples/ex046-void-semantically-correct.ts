(() => {

	// the semantics of void means that "no value is returned"
	// but in JavaScript, if no value is returned, then undefined is returned
	// and undefined is a type in JavaScript
	// so in TypeScript, void should be used semantically to mean "no value is returned"
	// so void is a good choice here since we will never check, use or be concerned about the value (which is, in fact, undefined)
	type FilterCallback<T> = (item: T) => void;

	const logFilter: FilterCallback<string> = (item) => {
		if (item.includes("error")) {
			console.warn("Item suspect :", item);
		}
	};

	const data = ["info", "error: 404", "warning"];
	data.forEach(logFilter);

	// let's call this function explicitly just to see what value is being explicitly returned
	const ret = logFilter("test");
	console.log("return value", ret); // undefined
})();
