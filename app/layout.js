import { Main } from '@/components/main'
import SideBar from '@/components/sideBar'
import { Suspense } from 'react'
import './globals.css'

export const metadata = {
	title: 'Basic Inventory Tracking Change Handler',
	description: 'An app to track inventory change',
}

export default async function RootLayout({ children }) {
	return (
		<html lang="en" data-theme="dracula">
			<body className='transition-all duration-300'>
				<div className="page-wrapper flex h-[100cqh] md:w-5/6 mx-auto">
					<SideBar>
					</SideBar>
					<Main>
						<Suspense fallback={<div>One Moment...</div>}>
							{children}
						</Suspense>
					</Main>
				</div>
			</body>
		</html>
	)
}