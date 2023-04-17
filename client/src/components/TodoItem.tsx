import { useDeleteTodo } from "@/services/deleteTodo";
import { useUpdateTodo } from "@/services/updateTodo";
import { Todo } from "@/utils/types/todo";
import { ActionIcon, Avatar, Group, Text, Tooltip } from "@mantine/core";
import { openContextModal } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconPencil, IconTrash, IconWoman } from "@tabler/icons-react";

type Props = {
	todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
	const [deleteTodo] = useDeleteTodo();
	const [updateTodo] = useUpdateTodo();

	const handleOpenDetails = () => {
		openContextModal({
			modal: "updateTodo",
			innerProps: {
				todoId: todo.id,
			},
		});
	};

	const handleToggle = () => {
		updateTodo({
			id: todo.id,
			data: {
				completed: !todo.completed,
			},
		});
	};
	return (
		<Group
			align="center"
			sx={(theme) => ({
				color: todo.completed
					? theme.colorScheme === "light"
						? theme.colors.gray[5]
						: theme.colors.gray[2]
					: theme.colorScheme === "light"
					? theme.colors.dark[9]
					: theme.colors.gray[0],
				cursor: "pointer",
			})}
		>
			<Text
				td={todo.completed ? "line-through" : "auto"}
				onClick={handleToggle}
			>
				#{todo.id}
			</Text>
			<Text
				td={todo.completed ? "line-through" : "auto"}
				onClick={handleToggle}
			>
				{todo.title}
			</Text>

			<Group align="center" spacing={5} ml="auto">
				<Tooltip label={todo.author_email ?? "Anonymous"}>
					<Avatar
						src={
							todo.author_avatar
								? todo.author_avatar
								: todo.author_email
								? `https://gravatar.com/avatar/${todo.author_email}?s=400&d=robohash&r=x`
								: undefined
						}
						placeholder={todo.author_avatar ?? "?"}
						size="sm"
						radius="xl"
					/>
				</Tooltip>
				<ActionIcon
					size="xs"
					variant="light"
					color="red"
					onClick={() => deleteTodo({ id: todo.id })}
				>
					<IconTrash
						onClick={() => {
							notifications.show({
								title: "Вы удалили задачу",
								message: "Вы РЕАЛЬНО удалили задачу",
								color: "red",
								icon: <IconWoman />,
							});
						}}
					/>
				</ActionIcon>
				<ActionIcon size="xs" variant="light" onClick={handleOpenDetails}>
					<IconPencil />
				</ActionIcon>
			</Group>
		</Group>
	);
};

export default TodoItem;
