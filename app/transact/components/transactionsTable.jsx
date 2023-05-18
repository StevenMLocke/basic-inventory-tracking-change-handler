"use client";
import {
	useReactTable,
	createColumnHelper,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	flexRender,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";

export function TransactionTable({ dataData }) {
	const [sorting, setSorting] = useState([]);
	const columnHelper = createColumnHelper();

	const data = useMemo(() => dataData, [dataData]);

	const columns = useMemo(
		() => [
			columnHelper.accessor(
				(row) => {
					const dateObj = new Date(row.date);
					return dateObj.toLocaleDateString("en-us", {
						year: "numeric",
						month: "short",
						day: "numeric",
					});
				},
				{
					header: "Date",
				}
			),
			columnHelper.accessor((row) => row.action.type, { header: "Action" }),
			columnHelper.group({
				header: "Asset",
				columns: [
					columnHelper.accessor((row) => row.asset.asset_number, {
						header: "Asset Number",
						cell: (info) => info.getValue(),
					}),
					columnHelper.accessor((row) => row.asset.model.manufacturer.name, {
						header: "Manufacturer",
						cell: (info) => info.getValue(),
					}),
					columnHelper.accessor((row) => row.asset.model.name, {
						header: "Model",
						cell: (info) => info.getValue(),
					}),
				],
			}),
			columnHelper.group({
				header: "To User?",
				columns: [
					columnHelper.accessor(
						(row) =>
							row.user_transaction_asset_user_idTouser
								? row.user_transaction_asset_user_idTouser.email
								: "",
						{ header: "Email" }
					),
				],
			}),
			columnHelper.group({
				header: "Transactor",
				columns: [
					columnHelper.accessor(
						(row) =>
							row?.user_transaction_action_user_idTouser?.full_name ?? "",
						{ header: "Name" }
					),
				],
			}),
		],
		[columnHelper]
	);
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<div className='flex flex-col flex-1 items-start overflow-y-auto max-h-[100cqh] min-w-full scroll-smooth'>
			<Flipper
				flipKey={sorting}
				spring={"wobbly"}
				className='w-full'
			>
				<table className='min-w-full table table-auto table-compact bg-primary'>
					<thead className='table-header-group sticky top-0'>
						{table.getHeaderGroups().map((headerGroup) => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<th
											key={header.id}
											colSpan={header.colSpan}
										>
											{header.isPlaceholder ? null : (
												<div
													{...{
														className: header.column.getCanSort()
															? "cursor-pointer select-none"
															: "",
														onClick: header.column.getToggleSortingHandler(),
													}}
												>
													{flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
													{{
														asc: " 🔼",
														desc: " 🔽",
													}[header.column.getIsSorted()] ?? null}
												</div>
											)}
										</th>
									);
								})}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map((row) => {
							return (
								<Flipped
									key={row.id}
									flipId={row.id}
								>
									<tr key={row.id}>
										{row.getVisibleCells().map((cell) => {
											return (
												<td key={cell.id}>
													{flexRender(
														cell.column.columnDef.cell,
														cell.getContext()
													)}
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
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	);
}
