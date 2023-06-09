export function ErrorAlert({ errorText, dismissHandler }) {
	return (
		<div
			className='w-full h-full absolute z-20 backdrop-blur-sm'
			onClick={dismissHandler}
		>
			<div
				className='alert alert-error shadow-lg absolute z-30 my-auto prose-2xl'
				onClick={dismissHandler}
			>
				<div>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='stroke-current flex-shrink-0 h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
					<span>{errorText}</span>
				</div>
			</div>
		</div>
	);
}

export function InfoAlert({ infoText, dismissHandler }) {
	return (
		<div
			className='w-full h-full absolute z-20 backdrop-blur-sm'
			onClick={dismissHandler}
		>
			<div
				className='alert alert-success shadow-lg absolute z-30 my-auto prose-2xl'
				onClick={dismissHandler}
			>
				<div>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='stroke-current flex-shrink-0 h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
					<span>{infoText}</span>
				</div>
			</div>
		</div>
	);
}

export function Alerts({ error, info, dismissHandler }) {
	return (
		<>
			{error && (
				<ErrorAlert
					dismissHandler={dismissHandler}
					errorText={error}
				></ErrorAlert>
			)}
			{info && (
				<InfoAlert
					dismissHandler={dismissHandler}
					infoText={info}
				></InfoAlert>
			)}
		</>
	);
}
