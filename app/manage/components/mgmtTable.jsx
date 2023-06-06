import { useMemo, useState } from "react";
import {
	useTable,
	useSortBy,
	useFlexLayout,
	useFilters,
	usePagination,
} from "react-table";
import { Flipper, Flipped } from "react-flip-toolkit";

export function Table({
	tableData,
	tableColumns,
	selectHandler,
	selectedTab,
	activeRowId,
	options,
}) {
	//https://codesandbox.io/embed/github/tannerlinsley/react-table/tree/v7/examples/filtering
	function TextColumnFilter({
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

	const data = useMemo(() => tableData, [tableData]);
	const columns = useMemo(() => tableColumns, [tableColumns]);
	//https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7/examples/column-resizing
	const defaultColumn = useMemo(
		() => ({
			minWidth: 1,
			width: 5,
			maxWidth: 400,
			Filter: TextColumnFilter,
		}),
		[]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			defaultColumn,
			...options,
		},
		useFilters,
		useSortBy,
		useFlexLayout,
		usePagination
	);

	const [flipped, setFlipped] = useState(false);

	const flipHandler = () => setFlipped((p) => !p);

	//reference https://github.com/TanStack/table/discussions/2647 for key solve
	return (
		<div className='flex flex-col flex-1 items-center'>
			<div className='flex min-w-full items-start overflow-y-auto max-h-[100cqh] scroll-smooth'>
				<Flipper
					flipKey={flipped}
					className='w-full'
				>
					<table
						{...getTableProps()}
						className='flex flex-1 w-full min-w-full table table-auto table-compact bg-neutral'
					>
						<thead className='table-header-group sticky top-0'>
							{headerGroups.map((headerGroup) => {
								const { key, ...restHeaderGroupProps } =
									headerGroup.getHeaderGroupProps();
								return (
									<tr
										onClick={flipHandler}
										key={key}
										{...restHeaderGroupProps}
										className={``}
									>
										{headerGroup.headers.map((col) => {
											const { key, ...restCol } = col.getHeaderProps(
												col.getSortByToggleProps()
											);
											return (
												<th
													key={key}
													{...restCol}
													className={`${
														col.isSorted ? "underline" : ""
													} table-cell`}
												>
													{col.render("Header")}
													<span
														className={`inline-block min-w-[2rem] origin-center text-center transition-all duration-700
												${col.isSorted ? "visible" : "invisible"}
												${col.isSortedDesc ? "rotate-180" : "rotate-0"}
											`}
													>
														{col.isSorted ? "🔼" : ""}
													</span>
													<div>
														{col.canFilter ? col.render("Filter") : null}
													</div>
												</th>
											);
										})}
									</tr>
								);
							})}
						</thead>
						<tbody {...getTableBodyProps()}>
							{page.map((row) => {
								prepareRow(row);
								const { key, ...restRowProps } = row.getRowProps();
								return (
									<Flipped
										key={`${key}${key}`}
										flipId={`${key}${key}`}
									>
										<tr
											key={key}
											{...restRowProps}
											className={`table-row hover hover:cursor-pointer ${
												row.index === activeRowId
													? "border-2 border-primary-focus"
													: null
											}`}
											onClick={(e) =>
												selectHandler(e, row.values, selectedTab, row.index)
											}
										>
											{row.cells.map((cell) => {
												const { key, ...restCellProps } = cell.getCellProps();
												return (
													<td
														key={key}
														{...restCellProps}
														className='slashed-zero'
													>
														{cell.render("Cell")}
													</td>
												);
											})}
										</tr>
									</Flipped>
								);
							})}
						</tbody>
					</table>
				</Flipper>
			</div>
			{tableData.length > 10 && (
				<div className='pagination flex bg-base-200 p-2 min-w-full justify-around'>
					<div>
						<button
							className={`btn btn-primary btn-sm bg-inherit btn-outline`}
							onClick={() => gotoPage(0)}
							disabled={!canPreviousPage}
						>
							{"<<"}
						</button>{" "}
						<button
							className={`btn btn-primary btn-sm bg-inherit btn-outline`}
							onClick={() => previousPage()}
							disabled={!canPreviousPage}
						>
							{"<"}
						</button>{" "}
						<button
							className={`btn btn-primary btn-sm bg-inherit btn-outline`}
							onClick={() => nextPage()}
							disabled={!canNextPage}
						>
							{">"}
						</button>{" "}
						<button
							className={`btn btn-primary btn-sm bg-inherit btn-outline`}
							onClick={() => gotoPage(pageCount - 1)}
							disabled={!canNextPage}
						>
							{">>"}
						</button>{" "}
					</div>
					<span>
						Page{" "}
						<strong>
							{pageIndex + 1} of {pageOptions.length}
						</strong>{" "}
					</span>
					<span>
						| Go to page:{" "}
						<input
							className='input input-bordered input-sm'
							type='number'
							defaultValue={pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								gotoPage(page);
							}}
							style={{ width: "100px" }}
						/>
					</span>{" "}
					<select
						className='select select-bordered select-sm w-full max-w-xs form-control'
						value={pageSize}
						onChange={(e) => {
							setPageSize(Number(e.target.value));
						}}
					>
						{[1, 2, 3, 4, 5, 10, 20, 25, 30, 40, 50].map((pageSize) => (
							<option
								key={pageSize}
								value={pageSize}
							>
								Show {pageSize}
							</option>
						))}
					</select>
				</div>
			)}
		</div>
	);
}
