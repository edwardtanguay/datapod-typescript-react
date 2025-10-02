import { Employee } from "../../../types";

type Props = {
	employee: Employee;
}

export const Fields = ({ employee }: Props) => {
	return (
		<>
			<td className="px-3 py-2 text-sm text-gray-900">{employee.id}</td>
			<td className="px-3 py-2 text-sm text-gray-900">
				{employee.firstName}
			</td>
			<td className="px-3 py-2 text-sm text-gray-900">
				{employee.lastName}
			</td>
			<td className="px-3 py-2 text-sm text-gray-900">{employee.age}</td>
		</>
	);
};
