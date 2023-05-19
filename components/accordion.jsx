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
					<div className='flex flex-1 gap-2 justify-between'>
						<div className='prose-xl font-semibold'>{title}</div>
						<div className=' prose-2xl font-bold ml-auto mr-2'>
							{expanded ? ` -` : ` +`}
						</div>
					</div>
				</div>
				<div
					className={`flex transition-max-height
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
