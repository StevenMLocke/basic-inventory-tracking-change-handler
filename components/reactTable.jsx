/* eslint-disable react/jsx-key */
"use client";
import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";

export function Table({
	tableData,
	tableColumns,
	selectHandler,
	selectedTab,
	activeRowId,
	options,
}) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const data = useMemo(() => tableData, []);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const columns = useMemo(() => tableColumns, []);

	const tableInstance = useTable({ columns, data, ...options }, useSortBy);
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance;

	return (
		<div className='flex flex-1 items-start'>
			<table
				{...getTableProps()}
				className='flex-1 table table-compact border-t-4 border-slate-400 bg-neutral-focus'
			>
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((col) => (
								<th
									{...col.getHeaderProps(col.getSortByToggleProps())}
									className={`${col.isSorted ? "underline" : ""}`}
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
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr
								{...row.getRowProps()}
								className={`table-row hover hover:cursor-pointer ${
									row.index === activeRowId ? "border-2 border-white" : null
								}`}
								onClick={(e) =>
									selectHandler(e, row.values, selectedTab, row.index)
								}
							>
								{row.cells.map((cell) => {
									return (
										<td {...cell.getCellProps()}>{cell.render("Cell")}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
