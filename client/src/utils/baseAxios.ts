import axios, { AxiosError } from "axios";
import { API_URL } from "./constants";
import { getSession } from "next-auth/react";

export const baseAxios = axios.create({
	baseURL: API_URL,
});

type Token = {
	access: string;
	refresh: string;
};

baseAxios.interceptors.request.use(
	async (config) => {
		const session = (await getSession()) as { token?: Token } | null;
		if (!session?.token?.access) return config;
		config.headers.Authorization = `Bearer ${session.token.access}`;
		return config;
	},
	(error) => Promise.reject(error),
);

baseAxios.interceptors.response.use(
	(res) => res,
	async (error) => {
		if (!(error instanceof AxiosError)) return Promise.reject(error);

		if (error.response?.status === 401 || error.response?.status === 403) {
			const session = (await getSession()) as { token?: Token } | null;

			if (!session?.token?.refresh) {
				return Promise.reject(error);
			}

			try {
				const { data } = await axios.post(
					`${API_URL}/auth/refresh/`,
					{
						refresh: session.token.refresh,
					},
					{
						headers: {
							Authorization: `Bearer ${session.token.refresh}`,
						},
					},
				);

				const config = {
					...error.config,
					headers: {
						...(error.config?.headers ?? {}),
						Authorization: `Bearer ${data.accessToken}`,
					},
				};

				return await axios(config);
			} catch (err) {
				return Promise.reject(error);
			}
		}
		return Promise.reject(error);
	},
);
