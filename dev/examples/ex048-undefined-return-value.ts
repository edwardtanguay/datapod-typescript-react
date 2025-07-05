(async () => {

	// in this example, we don't use the return value of "void" as we do in ex046
	// since the value undefined is intended to be used 
	const getInfo = (): (string|undefined) => {
		const rand = Math.floor(Math.random() * 3) + 1;
		if (rand == 1) {
			return "Product No. 2351";
		}
	}

	for (let i = 0; i <= 10; i++) {
		const value = getInfo();
		if (value === undefined) {
			console.log("(no value)");
		} else {
			console.log(`value = ${value}`);
		}
	}
})();