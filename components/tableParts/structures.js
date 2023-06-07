export function TableWrapper({ children }) {
	return (
		<div className='
						tableWrapper
						flex
						items-start
						overflow-y-auto
						w-full
						scroll-smooth'>
			{children}
		</div>
	)
}