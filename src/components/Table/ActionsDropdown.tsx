"use client";

import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	DropdownSection,
	Button,
} from "@heroui/react";
import { VerticalDotsIcon } from "@/utils/icons";

export type ActionItem = {
	key: string;
	label: string;
	description?: string;
	color?: "default" | "danger";
	onPress?: () => void;
};

interface ActionsDropdownProps {
	actions: ActionItem[];
}

export default function ActionsDropdown({ actions }: ActionsDropdownProps) {
	return (
		<Dropdown showArrow classNames={{ base: "before:bg-white" }}>
			<DropdownTrigger>
				<Button isIconOnly size="sm" variant="light">
					<VerticalDotsIcon className="text-default-300" />
				</Button>
			</DropdownTrigger>
			<DropdownMenu variant="faded">
				<>
					{actions.some((action) => action.color !== "danger") && (
						<DropdownSection title="Actions" showDivider>
							{actions
								.filter((action) => action.color !== "danger")
								.map((action) => (
									<DropdownItem
										key={action.key}
										description={action.description}
										onPress={action.onPress}>
										{action.label}
									</DropdownItem>
								))}
						</DropdownSection>
					)}

					{actions.some((action) => action.color === "danger") && (
						<DropdownSection title="Danger zone">
							{actions
								.filter((action) => action.color === "danger")
								.map((action) => (
									<DropdownItem
										key={action.key}
										className="text-danger"
										color="danger"
										description={action.description}
										onPress={action.onPress}>
										{action.label}
									</DropdownItem>
								))}
						</DropdownSection>
					)}
				</>
			</DropdownMenu>
		</Dropdown>
	);
}
