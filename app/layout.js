import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import SideBar from '@/components/sideBar'
import { Main } from '@/components/main'
import { Suspense } from 'react'
import { Raleway } from 'next/font/google'

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
			<body className='min-h-[100cqh] transition-all duration-500'>
				<div className="page-wrapper flex flex-col sm:flex-row h-[100cqh] 2xl:w-5/6 mx-auto">
					{session && <SideBar>
					</SideBar>}
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