import SectionHero from '@/components/sectionHero'

export default async function Home() {
	return (

		<div className='flex flex-col min-w-full items-center'>
			<SectionHero className='self-start' title={`Basic Inventory Tracking Change Handler`}></SectionHero>
			<div className='flex flex-1 min-w-full min-h-full flex-wrap justify-center gap-4 p-4'>
			</div>
		</div>

	)
}
