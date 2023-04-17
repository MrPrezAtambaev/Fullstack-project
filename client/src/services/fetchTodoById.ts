import { useQuery } from "@tanstack/react-query";
import { Todo } from "../utils/types/todo";
import { baseAxios } from "@/utils/baseAxios";

export type FetchTodoByIdArg = {
	id: string;
};

const fetchTodoById = async (arg: FetchTodoByIdArg) => {
	const { data } = await baseAxios.get<Todo>(`/todos/${arg.id}`);
	return data;
};

// Функция для получения списка todos
export const useFetchTodoById = (arg: FetchTodoByIdArg) => {
	const query = useQuery({
		queryFn: () => fetchTodoById(arg),
		queryKey: ["todos", arg],
	});

	return [query.data, query] as const;
};
