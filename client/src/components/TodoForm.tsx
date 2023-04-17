import React from "react";
import { Checkbox, FocusTrap, Stack, TextInput } from "@mantine/core";
import { Button } from "@mantine/core";
import z from "zod";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

type Props = {
	onSubmit(values: TodoFormValues): void;
	defaultValues?: Partial<TodoFormValues>;
};

const todoFormSchema = z.object({
	title: z.string().min(1, "Это поле обязательно!"),
	completed: z.boolean().default(false),
});

export type TodoFormValues = z.infer<typeof todoFormSchema>;

const TodoForm = ({ onSubmit, defaultValues = {} }: Props) => {
	const form = useForm<TodoFormValues>({
		initialValues: {
			title: "",
			completed: false,
			...defaultValues,
		},
		validate: zodResolver(todoFormSchema),
	});

	const handleSubmit = (values: TodoFormValues) => {
		onSubmit(values);
		form.reset();
	};

	return (
		<FocusTrap active>
			<form onSubmit={form.onSubmit(handleSubmit)}>
				<Stack>
					<TextInput
						label="Введите имя тудушки"
						{...form.getInputProps("title")}
					/>
					<Checkbox
						label="Статус"
						{...form.getInputProps("completed", { type: "checkbox" })}
					/>
					<Button
						type="submit"
						onClick={() => {
							notifications.show({
								title: "Вы успешно создали или сохранили задание",
								message: "Я незнаю что еще тут писать",
								styles: (theme) => ({
									root: {
										backgroundColor: theme.colors.violet[6],
										borderColor: theme.colors.green[6],

										"&::before": { backgroundColor: theme.white },
										"::selection": {
											backgroundColor: theme.colors.green,
											color: theme.colors.violet,
										},
									},

									title: {
										color: theme.white,
										"::selection": {
											backgroundColor: theme.colors.green,
											color: theme.colors.white,
										},
									},
									description: {
										color: theme.white,
										"::selection": {
											backgroundColor: theme.colors.green,
											color: theme.colors.white,
										},
									},
									closeButton: {
										color: theme.white,
										"&:hover": { backgroundColor: theme.colors.red[7] },
									},
								}),
								icon: <IconCheck />,
							});
						}}
					>
						Сохранить
					</Button>
				</Stack>
			</form>
		</FocusTrap>
	);
};

export default TodoForm;
