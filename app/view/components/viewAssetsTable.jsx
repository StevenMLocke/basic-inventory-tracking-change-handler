"use client";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";
import { useMemo, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";
import {
	SelectColumnFilter,
	TextColumnFilter,
} from "@/components/tableParts/filters";
import { TableWrapper } from "@/components/tableParts/structures";

export function ViewAssetsTable({ dataData }) {
	const [activeRowInd, setActiveRowInd] = useState(-1);
	const [flipped, setFlipped] = useState(false);

	//https://codesandbox.io/s/github/tannerlinsley/react-table/tree/v7/examples/column-resizing
	const defaultColumn = useMemo(
		() => ({
			minWidth: 1,
			width: 1,
			maxWidth: 400,
			Filter: TextColumnFilter,
		}),
		[]
	);

	const columns = useMemo(
		() => [
			{
				Header: "Asset",
				accessor: "asset_number",
				Filter: SelectColumnFilter,
				filter: "equals",
			},
			{
				Header: "Manu.",
				accessor: "model.manufacturer.name",
				Filter: SelectColumnFilter,
				filter: "equals",
			},
			{
				Header: "Model",
				accessor: "model.name",
				Filter: SelectColumnFilter,
				filter: "equals",
			},
			{
				Header: "Serial #",
				accessor: "serial_number",
				Filter: SelectColumnFilter,
				filter: "equals",
			},
			{
				Header: "User Name",
				accessor: "user.full_name",
			},
			{
				Header: "User Email",
				accessor: "user.email",
			},
			{
				Header: "Location",
				accessor: "location.name",
				Filter: SelectColumnFilter,
				filter: "equals",
			},
			{
				Header: "Status",
				accessor: "status.name",
				Filter: SelectColumnFilter,
				filter: "equals",
			},
			{
				Header: "Funding Src.",
				accessor: "funding_source.name",
				Filter: SelectColumnFilter,
				filter: "equals",
			},
			{
				Header: "Purchase Date",
				accessor: "formattedPurchaseDate",
				Filter: SelectColumnFilter,
				filter: "equals",
			},
		],
		[]
	);

	const data = useMemo(() => dataData, [dataData]);

	const tableInstance = useTable(
		{ columns, data, defaultColumn, initialState: { pageSize: 25 } },
		useFilters,
		useSortBy,
		usePagination
	);

	const rowClickHandler = (e, row) => {
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
			<TableWrapper>
				<Flipper
					flipKey={flipped}
					className='min-w-full'
				>
					<table
						className='flex flex-1 w-full max-w-full min-w-full table table-auto table-sm table-pin-rows bg-neutral'
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
				{/* https://codesandbox.io/embed/github/tannerlinsley/react-table/tree/v7/examples/pagination */}
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
