export default function SectionHero({ title }) {
	return (
		<div className='hero bg-base-200'>
			<div className='hero-content text-center'>
				<div className='max-w-md'>
					<h1 className='text-5xl font-bold'>{title}</h1>
				</div>
			</div>
		</div>
	);
}
