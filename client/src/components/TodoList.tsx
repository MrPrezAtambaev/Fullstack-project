import {
	Group,
	List,
	Loader,
	Pagination,
	Skeleton,
	Stack,
} from "@mantine/core";
import React from "react";
import TodoItem from "./TodoItem";
import { useFetchTodo } from "@/services/fetchTodo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPage } from "@/store/slices/todoFilters.slice";

const TodoList = () => {
	const dispatch = useAppDispatch();
	const todoFilters = useAppSelector((state) => state.todoFilters);

	const handleChange = (page: number) => {
		dispatch(setPage(page));
	};

	const [todos, { isLoading }] = useFetchTodo(todoFilters);

	if (isLoading) {
		return (
			<>
				<Skeleton height={50} circle mb="xl" />
				<Skeleton height={8} radius="xl" />
				<Skeleton height={8} mt={6} radius="xl" />
				<Skeleton height={8} mt={6} width="70%" radius="xl" />
			</>
		);
	}

	return (
		<>
			<Stack>
				{todos.results.map((todo) => (
					<TodoItem todo={todo} key={todo.id} />
				))}
			</Stack>
			<Group position="center">
				<Pagination
					value={todoFilters.page ?? 1}
					onChange={handleChange}
					siblings={1}
					total={Math.ceil(todos.total / todoFilters.limit)}
				/>
			</Group>
		</>
	);
};

export default TodoList;
