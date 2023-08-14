"use client";
import { useState } from "react";

export default function Accordion({ title, children }) {
	const [expanded, setExpanded] = useState(false);

	const clickHandler = () => setExpanded((p) => !p);

	return (
		<>
			<div
				className='flex'
				onClick={clickHandler}
			>
				<div className='flex flex-1 justify-between'>
					<div className='font-bold'>{title}</div>
					<div className='text-2xl font-bold ml-auto mr-2'>
						{expanded ? ` -` : ` +`}
					</div>
				</div>
			</div>
			<div
				className={`flex transition-max-height
						${expanded && "max-h-[18rem]"}
						${!expanded && "max-h-0"}
						overflow-hidden
					`}
			>
				<div className='divider divider-horizontal mx-0'></div>
				{children}
			</div>
		</>
	);
}
