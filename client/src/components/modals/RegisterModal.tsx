import React from "react";
import { ContextModalProps, closeModal } from "@mantine/modals";
import Register, { RegFormValues } from "../Register";
import { useRegister } from "@/services/register";

type Props = ContextModalProps<{}>;

const RegisterModal = ({ context, id, innerProps }: Props) => {
	const [register] = useRegister();
	const handleRagister = (data: RegFormValues) => {
		register(data);
		context.closeModal(id);
	};

	return <Register onSubmit={handleRagister} />;
};

export default RegisterModal;
