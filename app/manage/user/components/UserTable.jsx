export default function UsersTable({
	users,
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
						<th>First Name</th>
						<th>Last Name</th>
						<th>Email</th>
						<th>edit</th>
						<th>remove</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user, i) => {
						return (
							<tr
								key={user.id}
								id={user.id}
								data-userid={user.id}
								data-userfn={user.fn}
								data-userln={user.ln}
								data-useremail={user.email}
								className={`table-row hover hover:cursor-pointer ${
									user.id === activeRowId ? "border-2 border-white" : null
								}`}
								onClick={(e) => selectHandler(e, user, selectedTab)}
							>
								<td className='table-cell bg-neutral-focus'>{i + 1}.</td>
								<td className='table-cell bg-neutral-focus'>{user.fn}</td>
								<td className='table-cell bg-neutral-focus'>{user.ln}</td>
								<td className='table-cell bg-neutral-focus'>{user.email}</td>
								<td className='table-cell bg-neutral-focus'>
									<button className='btn btn-circle btn-outline'>edit</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
