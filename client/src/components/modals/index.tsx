import CreateTodoModal from "./CreateTodoModal";
import RegisterModal from "./RegisterModal";
import UpdateTodoModal from "./UpdateTodoModal";

export const modals = {
	createTodo: CreateTodoModal,
	updateTodo: UpdateTodoModal,
	register: RegisterModal,
} as const;
