export default function SideBar({ children }) {
	return (
		<aside className='md:w-1/6 border-r-2 border-slate-400 flex flex-col gap-2 p-2 bg-base-300'>
			{children}
		</aside>
	);
}
