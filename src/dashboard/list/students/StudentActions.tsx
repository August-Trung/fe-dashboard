"use client";

import ActionsDropdown, {
	ActionItem,
} from "@/components/Table/ActionsDropdown";

interface StudentActionsProps {
	studentId: number;
	onDelete: (id: number) => void;
	onEdit: () => void;
}

export default function StudentActions({
	studentId,
	onDelete,
	onEdit,
}: StudentActionsProps) {
	const actions: ActionItem[] = [
		{
			key: "view",
			label: "View",
			description: "Allows you to view the file",
		},
		{
			key: "edit",
			label: "Edit",
			description: "Allows you to edit the file",
			onPress: onEdit,
		},
		{
			key: "delete",
			label: "Delete",
			description: "Permanently delete the file",
			color: "danger",
			onPress: () => onDelete(studentId),
		},
	];

	return <ActionsDropdown actions={actions} />;
}
