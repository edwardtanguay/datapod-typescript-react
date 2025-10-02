import { ImUndo2 } from "react-icons/im";
import { Employee, UiEmployee } from "../../../types";
import { FaRegFloppyDisk } from "react-icons/fa6";

type Props = {
	uiEmployee: UiEmployee;
	handleSaveEmployee: (employee: Employee) => void;
	handleCancelProcess: (id: number) => void;
};

export const ButtonAreaEditing = ({
	uiEmployee,
	handleSaveEmployee,
	handleCancelProcess,
}: Props) => {
	const employee = uiEmployee.item;
	return (
		<>
			{uiEmployee.isEditing && (
				<>
					<button
						onClick={() => handleCancelProcess(employee.id)}
						className="p-2 text-gray-600 rounded-lg transition-colors"
						aria-label="Edit employee"
					>
						<ImUndo2 />
					</button>
					<button
						onClick={() => handleSaveEmployee(employee)}
						className="p-2 text-blue-600 rounded-lg transition-colors"
						aria-label="Delete employee"
					>
						<FaRegFloppyDisk />
					</button>
				</>
			)}
		</>
	);
};
