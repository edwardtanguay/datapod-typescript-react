import { UiEmployee } from "../../../types";
import { FormFieldLine } from "./FormFieldLine";
import { FormFieldWholeNumber } from "./FormFieldWholeNumber";

type Props = {
	uiEmployee: UiEmployee;
	uiEmployees: UiEmployee[];
	setUiEmployees: (uiEmployees: UiEmployee[]) => void;
};

export const EditingArea = ({
	uiEmployee,
	uiEmployees,
	setUiEmployees,
}: Props) => {
	return (
		<>
			{uiEmployee.isEditing && (
				<tr>
					<td colSpan={5} className=" bg-blue-200">
						<form className="space-y-5 p-6">
							<FormFieldLine
								fieldIdCode="firstName"
								fieldLabel="First Name"
								uiItem={uiEmployee}
								uiItems={uiEmployees}
								setUiItems={setUiEmployees}
							/>
							<FormFieldLine
								fieldIdCode="lastName"
								fieldLabel="Last Name"
								uiItem={uiEmployee}
								uiItems={uiEmployees}
								setUiItems={setUiEmployees}
							/>

							<FormFieldWholeNumber
								fieldIdCode="age"
								fieldLabel="Age"
								uiItem={uiEmployee}
								uiItems={uiEmployees}
								setUiItems={setUiEmployees}
							/>
						</form>
					</td>
				</tr>
			)}
		</>
	);
};
