import axios, { AxiosInstance } from "axios";

// Tạo instance axios với cấu hình cơ bản
const instance: AxiosInstance = axios.create({
	baseURL: "http://localhost:5000", // Đặt URL backend
	headers: {
		"Content-Type": "application/json", // Đảm bảo gửi JSON
	},
});

// Log lỗi nếu xảy ra trong bất kỳ yêu cầu nào
instance.interceptors.response.use(
	(response) => response, // Trả về response nếu không có lỗi
	(error) => {
		console.error("API Error:", error);
		return Promise.reject(error);
	}
);

export default instance;
