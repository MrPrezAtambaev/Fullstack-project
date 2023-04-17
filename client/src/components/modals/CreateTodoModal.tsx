// import { useFetchTodoById } from "@/services/fetchTodoById";
// import { Title } from "@mantine/core";
import { ContextModalProps } from "@mantine/modals";
import TodoForm, { TodoFormValues } from "../TodoForm";
import { useCreateTodo } from "@/services/createTodo";

type Props = ContextModalProps<{}>;

const CreateTodoModal = ({ context, id, innerProps }: Props) => {
	const [createTodo] = useCreateTodo();

	const handleSubmit = (data: TodoFormValues) => {
		createTodo({ data });
		context.closeModal(id);
	};

	return <TodoForm onSubmit={handleSubmit} />;
};

export default CreateTodoModal;
