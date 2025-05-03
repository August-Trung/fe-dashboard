"use client";

import React, { useState, useEffect } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Select,
	SelectItem,
	useDraggable,
	Form,
} from "@heroui/react";
import {
	showErrorToast,
	showSuccessToast,
	showWarningToast,
} from "@/components/ToastComponents";
import axios from "@/apis/axios";
import { Field } from "@/types/formTypes";

type EditModalProps<T extends Record<string, any>> = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	onSave: (updatedData: T[]) => void;
	data: T | null;
	apiEndpoint: string;
	refreshEndpoint?: string;
	fields: Field[];
};

export default function EditModal<T extends Record<string, any>>({
	isOpen,
	onOpenChange,
	onSave,
	data: existingData,
	apiEndpoint,
	fields,
	refreshEndpoint,
}: EditModalProps<T>) {
	const [data, setData] = useState<T | null>(existingData);
	const [errors, setErrors] = useState<Record<string, string>>({});
	const targetRef = React.useRef(null);
	const { moveProps } = useDraggable({ targetRef, isDisabled: !isOpen });

	useEffect(() => {
		if (isOpen) {
			setData(existingData);
			setErrors({});
		}
	}, [isOpen, existingData]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setData((prevData) =>
			prevData ? { ...prevData, [name]: value } : null
		);
	};

	const handleSelectionChange = (name: keyof T, value: string) => {
		setData((prevData) =>
			prevData ? { ...prevData, [name]: value } : null
		);
	};

	const validate = () => {
		const newErrors: Record<string, string> = {};
		fields.forEach((field) => {
			if (field.required && !data?.[field.name]) {
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

		if (JSON.stringify(data) === JSON.stringify(existingData)) {
			showWarningToast("No changes detected.");
			return;
		}

		try {
			await axios.put(`${apiEndpoint}/${(data as any)._id}`, data);

			// Đóng modal
			onOpenChange(false);

			// Nếu có `refreshEndpoint`, gọi API đó để lấy danh sách mới
			if (refreshEndpoint) {
				const response = await axios.get(refreshEndpoint);
				onSave(response.data.students || response.data);
			}

			showSuccessToast("Updated successfully!");
		} catch (error) {
			console.error("Error updating data:", error);
			showErrorToast("Failed to update. Please try again.");
		}
	};

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
							Edit Data
						</ModalHeader>
						<ModalBody>
							<Form>
								{fields.map((field) =>
									field.options ? (
										<Select
											key={field.name}
											label={field.label}
											placeholder={`Select ${field.label}`}
											variant="bordered"
											selectedKeys={
												data?.[field.name as keyof T]
													? new Set([
															data[
																field.name as keyof T
															] as string,
														])
													: new Set()
											}
											onSelectionChange={(keys) =>
												handleSelectionChange(
													field.name as keyof T,
													Array.from(
														keys
													)[0] as string
												)
											}
											isRequired={field.required}
											errorMessage={errors[field.name]}>
											{field.options.map((option) => (
												<SelectItem key={option.key}>
													{option.label}
												</SelectItem>
											))}
										</Select>
									) : (
										<Input
											key={field.name}
											label={field.label}
											placeholder={`Enter ${field.label}`}
											variant="bordered"
											type={field.type}
											name={field.name}
											value={
												(data?.[
													field.name as keyof T
												] as string) || ""
											}
											onChange={handleChange}
											isRequired={field.required}
											errorMessage={errors[field.name]}
										/>
									)
								)}
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
