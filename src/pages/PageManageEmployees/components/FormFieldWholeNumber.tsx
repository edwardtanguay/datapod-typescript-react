/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react";
import { UiItemType } from "../../../types";

type Props<T extends UiItemType> = {
	fieldIdCode: string;
	fieldLabel: string;
	uiItem: T;
	uiItems: T[];
	setUiItems: (utItems: T[]) => void;
}

export const FormFieldWholeNumber = <T extends UiItemType>({
	fieldIdCode,
	fieldLabel,
	uiItem,
	uiItems,
	setUiItems,
}: Props<T>) => {
	
	const _item = uiItem.item;
	const [item, setItem] = useState(_item);

	const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setItem({ ...item, [fieldIdCode]: value });
		setUiItems(
			uiItems.map((emp) =>
				emp.item.id === uiItem.item.id
					? {
							...emp,
							item: { ...emp.item, [fieldIdCode]: value },
					  }
					: emp
			)
		);
	};

	return (
		<div>
			<label
				htmlFor={fieldIdCode}
				className="block text-sm font-medium text-slate-700 mb-1"
			>
				{fieldLabel}
			</label>
			<input
				type="text"
				id={fieldIdCode}
				value={item[fieldIdCode as keyof typeof item]}
				onChange={(e) => handleValueChange(e)}
				className={`w-[7rem] text-right px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
			/>
		</div>
	);
};
