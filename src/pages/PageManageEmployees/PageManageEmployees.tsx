/* eslint-disable no-mixed-spaces-and-tabs */
import * as config from "../../config";
import axios from "axios";
import { useEffect, useState } from "react";
import { Employee, UiEmployee } from "../../types";
import { FaSpinner } from "react-icons/fa6";
import "./styles.css";
import { TableHeader } from "./components/TableHeader";
import { Title } from "./components/Title";
import { ButtonAreaNormal } from "./components/ButtonAreaNormal";
import { ButtonAreaDeleting } from "./components/ButtonAreaDeleting";
import { ButtonAreaEditing } from "./components/ButtonAreaEditing";
import { Fields } from "./components/Fields";
import { EditingArea } from "./components/EditingArea";
import { Footer } from "./components/Footer";
import React from "react";

const backendUrl = config.backendUrl();
const token = config.getToken();

export const PageManageEmployees = () => {
	const [uiEmployees, setUiEmployees] = useState<UiEmployee[]>([]);
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(`${backendUrl}/employees`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const _employees = response.data;
				const _uiEmployees: UiEmployee[] = _employees.map(
					(emp: Employee) => ({
						item: emp,
						originalEmployee: emp,
						isDeleting: false,
						isEditing: false,
					})
				);
				console.log(333, _uiEmployees);
				setTimeout(() => {
					setUiEmployees(_uiEmployees);
				}, 500);
			} catch (error: unknown) {
				if (
					typeof error === "object" &&
					error !== null &&
					"response" in error
				) {
					const axiosError = error as {
						response?: { data?: { error?: string } };
					};
					setErrorMessage(
						axiosError.response?.data?.error ||
							"Error fetching employees"
					);
				} else {
					setErrorMessage("Unknown error fetching employees");
				}
			}
		})();
	}, []);

	const handleCancelProcess = (id: number) => {
		setUiEmployees(
			uiEmployees.map((emp) =>
				emp.item.id === id
					? {
							...emp,
							isDeleting: false,
							isEditing: false,
							item: emp.originalEmployee,
					  }
					: emp
			)
		);
	};

	const handleDeleteEmployee = async (id: number) => {
		try {
			const response = await fetch(`${backendUrl}/employees/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			if (!response.ok) {
				setErrorMessage("Network response was not ok");
			} else {
				setUiEmployees(uiEmployees.filter((emp) => emp.item.id !== id));
			}
		} catch (error: unknown) {
			setErrorMessage(
				`Error deleting employee: ${
					(error as { message: string }).message
				}`
			);
		}
	};

	const handleSaveEmployee = async (item: Employee) => {
		try {
			const response = await fetch(
				`${backendUrl}/employees/${item.id}`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(item),
				}
			);
			if (!response.ok) {
				console.log(response);
				setErrorMessage(`Network response was not ok`);
			} else {
				// set isEditing back to false
				setUiEmployees(
					uiEmployees.map((emp) =>
						emp.item.id === item.id
							? { ...emp, originalEmployee: { ...item }, isEditing: false }
							: emp
					)
				);
			}
		} catch (error: unknown) {
			setErrorMessage(
				`Error deleting employee: ${
					(error as { message: string }).message
				}`
			);
		}
	};

	return (
		<>
			{uiEmployees.length <= 0 ? (
				<FaSpinner className="animate-spin text-[3rem] text-slate-600" />
			) : (
				<>
					{errorMessage && (
						<p className="mb-3 text-red-500 bg-black flex justify-center text-lg uppercase">
							{errorMessage}
						</p>
					)}
					{!errorMessage && (
						<div className="min-h-screen bg-gray-50 p-8">
							<div className="max-w-5xl mx-auto">
								<Title />
								<div
									className={`rounded-lg shadow-md overflow-hidden`}
								>
									<table className="w-full">
										<TableHeader />
										<tbody className="divide-y divide-gray-200">
											{uiEmployees.map((uiEmployee) => {
												const item = uiEmployee.item;
												return (
													<React.Fragment
														key={uiEmployee.item.id}
													>
														<tr
															key={item.id}
															className={`${
																uiEmployee.isDeleting
																	? "rowDeleting"
																	: ""
															} hover:bg-gray-50 bg-white transition-colors`}
														>
															<Fields
																employee={item}
															/>
															<td className="px-3 py-2 text-sm text-right">
																<div className="flex justify-end gap-2">
																	<ButtonAreaNormal
																		uiEmployee={
																			uiEmployee
																		}
																		uiEmployees={
																			uiEmployees
																		}
																		setUiEmployees={
																			setUiEmployees
																		}
																	/>
																	<ButtonAreaDeleting
																		uiEmployee={
																			uiEmployee
																		}
																		handleDeleteEmployee={
																			handleDeleteEmployee
																		}
																		handleCancelProcess={
																			handleCancelProcess
																		}
																	/>
																	<ButtonAreaEditing
																		uiEmployee={
																			uiEmployee
																		}
																		handleSaveEmployee={
																			handleSaveEmployee
																		}
																		handleCancelProcess={
																			handleCancelProcess
																		}
																	/>
																</div>
															</td>
														</tr>
														<EditingArea
															uiEmployee={
																uiEmployee
															}
															uiEmployees={
																uiEmployees
															}
															setUiEmployees={
																setUiEmployees
															}
														/>
													</React.Fragment>
												);
											})}
										</tbody>
									</table>
								</div>
								<Footer uiEmployees={uiEmployees} />
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};
