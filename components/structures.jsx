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
		<div className='content-wrapper flex flex-col flex-1 min-w-full items-center overflow-y-auto'>
			<SectionHero title={heroText}></SectionHero>
			<div className='flex flex-col flex-1 justify-between'>{children}</div>
		</div>
	);
}
