"use client";
import { useState } from "react";

export default function Accordion({ title, children }) {
	const [expanded, setExpanded] = useState(false);

	const clickHandler = () => setExpanded((p) => !p);

	return (
		<>
			<div className='menu'>
				<div
					className='flex'
					onClick={clickHandler}
				>
					<div>{title}</div>
					<div className='ml-auto mr-2'>{expanded ? "-" : "+"}</div>
				</div>
				<div
					className={`flex transition-max-height duration-700
						${expanded && "max-h-[16rem]"}
						${!expanded && "max-h-0"}
						overflow-hidden
					`}
				>
					<div className='divider divider-horizontal mx-0'></div>
					{children}
				</div>
			</div>
		</>
	);
}
