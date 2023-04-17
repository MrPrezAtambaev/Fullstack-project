import { useSession, signIn, signOut } from "next-auth/react";
import { IconLogin, IconLogout } from "@tabler/icons-react";
import { Avatar, Button, Group, Image } from "@mantine/core";
import { openContextModal } from "@mantine/modals";

const Login = () => {
	const { data: session } = useSession();

	const openRegisterModal = () => {
		openContextModal({
			title: "Регистрация",
			modal: "register",
			innerProps: {},
		});
	};

	if (session) {
		return (
			<Group>
				<label>{session.user?.email}</label>
				<Avatar
					src={session.user?.image}
					size="md"
					radius="xl"
					style={{ cursor: "pointer" }}
				/>
				<IconLogout onClick={() => signOut()} style={{ cursor: "pointer" }} />
			</Group>
		);
	} else {
		return (
			<>
				<Group>
					<label>You are not Signed</label>
					<IconLogin onClick={() => signIn()} style={{ cursor: "pointer" }} />
					<Button onClick={openRegisterModal}>Register</Button>
				</Group>
			</>
		);
	}
};

export default Login;
