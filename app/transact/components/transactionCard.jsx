export function TransactionCard({ action, rowDate, asset, user, transactor }) {
	return (
		<div
			className={`card card-bordered bg-base-300 shadow-sm shadow-slate-200`}
		>
			<div className='card-body flex-row gap-4'>
				<ul className='flex flex-col gap-4'>
					<li>
						<h2 className='card-title'>Asset Number:</h2>
						<div className='flex'>
							<div className='divider divider-horizontal mx-0'></div>
							<p>{asset?.asset_number ?? "999999"}</p>
						</div>
					</li>

					<li>
						<h2 className='card-title'>{action ?? "pooped"}:</h2>
						<div className='flex'>
							<div className='divider divider-horizontal mx-0'></div>
							<div className='flex flex-col'>
								<ul>
									<li>
										Date:{" "}
										<span className='prose-base'>
											{new Date(rowDate).toLocaleDateString("en-us", {
												year: "numeric",
												month: "short",
												day: "numeric",
											})}
										</span>
									</li>
									{transactor && (
										<li>
											By: <span className='prose-base'>{transactor}</span>
										</li>
									)}
									{user && (
										<li className='prose-small'>
											To:
											<div className='flex'>
												<div className='divider divider-horizontal mx-0'></div>
												<ul className='list-inside'>
													<li className='prose-sm list-item'>
														<span className='prose-base'>
															{user?.full_name}
														</span>
													</li>
													<li className='prose-sm list-item'>
														<span className='prose-base'>{user?.email}</span>
													</li>
												</ul>
											</div>
										</li>
									)}
								</ul>
							</div>
						</div>
					</li>
				</ul>
				<div className='divider divider-horizontal mx-0'></div>
				<ul className='flex flex-col gap-4'>
					<li>
						<h2 className='card-title'>Manufacturer:</h2>
						<div className='flex'>
							<div className='divider divider-horizontal mx-0'></div>
							<p>{asset?.model?.manufacturer.name ?? "999999"}</p>
						</div>
					</li>
					<li>
						<h2 className='card-title'>Model:</h2>
						<div className='flex'>
							<div className='divider divider-horizontal mx-0'></div>
							<p>{asset?.model?.name ?? "999999"}</p>
						</div>
					</li>
					<li>
						<h2 className='card-title'>Serial:</h2>
						<div className='flex'>
							<div className='divider divider-horizontal mx-0'></div>
							<p>{asset?.serial_number ?? "999999"}</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}
