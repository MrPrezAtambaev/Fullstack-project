export interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: string;
	updatedAt: string;
	authorId: string | null;
	author?: {
		id: string;
		email: string;
	} | null;
}
