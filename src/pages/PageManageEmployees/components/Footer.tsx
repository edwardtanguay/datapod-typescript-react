import { UiEmployee } from "../../../types";

type Props = {
	uiEmployees: UiEmployee[];
};

export const Footer = ({ uiEmployees }: Props) => {
	return (
		<p className="mt-4 text-sm text-gray-600">
			Total Employees: {uiEmployees.length}
		</p>
	);
};
