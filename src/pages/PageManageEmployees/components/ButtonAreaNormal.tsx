import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import { UiEmployee } from "../../../types";

type Props = {
	uiEmployee: UiEmployee;
	uiEmployees: UiEmployee[];
	setUiEmployees: (uiEmployees: UiEmployee[]) => void;
};

export const ButtonAreaNormal = ({
	uiEmployee,
	uiEmployees,
	setUiEmployees,
}: Props) => {

	const employee = uiEmployee.item;

	const handleSetDeletingEmployee = (id: number) => {
		setUiEmployees(
			uiEmployees.map((emp) =>
				emp.item.id === id ? { ...emp, isDeleting: true } : emp
			)
		);
	};

	const handleSetEditingEmployee = (id: number) => {
		setUiEmployees(
			uiEmployees.map((emp) =>
				emp.item.id === id ? { ...emp, isEditing: true } : emp
			)
		);
	};

	return (
		<>
			{!uiEmployee.isDeleting && !uiEmployee.isEditing && (
				<>
					<button
						onClick={() => handleSetEditingEmployee(employee.id)}
						className="p-2 text-blue-600 rounded-lg transition-colors"
						aria-label="Edit employee"
					>
						<FaPencilAlt />
					</button>
					<button
						onClick={() => handleSetDeletingEmployee(employee.id)}
						className="p-2 text-red-600 rounded-lg transition-colors"
						aria-label="Delete employee"
					>
						<FaRegTrashAlt />
					</button>
				</>
			)}
		</>
	);
};
