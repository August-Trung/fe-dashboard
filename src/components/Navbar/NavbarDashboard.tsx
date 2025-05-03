import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownSection,
	DropdownItem,
} from "@heroui/dropdown";
import { Badge } from "@heroui/badge";
import { User } from "@heroui/user";
import { ThemeSwitch } from "../theme-switch";

const NavbarDashboard = () => {
	return (
		<div className="flex items-center justify-end m-2 w-full">
			<div className="flex items-center gap-4">
				<ThemeSwitch />
				<Badge content="1" color="danger" shape="circle">
					<img
						src="/message.png"
						alt="message"
						width={24}
						height={24}
						className="cursor-pointer"
					/>
				</Badge>
				<Badge content="10" color="danger" shape="circle">
					<img
						src="/announcement.png"
						alt="announcement"
						width={24}
						height={24}
						className="cursor-pointer"
					/>
				</Badge>

				<div className="flex flex-col items-end text-sm">
					<span className="font-bold">August Trung</span>
					<span className="text-gray-500">Admin</span>
				</div>
				{/* DROPDOWN AVARTAR */}
				<div>
					<Dropdown
						// showArrow
						radius="sm"
						classNames={{
							base: "before:bg-default-200", // change arrow background
							content: "p-0 border-small border-divider",
						}}>
						<DropdownTrigger>
							<img
								src="/avatar.png"
								alt="announcement"
								width={45}
								height={45}
								className="rounded-full cursor-pointers"
							/>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Custom item styles"
							disabledKeys={["profile"]}
							className="p-3"
							itemClasses={{
								base: [
									"rounded-md",
									"text-default-500",
									"transition-opacity",
									"data-[hover=true]:text-foreground",
									"data-[hover=true]:bg-default-100",
									"dark:data-[hover=true]:bg-default-50",
									"data-[selectable=true]:focus:bg-default-50",
									"data-[pressed=true]:opacity-70",
									"data-[focus-visible=true]:ring-default-500",
								],
							}}>
							<DropdownSection
								aria-label="Profile & Actions"
								showDivider>
								<DropdownItem
									isReadOnly
									key="profile"
									className="h-14 gap-2 opacity-1">
									<User
										name="Junior Garcia"
										description="@jrgarciadev"
										classNames={{
											name: "text-default-600",
											description: "text-default-500",
										}}
										avatarProps={{
											size: "sm",
											src: "https://avatars.githubusercontent.com/u/30373425?v=4",
										}}
									/>
								</DropdownItem>
								<DropdownItem key="dashboard">
									Dashboard
								</DropdownItem>
								<DropdownItem key="settings">
									Settings
								</DropdownItem>
							</DropdownSection>

							<DropdownSection aria-label="Help & Feedback">
								<DropdownItem key="help_and_feedback">
									Help & Feedback
								</DropdownItem>
								<DropdownItem
									key="logout"
									className="text-danger data-[hover=true]:text-danger-500">
									Log Out
								</DropdownItem>
							</DropdownSection>
						</DropdownMenu>
					</Dropdown>
				</div>
			</div>
		</div>
	);
};

export default NavbarDashboard;
