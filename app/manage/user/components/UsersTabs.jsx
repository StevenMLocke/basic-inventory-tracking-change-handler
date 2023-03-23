export default function UsersTabs({ clickHandler, selectedTabNum }) {
	return (
		<div className='tabs flex justify-center min-w-full '>
			<a
				data-num={1}
				className={`tab tab-bordered ${
					selectedTabNum == 1 && "tab-active tab-lifted tab-border-2 "
				}`}
				onClick={clickHandler}
			>
				Create
			</a>
			<a
				data-num={2}
				className={`tab tab-bordered ${
					selectedTabNum == 2 && "tab-active tab-lifted tab-border-2 "
				}`}
				onClick={clickHandler}
			>
				Edit
			</a>
			<a
				data-num={3}
				className={`tab tab-bordered ${
					selectedTabNum == 3 && "tab-active tab-lifted tab-border-2"
				}`}
				onClick={clickHandler}
			>
				Remove
			</a>
		</div>
	);
}
