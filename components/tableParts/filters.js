import { useMemo } from "react";

//https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7/examples/filtering?file=/src/App.js:629-1348
export function SelectColumnFilter({
	column: { filterValue, setFilter, preFilteredRows, id },
}) {
	const options = useMemo(() => {
		const options = new Set();
		preFilteredRows.forEach((row) => {
			options.add(row.values[id]);
		});
		return [...options.values()].sort((a, b) => {
			if (a * 1 > b * 1) {
				return 1;
			}
			if (a * 1 < b * 1) {
				return -1;
			}
			return 0;
		});
	}, [id, preFilteredRows]);

	return (
		<select
			className='select select-bordered select-sm w-[4rem] form-control my-2 '
			value={filterValue}
			onChange={(e) => {
				setFilter(e.target.value || undefined);
			}}
		>
			<option value=''>All</option>
			{options.map((option, i) => (
				<option
					key={i}
					value={option}
				>
					{option}
				</option>
			))}
		</select>
	);
}

//https://codesandbox.io/embed/github/tannerlinsley/react-table/tree/v7/examples/filtering
export function TextColumnFilter({
	column: { filterValue, preFilteredRows, setFilter },
}) {
	const count = preFilteredRows.length;

	return (
		<input
			className='input input-bordered input-sm max-w-[5rem] form-control my-2'
			value={filterValue || ""}
			onChange={(e) => {
				setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
			}}
			placeholder={`Search ${count} records...`}
		/>
	);
}