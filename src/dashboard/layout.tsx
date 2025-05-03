import { Link, Outlet } from "react-router-dom";
import NavbarDashboard from "@/components/Navbar/NavbarDashboard";
import Menu from "@/components/Menu";

export default function DashBoardLayout() {
	return (
		<div className="h-screen flex">
			{/* LEFT */}
			<div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
				<Link to="/" className="flex items-center justify-center gap-2">
					<img
						src="/logo.png"
						alt="Logo.png"
						width={32}
						height={32}
					/>
					<span className="hidden lg:block">August Trung</span>
				</Link>
				<Menu />
			</div>
			{/* RIGHT */}
			<div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] overflow-scroll">
				<div className="m-2 mt-4">
					<NavbarDashboard />
					<Outlet />
				</div>
			</div>
		</div>
	);
}
