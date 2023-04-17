import { FetchTodoArg } from "@/services/fetchTodo";
import { Todo } from "@/utils/types/todo";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: FetchTodoArg = {
	// sort: "created_at",
	// order: "desc",
	searchText: "",
	page: 1,
	limit: 5,
};

export const todoFiltersSlice = createSlice({
	name: "todoFiltersSlice",
	initialState: initialState,
	reducers: {
		setSearchText(state, action: PayloadAction<string>) {
			state.searchText = action.payload;
			state.page = 1;
		},
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload;
		},
	},
});

export const {
	actions: { setSearchText, setPage },
} = todoFiltersSlice;
