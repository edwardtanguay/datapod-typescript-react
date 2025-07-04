(() => {
	const splitName = (fullName: string): [string, string] => {
		const [first, ...rest] = fullName.split(" ");
		return [first, rest.join(" ")];
	};

	const names1 = splitName("Hans Akron");
	const names2 = splitName("Juan Carlos Martínez García");

	console.log(names1);
	console.log(names2);
})();
