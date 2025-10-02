import { FaRegTrashAlt } from "react-icons/fa";
import { ImUndo2 } from "react-icons/im";
import { UiEmployee } from "../../../types";

type Props = {
	uiEmployee: UiEmployee;
	handleDeleteEmployee: (id: number) => void;
	handleCancelProcess: (id: number) => void;
};

export const ButtonAreaDeleting = ({
	uiEmployee,
	handleDeleteEmployee,
	handleCancelProcess,
}: Props) => {
	const employee = uiEmployee.item;

	return (
		<>
			{uiEmployee.isDeleting && (
				<>
					<button
						onClick={() => handleDeleteEmployee(employee.id)}
						className="p-2 text-red-900 rounded-lg transition-colors border-gray-400"
						aria-label="Delete employee"
					>
						<FaRegTrashAlt />
					</button>
					<button
						onClick={() => handleCancelProcess(employee.id)}
						className="p-2 text-gray-600 rounded-lg transition-colors border-gray-400"
						aria-label="Edit employee"
					>
						<ImUndo2 />
					</button>
				</>
			)}
		</>
	);
};
