// pages/StudentsList.tsx
"use client";

import React from "react";
import {
	Button,
	Pagination,
	User,
	useDisclosure,
	Select,
	SelectItem,
} from "@heroui/react";

//From library_ui/src/components/
import AddModal from "@/components/Modals/AddModal";
import EditModal from "@/components/Modals/EditModal";
import TableComponent from "@/components/Table/TableComponent";
import Filters from "@/components/Table/Filters";
import StatusChip from "@/components/Table/StatusChip";

//From library_ui/src/dashboard/list/students/
import StudentActions from "@/dashboard/list/students/StudentActions";

//From library_ui/src/hooks/
import { useStudents, Student } from "@/hooks/useStudents";

//From library_ui/src/utils/
import { BinIcon, PlusIcon } from "@/utils/icons";
import { handleSaveData } from "@/utils/dataHelpers";

//From library_ui/src/types/
import { Field } from "@/types/formTypes";

const INITIAL_VISIBLE_COLUMNS = ["name", "role", "status", "actions"];

const defaultColumns = [
	{ uid: "id", name: "ID", sortable: true },
	{ uid: "name", name: "NAME", sortable: true },
	{ uid: "age", name: "AGE", sortable: true },
	{ uid: "role", name: "ROLE" },
	{ uid: "team", name: "TEAM" },
	{ uid: "email", name: "EMAIL" },
	{ uid: "status", name: "STATUS" },
	{ uid: "actions", name: "ACTIONS" },
];

export const numRows = [
	{ key: "5", label: "5" },
	{ key: "10", label: "10" },
	{ key: "15", label: "15" },
	{ key: "-1", label: "All" },
];

const statusOptions = [
	{ key: "active", label: "Active" },
	{ key: "paused", label: "Paused" },
	{ key: "vacation", label: "Vacation" },
];

const studentFields: Field[] = [
	{
		name: "name",
		label: "Name",
		type: "text",
		required: true,
	},
	{
		name: "email",
		label: "Email",
		type: "email",
		required: true,
	},
	{
		name: "role",
		label: "Role",
		type: "text",
		required: true,
	},
	{
		name: "team",
		label: "Team",
		type: "text",
		required: true,
	},
	{
		name: "status",
		label: "Status",
		type: "select",
		required: true,
		options: statusOptions,
	},
	{
		name: "age",
		label: "Age",
		type: "number",
		required: true,
	},
];

