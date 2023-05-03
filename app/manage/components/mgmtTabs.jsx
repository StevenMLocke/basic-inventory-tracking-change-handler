export default function MgmtTabs({ clickHandler, selectedTabNum, role }) {
	return (
		<div className='tabs flex justify-center min-w-full'>
			<a
				data-num={1}
				className={`tab tab-lg tab-bordered flex-1 ${
					selectedTabNum == 1 && "tab-active tab-lifted tab-border-2 "
				}`}
				onClick={clickHandler}
			>
				Create
			</a>
			<a
				data-num={2}
				className={`tab tab-lg tab-bordered flex-1 ${
					selectedTabNum == 2 && "tab-active tab-lifted tab-border-2 "
				}`}
				onClick={clickHandler}
			>
				Edit
			</a>
			{role === "admin" && (
				<a
					data-num={3}
					className={`tab tab-lg tab-bordered flex-1 ${
						selectedTabNum == 3 && "tab-active tab-lifted tab-border-2"
					}`}
					onClick={clickHandler}
				>
					Remove
				</a>
			)}
		</div>
	);
}
