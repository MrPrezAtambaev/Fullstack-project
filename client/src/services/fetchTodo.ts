import { useQuery } from "@tanstack/react-query";
import { Todo } from "../utils/types/todo";
import { baseAxios } from "@/utils/baseAxios";
import { getSession } from "next-auth/react";

export type FetchTodoArg = {
	// sort: keyof Todo;
	// order: "asc" | "desc";
	searchText?: string;
	page?: number;
	limit: number;
};

export type FetchTodoResponse = {
	results: Todo[];
	total: number;
	next: {
		page: number;
		limit: number;
	} | null;
	prev: {
		page: number;
		limit: number;
	} | null;
};

const fetchTodo = async (arg: FetchTodoArg) => {
	const { data } = await baseAxios.get<FetchTodoResponse>("/todos", {
		params: arg,
	});

	return data;
};

export const useFetchTodo = (arg: FetchTodoArg) => {
	const query = useQuery({
		queryFn: () => fetchTodo(arg),
		queryKey: ["todos", arg],
		initialData: {
			results: [],
			total: 0,
			next: null,
			prev: null,
		},
	});

	return [query.data, query] as const;
};
