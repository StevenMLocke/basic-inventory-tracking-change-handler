import SectionHero from "@/components/sectionHero";

export default function ClientWrapper({ tabs, itemForm, itemsTable }) {
	return (
		<div className='flex flex-col min-w-full'>
			<SectionHero title={"heroTitle"}></SectionHero>
			<div className='flex flex-1 pt-4'>
				<div className='flex flex-col items-center flex-initial basis-1/4'>
					Tabs {tabs}
					<div className='tabs-content flex flex-col items-center w-full'>
						Form {itemForm}
					</div>
				</div>
				<div className='divider divider-horizontal h-[90%] my-auto'></div>
				Table {itemsTable}
			</div>
		</div>
	);
}
