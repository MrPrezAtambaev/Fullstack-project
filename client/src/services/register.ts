import { useMutation } from "@tanstack/react-query";
import { baseAxios } from "@/utils/baseAxios";
import { type } from "os";

type RegisterArg = {
	email: string;
	password: string;
	password2: string;
};

const register = async (arg: RegisterArg) => {
	const { data } = await baseAxios.post("/auth/signup", arg);
	return data;
};

export const useRegister = () => {
	const mutation = useMutation({
		mutationFn: register,
	});

	return [mutation.mutateAsync, mutation] as const;
};
