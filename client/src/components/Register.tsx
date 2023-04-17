import { baseAxios } from "@/utils/baseAxios";
import { Button, FocusTrap, Stack, TextInput } from "@mantine/core";
import React, { useState } from "react";

const Register = ({ onSubmit }: any) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const handleRegister = async () => {
		try {
			const { data } = await baseAxios.post("/auth/signup", {
				email,
				password,
				password2,
			});
			console.log(data);
			setEmail("");
			setPassword("");
			setPassword2("");
			onSubmit();
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<FocusTrap active>
			<form>
				<Stack>
					<TextInput
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextInput
						type="text"
						placeholder="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<TextInput
						type="text"
						placeholder="Password Confirm"
						value={password2}
						onChange={(e) => setPassword2(e.target.value)}
					/>
					<Button type="button" onClick={handleRegister}>
						Register
					</Button>
				</Stack>
			</form>
		</FocusTrap>
	);
};

export default Register;
