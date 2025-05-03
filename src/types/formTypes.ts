export interface Field {
	name: string;
	label: string;
	type: "text" | "email" | "number" | "select";
	required?: boolean;
	options?: { key: string; label: string }[];
}
