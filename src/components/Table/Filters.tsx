// components/Filters.tsx
"use client";

import {
	Input,
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
} from "@heroui/react";
import { SearchIcon, ChevronDownIcon } from "@/utils/icons";

interface FiltersProps {
	filterValue: string;
	onSearchChange: (value: string) => void;
	onClear: () => void;
	statusOptions: string[];
	statusFilter: any;
	onStatusChange: (value: any) => void;
	visibleColumns: any;
	columns: { uid: string; name: string }[];
	onColumnsChange: (value: any) => void;
}

export default function Filters({
	filterValue,
	onSearchChange,
	onClear,
	statusOptions,
	statusFilter,
	onStatusChange,
	visibleColumns,
	columns,
	onColumnsChange,
}: FiltersProps) {
	return (
		<div className="flex gap-3">
			<Input
				isClearable
				className="w-full sm:max-w-[50%]"
				placeholder="Search by name..."
				startContent={<SearchIcon />}
				value={filterValue}
				onClear={onClear}
				onValueChange={onSearchChange}
			/>
			<Dropdown>
				<DropdownTrigger className="hidden sm:flex">
					<Button
						endContent={<ChevronDownIcon className="text-small" />}
						variant="flat">
						Status
					</Button>
				</DropdownTrigger>
				<DropdownMenu
					disallowEmptySelection
					aria-label="Status filter"
					closeOnSelect={false}
					selectedKeys={statusFilter}
					selectionMode="multiple"
					onSelectionChange={onStatusChange}>
					{statusOptions.map((status) => (
						<DropdownItem key={status} className="capitalize">
							{status}
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
			<Dropdown>
				<DropdownTrigger className="hidden sm:flex">
					<Button
						endContent={<ChevronDownIcon className="text-small" />}
						variant="flat">
						Columns
					</Button>
				</DropdownTrigger>
				<DropdownMenu
					disallowEmptySelection
					aria-label="Columns filter"
					closeOnSelect={false}
					selectedKeys={visibleColumns}
					selectionMode="multiple"
					onSelectionChange={onColumnsChange}>
					{columns.map((column) => (
						<DropdownItem key={column.uid} className="capitalize">
							{column.name}
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
		</div>
	);
}
