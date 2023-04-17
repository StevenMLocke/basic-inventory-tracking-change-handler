export function Main({ children }) {
	return (
		<main className='content-wrapper @container flex flex-1 p-4 bg-base-100 overflow-y-auto border-2 border-yellow-300'>
			{children}
		</main>
	);
}
