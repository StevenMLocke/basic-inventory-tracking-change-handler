import Link from "next/link";

export function LinkButton({ url, buttonText }) {
	return (
		<Link
			href={url}
			className='btn btn-outline btn-primary hover:btn-secondary rounded-md shadow-md shadow-white'
		>
			{buttonText}
		</Link>
	);
}
