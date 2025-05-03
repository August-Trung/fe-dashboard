// components/StatusChip.tsx
"use client";

import { Chip, ChipProps } from "@heroui/react";

const statusColorMap: Record<string, ChipProps["color"]> = {
	active: "success",
	paused: "danger",
	vacation: "warning",
};

interface StatusChipProps {
	status: string;
}

export default function StatusChip({ status }: StatusChipProps) {
	return (
		<Chip
			className="capitalize"
			color={statusColorMap[status] || "default"}
			size="sm"
			variant="flat">
			{status}
		</Chip>
	);
}
