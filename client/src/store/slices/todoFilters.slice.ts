import { FetchTodoArg } from "@/services/fetchTodo";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: FetchTodoArg = {
	_sort: "created_at",
	_order: "desc",
	q: "",
	_page: 1,
	_limit: 5,
};

export const todoFiltersSlice = createSlice({
	name: "todoFiltersSlice",
	initialState: initialState,
	reducers: {
		setSearchText(state, action: PayloadAction<string>) {
			state.q = action.payload;
		},
		setPage(state, action: PayloadAction<number>) {
			state._page = action.payload;
		},
	},
});

export const {
	actions: { setSearchText, setPage },
} = todoFiltersSlice;
