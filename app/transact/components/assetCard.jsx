export function AssetCard({ asset, clickHandler, buttonText }) {
	return (
		<div
			className={`card card-bordered bg-base-300 shadow-md shadow-slate-200`}
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
					{asset.user && (
						<li>
							<h2 className='card-title'>Checked Out to:</h2>
							<div className='flex'>
								<div className='divider divider-horizontal mx-0'></div>
								<div className='flex flex-col'>
									<ul>
										<li className='prose-sm'>
											Name:{" "}
											<span className='prose-base'>
												{asset?.user?.full_name}
											</span>
										</li>
										<li className='prose-sm'>
											Email:{" "}
											<span className='prose-base'>{asset?.user?.email}</span>
										</li>
									</ul>
								</div>
							</div>
						</li>
					)}
					<li>
						<div className='card-actions'>
							<button
								className={`btn btn-primary btn-sm bg-inherit btn-outline`}
								onClick={() => {
									clickHandler(asset);
								}}
							>
								{buttonText}
							</button>
						</div>
					</li>
				</ul>
				<div className='divider divider-horizontal mx-0'></div>
				<ul className='flex flex-col gap-4'>
					<li>
						<h2 className='card-title'>Manufacturer:</h2>
						<div className='flex'>
							<div className='divider divider-horizontal mx-0'></div>
							<p>{asset?.model.manufacturer.name ?? "999999"}</p>
						</div>
					</li>
					<li>
						<h2 className='card-title'>Model:</h2>
						<div className='flex'>
							<div className='divider divider-horizontal mx-0'></div>
							<p>{asset?.model.name ?? "999999"}</p>
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
