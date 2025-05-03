import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";

//Dashboard
import DashboardLayout from "@/dashboard/layout";
import AdminPage from "@/dashboard/admin/page";
import TeacherPageInList from "@/dashboard/list/teachers/page";
import StudentPageInList from "@/dashboard/list/students/page";

function App() {
	return (
		<Routes>
			<Route element={<IndexPage />} path="/" />
			<Route path="/dashboard" element={<DashboardLayout />}>
				{/* Trang mặc định: index route */}
				<Route index element={<AdminPage />} />
				{/* Route cho admin */}
				<Route path="list">
					<Route path="students" element={<StudentPageInList />} />
					<Route path="teachers" element={<TeacherPageInList />} />
					{/* Các route khác */}
				</Route>
			</Route>
			<Route element={<DocsPage />} path="/docs" />
			<Route element={<PricingPage />} path="/pricing" />
			<Route element={<BlogPage />} path="/blog" />
			<Route element={<AboutPage />} path="/about" />
		</Routes>
	);
}

export default App;
