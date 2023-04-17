import { useQuery } from "@tanstack/react-query";
import { Todo } from "../utils/types/todo";
import { baseAxios } from "@/utils/baseAxios";
import { getSession } from "next-auth/react";

export type FetchTodoArg = {
	_sort?: keyof Todo;
	_order?: "asc" | "desc";
	q?: string;
	_page?: any;
	_limit: number;
};

const fetchTodo = async (arg: FetchTodoArg) => {
	const session = await getSession();
	const { data, headers } = await baseAxios.get<Todo[]>("/todos", {
		params: arg,
	});

	const total = headers["x-total-count"]
		? parseInt(headers["x-total-count"])
		: 0;

	// const todosWithAuthor = data.map((todo) => ({
	// 	...todo,
	// 	author: session?.user?.image || "Not Image",
	// }));

	return { data, total };
};

export const useFetchTodo = (arg: FetchTodoArg) => {
	const query = useQuery({
		queryFn: () => fetchTodo(arg),
		queryKey: ["todos", arg],
		initialData: {
			data: [],
			total: 0,
		},
	});

	return [query.data, query] as const;
};