export default function StudentsList() {
	const {
		students,
		statusList,
		loading,
		selectedKeys,
		selectedIds,
		isEditOpen,
		editingStudent,
		setIsEditOpen,
		onSelectionChange,
		handleDeleteSingle,
		handleDeleteSelected,
		setStudents,
		handleEditStudent,
	} = useStudents();
	const [filterValue, setFilterValue] = React.useState("");
	const [visibleColumns, setVisibleColumns] = React.useState<Set<string>>(
		new Set(INITIAL_VISIBLE_COLUMNS)
	);
	const [statusFilter, setStatusFilter] = React.useState<any>("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [page, setPage] = React.useState(1);
	const [sortDescriptor, setSortDescriptor] = React.useState({
		column: "age",
		direction: "ascending",
	});
	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const hasSearchFilter = Boolean(filterValue);

	// Lọc các cột hiển thị theo visibleColumns
	const headerColumns = React.useMemo(() => {
		if (visibleColumns.size === defaultColumns.length)
			return defaultColumns;
		return defaultColumns.filter((column) =>
			Array.from(visibleColumns).includes(column.uid)
		);
	}, [visibleColumns]);

	// Lọc sinh viên theo từ khóa tìm kiếm và status filter
	const filteredItems = React.useMemo(() => {
		let filtered = [...students];
		if (hasSearchFilter) {
			filtered = filtered.filter((student) =>
				student.name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}
		if (
			statusFilter !== "all" &&
			Array.from(statusFilter).length !== statusList.length
		) {
			filtered = filtered.filter((student) =>
				Array.from(statusFilter).includes(student.status)
			);
		}
		return filtered;
	}, [students, filterValue, statusFilter, hasSearchFilter, statusList]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	const onNextPage = React.useCallback(() => {
		if (page < pages) {
			setPage(page + 1);
		}
	}, [page, pages]);

	const onPreviousPage = React.useCallback(() => {
		if (page > 1) {
			setPage(page - 1);
		}
	}, [page]);

	// Phân trang
	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const sortedItems = React.useMemo(() => {
		return [...items].sort((a: Student, b: Student) => {
			const first = a[sortDescriptor.column as keyof Student] as number;
			const second = b[sortDescriptor.column as keyof Student] as number;
			const cmp = first < second ? -1 : first > second ? 1 : 0;
			return sortDescriptor.direction === "descending" ? -cmp : cmp;
		});
	}, [sortDescriptor, items]);

	const renderCell = React.useCallback(
		(student: Student, columnKey: string) => {
			const cellValue = student[columnKey as keyof Student];
			switch (columnKey) {
				case "name":
					return (
						<User
							avatarProps={{ src: student.avatar }}
							description={student.email}
							name={cellValue as string}
						/>
					);
				case "role":
					return (
						<div className="flex flex-col">
							<p className="text-bold text-small capitalize">
								{cellValue}
							</p>
							<p className="text-bold text-tiny capitalize text-default-400">
								{student.team}
							</p>
						</div>
					);
				case "status":
					return <StatusChip status={student.status} />;
				case "actions":
					return (
						<StudentActions
							studentId={student.id}
							onDelete={handleDeleteSingle}
							onEdit={() => handleEditStudent(student)}
						/>
					);
				default:
					return cellValue;
			}
		},
		[handleDeleteSingle, handleEditStudent]
	);

	const onRowsPerPageChange = React.useCallback(
		(e: React.ChangeEvent<HTMLSelectElement>) => {
			const value = Number(e.target.value);
			setRowsPerPage(value === -1 ? students.length : value);
			setPage(1);
		},
		[students.length]
	);

	const onSearchChange = React.useCallback((value?: string) => {
		setFilterValue(value || "");
		setPage(1);
	}, []);

	const onClear = React.useCallback(() => {
		setFilterValue("");
		setPage(1);
	}, []);

	const topContent = (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between gap-3 items-center">
				<div className="font-bold">All Students</div>
				<div className="flex gap-3">
					<Filters
						filterValue={filterValue}
						onSearchChange={onSearchChange}
						onClear={onClear}
						statusOptions={statusList}
						statusFilter={statusFilter}
						onStatusChange={setStatusFilter}
						visibleColumns={visibleColumns}
						columns={defaultColumns}
						onColumnsChange={setVisibleColumns}
					/>
					<Button
						color="danger"
						isDisabled={selectedIds.length === 0}
						endContent={<BinIcon />}
						onPress={handleDeleteSelected}>
						Delete Selected
					</Button>
					<Button
						color="primary"
						endContent={<PlusIcon />}
						onPress={onOpen}>
						Add New
					</Button>
				</div>
			</div>
			<div className="flex justify-between items-center">
				<span className="text-default-400 text-small">
					Total {students.length} students
				</span>
				<Select
					className="max-w-[180px]"
					onChange={onRowsPerPageChange}
					defaultSelectedKeys={["5"]}
					label="Rows per page"
					labelPlacement="outside-left"
					placeholder="Select number">
					{numRows.map((numrow: { key: string; label: string }) => (
						<SelectItem key={numrow.key}>{numrow.label}</SelectItem>
					))}
				</Select>
			</div>
		</div>
	);

	function isAll(selection: "all" | Set<string>): selection is "all" {
		return selection === "all";
	}

	const bottomContent = React.useMemo(() => {
		if (loading) return null;
		return (
			<div className="py-2 px-2 flex justify-between items-center">
				<span className="w-[30%] text-small text-default-400">
					{isAll(selectedKeys)
						? "All items selected"
						: `${selectedKeys.size} of ${filteredItems.length} selected`}
				</span>

				<Pagination
					isCompact
					showControls
					showShadow
					color="primary"
					page={page}
					total={pages}
					onChange={setPage}
				/>
				<div className="hidden sm:flex w-[30%] justify-end gap-2">
					<Button
						isDisabled={pages === 1}
						size="sm"
						variant="flat"
						onPress={onPreviousPage}>
						Previous
					</Button>
					<Button
						isDisabled={pages === 1}
						size="sm"
						variant="flat"
						onPress={onNextPage}>
						Next
					</Button>
				</div>
			</div>
		);
	}, [
		selectedKeys,
		filteredItems.length,
		page,
		pages,
		loading,
		onPreviousPage,
		onNextPage,
	]);

	return (
		<div>
			<TableComponent
				data={sortedItems}
				columns={headerColumns}
				renderCell={renderCell}
				selectedKeys={selectedKeys}
				onSelectionChange={onSelectionChange}
				sortDescriptor={sortDescriptor}
				onSortChange={setSortDescriptor}
				topContent={topContent}
				bottomContent={bottomContent}
			/>
			<AddModal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				onSave={(newStudent) =>
					handleSaveData<Student>(
						newStudent,
						setStudents,
						"/students/api/get-all-students",
						"students"
					)
				}
				apiEndpoint="/students/api/create-student"
				fields={studentFields}
			/>

			<EditModal
				isOpen={isEditOpen}
				onOpenChange={setIsEditOpen}
				data={editingStudent}
				onSave={(updatedStudents: Student[]) => {
					setStudents(updatedStudents);
				}}
				apiEndpoint="/students/api/edit-student"
				refreshEndpoint="/students/api/get-all-students"
				fields={studentFields}
			/>
		</div>
	);
}
