export default function MgmtTable({
	itemsArr,
	selectHandler,
	activeRowId,
	selectedTab,
}) {
	const itemKeys = Object.keys(itemsArr[0]);
	const colHeaders = ["#", ...itemKeys];

	return (
		<div className='flex flex-1 items-start'>
			<table className='flex-1 table table-compact border-t-4 border-slate-400 bg-neutral-focus'>
				<thead>
					<tr>
						{colHeaders
							.filter((key) => key != "id" && key != "permission_id")
							.map((ch, i) => {
								return <th key={`tHead ${i}`}>{ch}</th>;
							})}
					</tr>
				</thead>
				<tbody>
					{itemsArr.map((item, i) => {
						return (
							<tr
								key={item.id}
								id={item.id}
								className={`table-row hover hover:cursor-pointer ${
									item.id === activeRowId ? "border-2 border-white" : null
								}`}
								onClick={(e) => selectHandler(e, item, selectedTab)}
							>
								<td>{i + 1}</td>
								{itemKeys
									.filter((key) => key != "id" && key != "permission_id")
									.map((key, i) => {
										return <td key={`${i} ${item.id}`}>{item[key]}</td>;
									})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
