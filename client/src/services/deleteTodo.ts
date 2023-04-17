import { useMutation, useQueryClient } from "@tanstack/react-query";
import { baseAxios } from "@/utils/baseAxios";

type DeleteTodoArg = {
	id: string;
};

const deleteTodo = async (arg: DeleteTodoArg) => {
	const { id } = arg;
	await baseAxios.delete(`/todos/${id}`);
};

export const useDeleteTodo = () => {
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: deleteTodo,
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
