import { Container, Stack } from "@mantine/core";
import TodoForm from "@/components/TodoForm";
import { useCreateTodo } from "@/services/createTodo";
import Navbar from "@/components/Header";
import TodoList from "@/components/TodoList";

export default function Home() {
	const [createTodo] = useCreateTodo();

	return (
		<>
			<Container>
				<Navbar />
				<Stack spacing={10}>
					<TodoForm onSubmit={(values) => createTodo({ data: values })} />
					<TodoList />
				</Stack>
			</Container>
		</>
	);
}
