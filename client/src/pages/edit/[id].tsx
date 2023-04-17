import { useUpdateTodo } from "@/services/updateTodo";
import React from "react";
import { useForm, zodResolver } from "@mantine/form";
import z from "zod";
import { Checkbox, TextInput } from "@mantine/core";
import { GetServerSideProps } from "next";
import { Todo } from "@/utils/types/todo";
import { baseAxios } from "@/utils/baseAxios";
import { useRouter } from "next/router";

type Props = {
	data: Todo;
};

const editTodoSchema = z.object({
	title: z.string().min(1, "Это поле обязательно!"),
	completed: z.boolean().default(false),
});

type EditTodoFormValues = z.infer<typeof editTodoSchema>;

const Edit = ({ data }: Props) => {
	const form = useForm<EditTodoFormValues>({
		initialValues: {
			title: data.title,
			completed: data.completed,
		},
		validate: zodResolver(editTodoSchema),
	});

	const [updateTodo] = useUpdateTodo();

	const router = useRouter();

	const handleFormSubmit = (values: EditTodoFormValues) => {
		updateTodo({
			id: data.id,
			data: values,
		});
		router.push("/");
	};

	return (
		<>
			<form onSubmit={form.onSubmit(handleFormSubmit)}>
				<TextInput
					label="Название"
					placeholder="Введите название"
					{...form.getInputProps("title")}
				/>
				<Checkbox
					label="Статус"
					{...form.getInputProps("completed", { type: "checkbox" })}
				/>
				<button type="submit">Update Todo</button>
			</form>
		</>
	);
};

export default Edit;

export const getServerSideProps: GetServerSideProps<
	Props,
	{ id: string }
> = async (ctx) => {
	const id = ctx.params?.id ?? null;

	if (!id) {
		return {
			notFound: true,
		};
	}

	try {
		const { data } = await baseAxios.get<Todo>(`/todos/${id}`);

		return {
			props: {
				data,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};
