// hooks/useStudents.ts
"use client";
import React from "react";
import axios from "@/apis/axios";

export type Student = {
	id: number;
	name: string;
	email: string;
	avatar: string;
	team: string;
	role: string;
	status: string;
	age: number;
};

export function useStudents() {
	const [students, setStudents] = React.useState<Student[]>([]);
	const [statusList, setStatusList] = React.useState<string[]>([]);
	const [loading, setLoading] = React.useState(true);
	const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(
		new Set()
	);
	const [selectedIds, setSelectedIds] = React.useState<number[]>([]);

	const [isEditOpen, setIsEditOpen] = React.useState(false);
	const [editingStudent, setEditingStudent] = React.useState<Student | null>(
		null
	);

	React.useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const [studentsRes, statusRes] = await Promise.all([
					axios.get("/students/api/get-all-students"),
					axios.get("/students/api/status-options"),
				]);
				setStudents(studentsRes.data.students);
				setStatusList(statusRes.data.statusOptions);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleDeleteSingle = async (id: number) => {
		try {
			await axios.delete(`/students/api/delete-student/${id}`);
			setStudents((prev) => prev.filter((student) => student.id !== id));
		} catch (error) {
			console.error("Failed to delete student:", error);
		}
	};

	const handleDeleteSelected = React.useCallback(async () => {
		if (selectedIds.length === 0) return;
		try {
			await Promise.all(
				selectedIds.map((id) =>
					axios.delete(`/students/api/delete-student/${id}`)
				)
			);
			setStudents((prev) =>
				prev.filter((student) => !selectedIds.includes(student.id))
			);
			setSelectedKeys(new Set());
			setSelectedIds([]);
		} catch (error) {
			console.error("Error deleting students:", error);
		}
	}, [selectedIds]);

	const onSelectionChange = React.useCallback(
		(keys: any) => {
			setSelectedKeys(keys);
			const newSelectedIds =
				keys === "all"
					? students.map((student) => student.id)
					: Array.from(keys as Set<string>)
							.map(
								(key: string) =>
									students.find(
										(student) =>
											student.id.toString() === key
									)?.id
							)
							.filter((id): id is number => id !== undefined);
			setSelectedIds(newSelectedIds);
		},
		[students]
	);

	const handleEditStudent = (student: Student | null) => {
		setEditingStudent(student);
		setIsEditOpen(!!student); // Only open if a student is provided
	};

	return {
		students,
		statusList,
		loading,
		selectedKeys,
		selectedIds,
		isEditOpen,
		setIsEditOpen,
		editingStudent,
		setEditingStudent,
		onSelectionChange,
		handleDeleteSingle,
		handleDeleteSelected,
		handleEditStudent,
		setStudents,
	};
}
