// components/TableComponent.tsx
"use client";
import React from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from "@heroui/react";

export interface Column {
	uid: string;
	name: string;
	sortable?: boolean;
}

interface TableComponentProps<T> {
	data: T[];
	columns: Column[];
	renderCell: (item: T, columnKey: string) => React.ReactNode;
	selectedKeys?: any;
	onSelectionChange?: (keys: any) => void;
	sortDescriptor?: any;
	onSortChange?: (descriptor: any) => void;
	topContent?: React.ReactNode;
	bottomContent?: React.ReactNode;
}

export default function TableComponent<T>({
	data,
	columns,
	renderCell,
	selectedKeys,
	onSelectionChange,
	sortDescriptor,
	onSortChange,
	topContent,
	bottomContent,
}: TableComponentProps<T>) {
	return (
		<Table
			aria-label="Reusable table component"
			isHeaderSticky
			topContent={topContent}
			topContentPlacement="outside"
			bottomContent={bottomContent}
			bottomContentPlacement="outside"
			selectedKeys={selectedKeys}
			selectionMode="multiple"
			sortDescriptor={sortDescriptor}
			onSelectionChange={onSelectionChange}
			onSortChange={onSortChange}>
			<TableHeader columns={columns}>
				{(column) => (
					<TableColumn
						key={column.uid}
						align={column.uid === "actions" ? "center" : "start"}
						allowsSorting={column.sortable}>
						{column.name}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody emptyContent="No items found" items={data}>
				{(item) => (
					<TableRow key={(item as any)._id}>
						{(columnKey) => (
							<TableCell>
								{renderCell(item, columnKey.toString())}
							</TableCell>
						)}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
