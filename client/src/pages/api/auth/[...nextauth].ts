import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Todo Login",
			credentials: {
				email: {
					label: "email",
					placeholder: "email",
					type: "string",
				},
				password: { label: "password", placeholder: "***", type: "password" },
			},
			async authorize(credentials, req) {
				const { email, password } = credentials as any;
				try {
					const res = await axios.post("http://localhost:8000/api/auth/login", {
						email,
						password,
					});
					return res.data;
				} catch (e) {
					console.log(e);
				}
			},
		}),
	],
	callbacks: {
		jwt: async (ctx) => {
			if (ctx.user) {
				const user = ctx.user as any;
				return {
					...ctx.token,
					access: user?.accessToken ?? null,
					refresh: user?.refreshToken ?? null,
				};
			}
			return ctx.token;
		},

		async session(ctx) {
			return {
				...ctx.session,
				token: ctx.token,
			};
		},
	},
	secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
