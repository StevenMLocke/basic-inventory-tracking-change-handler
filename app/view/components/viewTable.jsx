"use client";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { useMemo, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import { TransactionCard } from "./../../transact/components/transactionCard";
import {
	SelectColumnFilter,
	TextColumnFilter,
} from "@/components/tableParts/filters";
import { TableWrapper } from "@/components/tableParts/structures";

export function ViewTable({ dataData }) {
	const [rowData, setRowData] = useState(null);
	const [activeRowInd, setActiveRowInd] = useState(-1);
	const [flipped, setFlipped] = useState(false);

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
				Filter: TextColumnFilter,
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

	const tableInstance = useTable(
		{ columns, data, initialState: { pageSize: 25 } },
		useFilters,
		useSortBy,
		usePagination
	);

	const rowClickHandler = (e, row) => {
		setRowData({ ...row.original });
		setActiveRowInd(row.index);
	};

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
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
						user={rowData.asset_user}
						transactor={rowData.transactor}
						location={rowData.location}
					></TransactionCard>
				</div>
			)}
			<TableWrapper>
				<Flipper
					flipKey={flipped}
					className='min-w-full'
				>
					<table
						className='min-w-full table table-auto table-pin-rows table-sm bg-neutral'
						{...getTableProps()}
					>
						<thead className='table-header-group'>
							{headerGroups.map((headerGroup) => {
								const { key, ...restHeaderGroupProps } =
									headerGroup.getHeaderGroupProps();
								return (
									<tr
										onClick={() => {
											setFlipped((p) => !p);
										}}
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
													} table-cell prose`}
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
							{page.map((row) => {
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
			</TableWrapper>
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
		</>
	);
}
