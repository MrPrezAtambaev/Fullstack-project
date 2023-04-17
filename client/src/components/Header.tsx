import {
	ActionIcon,
	Button,
	Container,
	Group,
	Header,
	TextInput,
	useMantineColorScheme,
} from "@mantine/core";
import { MantineLogo } from "@mantine/ds";
import { openContextModal } from "@mantine/modals";
import React, { useState } from "react";
import SearchInput from "./SearchInput";
import { IconBrandApple, IconMoonStars, IconSun } from "@tabler/icons-react";
import Login from "./Login";

const Navbar = () => {
	const openCreateTodoModal = () => {
		openContextModal({
			title: "Создать задачу",
			modal: "createTodo",
			innerProps: {},
		});
	};

	// !
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const dark = colorScheme === "dark";
	return (
		<Header height={58} mb={120}>
			<Container>
				<Group py="sm" position="apart">
					<IconBrandApple size={44} style={{ cursor: "pointer" }} />
					<SearchInput />
					<Button
						// sx={(theme) => ({
						// 	background: theme.colors.red[9],
						// })}
						onClick={openCreateTodoModal}
						mb={20}
					>
						Создать
					</Button>
					<Login />
					<ActionIcon
						variant="outline"
						color={dark ? "yellow" : "violet"}
						onClick={() => toggleColorScheme()}
						title="Toggle color scheme"
					>
						{dark ? <IconSun size="1.1rem" /> : <IconMoonStars size="1.1rem" />}
					</ActionIcon>
				</Group>
			</Container>
		</Header>
	);
};

export default Navbar;
