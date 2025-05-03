import axios, { AxiosInstance } from "axios";

// Tạo instance axios với cấu hình động từ biến môi trường
const instance: AxiosInstance = axios.create({
	baseURL: import.meta.env.REACT_APP_BE_URL, // URL backend từ biến môi trường
	headers: {
		"Content-Type": "application/json",
	},
});

// Log lỗi nếu xảy ra trong bất kỳ yêu cầu nào
instance.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error("API Error:", error);
		return Promise.reject(error);
	}
);

export default instance;
