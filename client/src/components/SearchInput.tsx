import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchText } from "@/store/slices/todoFilters.slice";
import { baseAxios } from "@/utils/baseAxios";
import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { ChangeEvent, memo } from "react";
import { shallowEqual } from "react-redux";

const SearchInput = () => {
	const dispatch = useAppDispatch();
	const searchText = useAppSelector((state) => state.todoFilters.q);

	const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const val = e.currentTarget.value;
		dispatch(setSearchText(val)); // dispatch({ type: "searchSlice/setSearchText", payload: "some string" });
	};

	return (
		<TextInput
			icon={<IconSearch />}
			placeholder="..."
			value={searchText}
			onChange={handleChange}
		/>
	);
};

export default memo(SearchInput, shallowEqual); //prevProps === currentProps ? null : update();

// {} === {} // false
// {} == {} // false

// type FooProps = {
// 	title: string;
// 	children: React.ReactNode;
// };

// const Foo = ({ children, title }: FooProps) => {
// 	return (
// 		<div>
// 			<h1>{title}</h1>
// 			<main>{children}</main>
// 		</div>
// 	);
// };

// const Bar = () => {
// 	return (
// 		<div>
// 			<Foo title="Hello Javascript!!">
// 				<h2>Hello world</h2>
// 			</Foo>
// 		</div>
// 	);
// };

// const Foo = ({ children, title }: FooProps) => {
// 	return (
// 		div({
//             children: [
//                 h1({
//                     children: title
//                 }),
//                 main({
//                     children: children
//                 })
//             ]
//         })
// 	);
// };

// const Bar = () => {

//     const fooProps = {
//         title: "Hello Javascript!!",
//         children: [
//             h2({
//                 children: [
//                     "Hello world"
//                 ]
//             })
//         ]
//     };

// 	return (
// 		div({
//             children: [
//                 Foo(fooProps)
//             ]
//         })
// 	);
// };
