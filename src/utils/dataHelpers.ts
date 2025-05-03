import axios from "@/apis/axios";

export const handleSaveData = <T>(
	newItem: T,
	setDataFunction: React.Dispatch<React.SetStateAction<T[]>>,
	apiEndpoint: string,
	dataKey?: string // Thêm tùy chọn dataKey để xác định dữ liệu từ API
) => {
	if (!(newItem as any).id || (newItem as any).id === 0) {
		axios
			.get(apiEndpoint)
			.then((response) => {
				// Nếu có dataKey (vd: "students"), lấy theo key đó, nếu không, mặc định là toàn bộ response.data
				const dataArray = dataKey
					? response.data[dataKey]
					: response.data;

				if (Array.isArray(dataArray)) {
					setDataFunction(dataArray);
				} else {
					console.error("API không trả về mảng hợp lệ:", dataArray);
					setDataFunction([]);
				}
			})
			.catch((error) => {
				console.error("Failed to fetch data:", error);
			});
	} else {
		setDataFunction((prev) => [...prev, newItem]);
	}
};
