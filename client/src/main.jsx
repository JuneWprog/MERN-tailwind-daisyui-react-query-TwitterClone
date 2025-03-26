import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//default queryFn
const fetchAuthUser = async () => {
	try {
		const res = await fetch("/api/auth/me");
		const data = await res.json();
		if (data.error) return null;
		if (!res.ok) {
			throw new Error(data.error || "Something went wrong");
		}
		
		return data;
	} catch (error) {
		throw new Error(error);
	}
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			queryFn: fetchAuthUser,
		},
	},
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<App />
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>
);
