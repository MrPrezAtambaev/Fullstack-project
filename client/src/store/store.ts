import { configureStore } from "@reduxjs/toolkit";
import { todoFiltersSlice } from "./slices/todoFilters.slice";

export const store = configureStore({
	reducer: {
		todoFilters: todoFiltersSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
