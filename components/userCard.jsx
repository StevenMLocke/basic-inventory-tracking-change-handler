"use client";
import Image from "next/image";
import { SignOutButton } from "./logButtons";
import { useState } from "react";
import { Flipper, Flipped } from "react-flip-toolkit";

export function UserCard({ name, email, picUrl }) {
	const [opened, setOpened] = useState(false);
	return (
		<Flipper
			flipKey={opened}
			spring={"noWobble"}
		>
			<Flipped flipId={"card"}>
				<div
					className={`${!opened && "max-h-20 max-w-[5rem] overflow-hidden"}
							card card-side card-compact card-bordered flex bg-base-100 transition-max-height`}
					onClick={() => {
						setOpened((p) => !p);
					}}
				>
					<Flipped flipId={"figure"}>
						<figure>
							<Flipped
								flipId={"pic"}
								inverseFlipId={"card"}
							>
								<Image
									src={picUrl}
									alt={"this person"}
									width={1000}
									height={1000}
									className='h-full w-full'
								></Image>
							</Flipped>
						</figure>
					</Flipped>
					<Flipped flipId={"cardBody"}>
						<div
							className={`
									${opened && "card-body"}
									${!opened && " flex flex-0 max-w-0 overflow-hidden"}
								`}
						>
							<h2 className={`card-title`}>{name}</h2>
							<p className={``}>{email}</p>
							<div className='card-actions justify-end'>
								<SignOutButton
									className='btn-xs'
									buttonText={"Sign Out"}
								></SignOutButton>
							</div>
						</div>
					</Flipped>
				</div>
			</Flipped>
		</Flipper>
	);
}
