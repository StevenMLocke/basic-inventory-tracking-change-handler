import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import SideBar from '@/components/sideBar'
import { Main } from '@/components/main'
import { Suspense } from 'react'

export const metadata = {
	title: 'Basic Inventory Tracking Change Handler',
	description: 'An app to track inventory change',
}

export default async function RootLayout({ children }) {
	const session = await getServerSession(authOptions)
	return (
		<html lang="en" data-theme="dracula">
			<body className='min-h-[100cqh] transition-all duration-500'>
				<div className="page-wrapper flex h-[100cqh] md:w-5/6 mx-auto">
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