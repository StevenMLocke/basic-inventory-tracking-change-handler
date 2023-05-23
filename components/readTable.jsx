"use client";
import { useTable, useSortBy, useFilters } from "react-table";
import { useMemo, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { TransactionCard } from "./../app/transact/components/transactionCard";

//https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7/examples/filtering?file=/src/App.js:629-1348
function SelectColumnFilter({
	column: { filterValue, setFilter, preFilteredRows, id },
}) {
	// Calculate the options for filtering
	// using the preFilteredRows
	const options = useMemo(() => {
		const options = new Set();
		preFilteredRows.forEach((row) => {
			options.add(row.values[id]);
		});
		return [...options.values()];
	}, [id, preFilteredRows]);

	// Render a multi-select box
	return (
		<select
			className='select select-bordered select-sm max-w-xs form-control m-2 w-fit'
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

export function ReadTable({ columnsData, dataData }) {
	const [rowData, setRowData] = useState(null);
	const [activeRowInd, setActiveRowInd] = useState(-1);

	const columns = useMemo(
		() => [
			{
				Header: "Date",
				accessor: "date",
				Filter: SelectColumnFilter,
				filter: "includes",
			},
			{
				Header: "Action",
				accessor: "action",
				Filter: SelectColumnFilter,
				filter: "includes",
			},
			{
				Header: "Asset Number",
				accessor: "asset.asset_number",
				Filter: SelectColumnFilter,
				filter: "equals",
			},
			{
				Header: "Manufacturer",
				accessor: "asset.model.manufacturer.name",
				Filter: SelectColumnFilter,
				filter: "includes",
			},
			{
				Header: "Model",
				accessor: "asset.model.name",
				Filter: SelectColumnFilter,
				filter: "includes",
			},
			{
				Header: "Asset User",
				accessor: "asset_user.email",
				Filter: SelectColumnFilter,
				filter: "includes",
			},
			{
				Header: "Transactor",
				accessor: "transactor",
				Filter: SelectColumnFilter,
				filter: "includes",
			},
		],
		[]
	);

	const data = useMemo(() => dataData, [dataData]);

	const tableInstance = useTable({ columns, data }, useFilters, useSortBy);

	const rowClickHandler = (e, row) => {
		setRowData({
			date: row.original.date,
			asset: row.original.asset,
			action: row.original.action,
			user: row.original.asset_user,
			transactor: row.original.transactor,
			location: row.original.location,
		});
		setActiveRowInd(row.index);
	};

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
	} = tableInstance;

	return (
		<>
			{rowData && (
				<div
					className=' w-full h-[100vh] absolute flex justify-center items-start backdrop-blur-sm z-50 pt-4'
					onClick={() => setRowData(null)}
				>
					<TransactionCard
						action={rowData.action}
						rowDate={rowData.date}
						asset={rowData.asset}
						user={rowData.user}
						transactor={rowData.transactor}
						location={rowData.location}
					></TransactionCard>
				</div>
			)}
			<div className='flex flex-1 items-start overflow-y-auto min-w-full max-h-[100cqh] scroll-smooth'>
				<Flipper
					flipKey={state}
					className='min-w-full'
				>
					<table
						className='min-w-full table table-auto table-compact bg-neutral'
						{...getTableProps()}
					>
						<thead className='table-header-group sticky top-0'>
							{headerGroups.map((headerGroup) => {
								const { key, ...restHeaderGroupProps } =
									headerGroup.getHeaderGroupProps();
								return (
									<tr
										key={key}
										{...restHeaderGroupProps}
									>
										{headerGroup.headers.map((header) => {
											const { key, ...restHeader } = header.getHeaderProps(
												header.getSortByToggleProps()
											);
											return (
												<th
													key={key}
													{...restHeader}
													className={`${
														header.isSorted ? "underline" : ""
													} table-cell`}
												>
													{header.render("Header")}
													<span
														className={`inline-block min-w-[2rem] origin-center text-center transition-all duration-700
																					${header.isSorted ? "visible" : "invisible"}
																					${header.isSortedDesc ? "rotate-180" : "rotate-0"}
																			`}
													>
														{header.isSorted ? "🔼" : ""}
													</span>
													<div>
														{header.canFilter ? header.render("Filter") : null}
													</div>
												</th>
											);
										})}
									</tr>
								);
							})}
						</thead>
						<tbody {...getTableBodyProps()}>
							{rows.map((row) => {
								prepareRow(row);
								const { key, ...restRow } = row.getRowProps();
								return (
									<Flipped
										key={key}
										flipId={key}
									>
										<tr
											key={key}
											{...restRow}
											className={`table-row hover hover:cursor-pointer ${
												row.index === activeRowInd
													? "border-2 border-primary-focus"
													: null
											}`}
											onClick={(e) => {
												rowClickHandler(e, row);
											}}
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
				{/* 				<pre>{JSON.stringify(rowData, null, 2)}</pre> */}
			</div>
		</>
	);
}
