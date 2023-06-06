import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import SideBar from '@/components/sideBar'
import { Main } from '@/components/main'
import { Suspense } from 'react'
import { Raleway } from 'next/font/google'
import { PageWrapper } from '@/components/structures'

export const metadata = {
	title: 'Basic Inventory Tracking Change Handler',
	description: 'An app to track inventory change',
}

const raleway = Raleway({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-raleway'
})

export default async function RootLayout({ children }) {
	const session = await getServerSession(authOptions)
	return (
		<html lang="en" data-theme="dark" className={`${raleway.variable}`}>
			<body className='min-h-[100cqh] transition-all duration-500 @container'>
				<PageWrapper>
					{session && <SideBar session={session}>
					</SideBar>}
					<Main>
						<Suspense fallback={<div>One Moment...</div>}>
							{children}
						</Suspense>
					</Main>
				</PageWrapper>
			</body>
		</html>
	)
}