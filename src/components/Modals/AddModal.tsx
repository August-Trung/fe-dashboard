"use client";

import React, { useState, useEffect, useRef } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Select,
	SelectItem,
	Input,
	useDraggable,
	Form,
} from "@heroui/react";
import {
	showErrorToast,
	showSuccessToast,
	showWarningToast,
} from "@/components/ToastComponents";
import axios from "@/apis/axios";

type Field = {
	name: string;
	label: string;
	type: "text" | "email" | "number" | "select";
	required?: boolean;
	options?: { key: string; label: string }[];
};

type AddModalProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	onSave: (data: any) => void;
	apiEndpoint: string;
	fields: Field[];
};

export default function AddModal({
	isOpen,
	onOpenChange,
	onSave,
	apiEndpoint,
	fields,
}: AddModalProps) {
	const initialState = fields.reduce(
		(acc, field) => {
			acc[field.name] = field.type === "number" ? 0 : "";
			return acc;
		},
		{} as Record<string, string | number>
	);

	const [formData, setFormData] = useState(initialState);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const targetRef = useRef(null);
	const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const validate = () => {
		const newErrors: Record<string, string> = {};
		fields.forEach((field) => {
			if (field.required && !formData[field.name]) {
				newErrors[field.name] = `${field.label} is required`;
			}
		});
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async () => {
		if (!validate()) {
			showWarningToast("Please fill in all required fields.");
			return;
		}
		try {
			const response = await axios.post(apiEndpoint, formData);
			console.log("Submitting data:", formData); // Kiểm tra dữ liệu trước khi gửi
			onOpenChange(false);
			onSave(response.data);
			showSuccessToast("Data saved successfully!");
		} catch (error) {
			console.log("Submitting data:", formData); // Kiểm tra dữ liệu trước khi gửi
			console.error("Error saving data:", error);
			showErrorToast("Failed to save data. Please try again.");
		}
	};

	useEffect(() => {
		if (isOpen) {
			setFormData(initialState);
			setErrors({});
		}
	}, [isOpen]);

	return (
		<Modal
			isOpen={isOpen}
			placement="top-center"
			ref={targetRef}
			onOpenChange={onOpenChange}>
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader
							className="flex flex-col gap-1"
							{...moveProps}>
							Add New Entry
						</ModalHeader>
						<ModalBody>
							<Form>
								{fields.map((field) => (
									<div key={field.name} className="w-full">
										{field.type === "select" ? (
											<Select
												label={field.label}
												placeholder={`Select ${field.label}`}
												variant="bordered"
												selectedKeys={
													formData[field.name]
														? new Set([
																String(
																	formData[
																		field
																			.name
																	]
																),
															])
														: new Set()
												}
												onSelectionChange={(keys) =>
													setFormData((prev) => ({
														...prev,
														[field.name]:
															keys.currentKey ||
															"",
													}))
												}
												errorMessage={
													errors[field.name]
												}
												isRequired={field.required}>
												{field.options?.map(
													(option) => (
														<SelectItem
															key={option.key}>
															{option.label}
														</SelectItem>
													)
												) || []}
											</Select>
										) : (
											<Input
												label={field.label}
												placeholder={`Enter ${field.label}`}
												variant="bordered"
												type={field.type}
												name={field.name}
												value={formData[
													field.name
												].toString()}
												onChange={handleChange}
												errorMessage={
													errors[field.name]
												}
												isRequired={field.required}
											/>
										)}
									</div>
								))}
							</Form>
						</ModalBody>
						<ModalFooter>
							<Button
								color="danger"
								variant="flat"
								onPress={onClose}>
								Close
							</Button>
							<Button color="primary" onPress={handleSubmit}>
								Save
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
}
