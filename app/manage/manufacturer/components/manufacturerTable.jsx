export default function ManufacturersTable({
	manufacturers,
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
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{manufacturers.map((manufacturer, i) => {
						return (
							<tr
								key={manufacturer.id}
								id={manufacturer.id}
								data-manufacturerid={manufacturer.id}
								data-manufacturername={manufacturer.name}
								className={`table-row hover hover:cursor-pointer ${
									manufacturer.id === activeRowId
										? "border-2 border-white"
										: null
								}`}
								onClick={(e) => selectHandler(e, manufacturer, selectedTab)}
							>
								<td className='table-cell bg-neutral-focus'>{i + 1}.</td>
								<td className='table-cell bg-neutral-focus'>
									{manufacturer.name}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
