import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "@/utils/types/todo";
import { baseAxios } from "@/utils/baseAxios";

type UpdateTodoArg = {
	id: string;
	data: Partial<Omit<Todo, "id">>;
};

const updateTodo = async (arg: UpdateTodoArg) => {
	const { data } = await baseAxios.patch(`/todos/${arg.id}`, arg.data);
	return data;
};

export const useUpdateTodo = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: updateTodo,
		onSettled() {
			queryClient.invalidateQueries({
				predicate(query) {
					return query.queryKey?.[0] === "todos";
				},
			});
		},
	});

	return [mutation.mutateAsync, mutation] as const;
};
