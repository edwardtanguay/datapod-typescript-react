export const TableHeader = () => {
	return (
		<thead className="bg-gray-100 border-b border-gray-200">
			<tr>
				<th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
					ID
				</th>
				<th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
					First Name
				</th>
				<th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
					Last Name
				</th>
				<th className="px-3 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
					Age
				</th>
				<th className="px-3 py-2 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
					Actions
				</th>
			</tr>
		</thead>
	);
};
