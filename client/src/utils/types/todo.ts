export interface Todo {
	id: string;
	title: string;
	completed: boolean;
	created_at: string;
	author_avatar?: string | null;
	author_email?: string | null;
}
