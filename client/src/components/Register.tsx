import { baseAxios } from "@/utils/baseAxios";
import { Button, FocusTrap, Stack, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import React, { useState } from "react";
import { z } from "zod";

type Props = {
	onSubmit(values: RegFormValues): void;
	defaultValues?: Partial<RegFormValues>;
};

const regSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	password2: z.string(),
});

export type RegFormValues = z.infer<typeof regSchema>;

const Register = ({ onSubmit, defaultValues = {} }: Props) => {
	const form = useForm<RegFormValues>({
		initialValues: {
			email: "",
			password: "",
			password2: "",
			...defaultValues,
		},
		validate: zodResolver(regSchema),
	});
	const handleRegister = async (values: RegFormValues) => {
		onSubmit(values);
		form.reset();
	};
	return (
		<FocusTrap active>
			<form onSubmit={form.onSubmit(handleRegister)}>
				<Stack>
					<TextInput
						type="email"
						placeholder="Email"
						error="Такой email уже есть"
						{...form.getInputProps("email")}
					/>
					<TextInput
						type="text"
						placeholder="password"
						error="Пароли не близнецы"
						{...form.getInputProps("password")}
					/>
					<TextInput
						type="text"
						placeholder="Password Confirm"
						error="Пароли не близнецы"
						{...form.getInputProps("password2")}
					/>
					<Button type="submit">Register</Button>
				</Stack>
			</form>
		</FocusTrap>
	);
};

export default Register;
