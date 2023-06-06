export function TableWrapper({ children }) {
	return (
		<div className='tableWrapper flex items-start overflow-y-auto min-w-full max-h-[100cqh] scroll-smooth'>
			{children}
		</div>
	)
}