import { Link } from "react-router-dom";

const menuItems = [
	{
		title: "MENU",
		items: [
			{
				icon: "/home.png",
				label: "Home",
				href: "/dashboard",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: "/teacher.png",
				label: "Teachers",
				href: "/dashboard/list/teachers",
				visible: ["admin", "teacher"],
			},
			{
				icon: "/student.png",
				label: "Students",
				href: "/dashboard/list/students",
				visible: ["admin", "teacher"],
			},
			{
				icon: "/subject.png",
				label: "Subjects",
				href: "/list/subjects",
				visible: ["admin"],
			},
			{
				icon: "/class.png",
				label: "Classes",
				href: "/list/classes",
				visible: ["admin", "teacher"],
			},
			{
				icon: "/lesson.png",
				label: "Lessons",
				href: "/list/lessons",
				visible: ["admin", "teacher"],
			},
			{
				icon: "/registernotebook.png",
				label: "Register Notebook",
				href: "/list/registernotebook",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: "/result.png",
				label: "Results",
				href: "/list/results",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: "/attendance.png",
				label: "Attendance",
				href: "/list/attendance",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: "/calendar.png",
				label: "Events",
				href: "/list/events",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: "/message.png",
				label: "Messages",
				href: "/list/messages",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: "/announcement.png",
				label: "Announcements",
				href: "/list/announcements",
				visible: ["admin", "teacher", "student", "parent"],
			},
		],
	},
	{
		title: "OTHER",
		items: [
			{
				icon: "/profile.png",
				label: "Profile",
				href: "/profile",
				visible: ["admin", "teacher", "student", "parent"],
			},
			{
				icon: "/setting.png",
				label: "Settings",
				href: "/settings",
				visible: ["admin", "teacher", "student", "parent"],
			},
			// {
			// 	icon: "/logout.png",
			// 	label: "Logout",
			// 	href: "/logout",
			// 	visible: ["admin", "teacher", "student", "parent"],
			// },
		],
	},
];

const Menu = () => {
	return (
		<div className="mt-4 text-sm">
			{menuItems.map((i) => (
				<div key={i.title} className="flex flex-col gap-2">
					<span className="hidden lg:block text-gray-400 font-light">
						{i.title}
					</span>
					{i.items.map((item) => (
						<Link
							to={item.href}
							key={item.label}
							className="flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 lg:pl-4 hover:bg-blue-100 rounded-full">
							<img
								src={item.icon}
								alt={item.label}
								width={20}
								height={20}
							/>
							<span className="hidden lg:block">
								{item.label}
							</span>
						</Link>
					))}
				</div>
			))}
		</div>
	);
};

export default Menu;
