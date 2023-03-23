export default function ActionsTable({
	actions,
	selectHandler,
	activeRowId,
	selectedTab,
}) {
	return (
		<div className='flex flex-1 items-start'>
			<table className='flex-1 table table-compact border-t-4 border-slate-400 bg-neutral-focus'>
				<thead>
					<tr>
						<th>#</th>
						<th>Type</th>
					</tr>
				</thead>
				<tbody>
					{actions.map((action, i) => {
						return (
							<tr
								key={action.id}
								id={action.id}
								data-actionid={action.id}
								data-actionname={action.type}
								className={`table-row hover hover:cursor-pointer ${
									action.id === activeRowId ? "border-2 border-white" : null
								}`}
								onClick={(e) => selectHandler(e, action, selectedTab)}
							>
								<td className='table-cell bg-neutral-focus'>{i + 1}.</td>
								<td className='table-cell bg-neutral-focus'>{action.type}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
