import React from "react";
import { ContextModalProps, closeModal } from "@mantine/modals";
import Register from "../Register";

type Props = ContextModalProps<{}>;

const RegisterModal = ({ context, id, innerProps }: Props) => {
	const handleRagister = () => {
		context.closeModal(id);
	};

	return <Register onSubmit={handleRagister} />;
};

export default RegisterModal;
