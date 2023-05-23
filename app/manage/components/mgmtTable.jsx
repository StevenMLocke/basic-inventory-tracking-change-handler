import { useMemo, useState } from "react";
import { useTable, useSortBy, useFlexLayout } from "react-table";
import { Flipper, Flipped } from "react-flip-toolkit";

export function Table({
	tableData,
	tableColumns,
	selectHandler,
	selectedTab,
	activeRowId,
	options,
}) {
	const data = useMemo(() => tableData, [tableData]);
	const columns = useMemo(() => tableColumns, [tableColumns]);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		state,
	} = useTable({ columns, data, ...options }, useSortBy);

	const [flipped, setFlipped] = useState(false);

	const flipHandler = () => setFlipped((p) => !p);

	//reference https://github.com/TanStack/table/discussions/2647 for key solve
	return (
		<div className='flex flex-1 items-start overflow-y-auto max-h-[100cqh] scroll-smooth'>
			<Flipper
				flipKey={state}
				className='w-full'
			>
				<table
					{...getTableProps()}
					className='w-full table table-auto table-compact bg-neutral'
				>
					<thead className='table-header-group sticky top-0'>
						{headerGroups.map((headerGroup) => {
							const { key, ...restHeaderGroupProps } =
								headerGroup.getHeaderGroupProps();
							return (
								<tr
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
	);
}
