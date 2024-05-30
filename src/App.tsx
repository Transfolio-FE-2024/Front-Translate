import Router from "@pages/Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "@/styles/global.scss";

const queryClient = new QueryClient();

// 경로 바뀔 때 스크롤 지점 최상단으로 이동
const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ScrollToTop />
			<Router />
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
