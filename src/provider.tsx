import type { NavigateOptions } from "react-router-dom";
// import { HeroUIProvider } from "@heroui/system";
import { HeroUIProvider } from "@heroui/react";
import { useHref, useNavigate } from "react-router-dom";
import { ToastProvider } from "@heroui/toast";

declare module "@react-types/shared" {
	interface RouterConfig {
		routerOptions: NavigateOptions;
	}
}

export function Provider({ children }: { children: React.ReactNode }) {
	const navigate = useNavigate();

	return (
		<HeroUIProvider navigate={navigate} useHref={useHref}>
			<ToastProvider />
			{children}
		</HeroUIProvider>
	);
}
