import SectionHero from "@/components/sectionHero";

export function PageWrapper({ children }) {
	return (
		<div className='page-wrapper flex flex-col sm:flex-row h-[100cqh] 2xl:w-5/6 mx-auto @container'>
			{children}
		</div>
	);
}

export function ContentWrapper({ heroText, children }) {
	return (
		<div className='content-wrapper @container flex flex-col min-w-full'>
			<SectionHero title={heroText}></SectionHero>
			<div className='w-full flex flex-col h-[100cqh] justify-between pt-2 overflow-hidden'>
				{children}
			</div>
		</div>
	);
}
