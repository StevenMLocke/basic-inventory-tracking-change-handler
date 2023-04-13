/* eslint-disable react/jsx-key */
"use client";
import { useMemo } from "react";
import { useTable } from "react-table";

export function Table({ tableData, tableColumns }) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const data = useMemo(() => tableData, []);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const columns = useMemo(() => tableColumns, []);

	const tableInstance = useTable({ columns, data });
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
								<th {...col.getHeaderProps()}>{col.render("Header")}</th>
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
								className={`table-row hover hover:cursor-pointer`}
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
