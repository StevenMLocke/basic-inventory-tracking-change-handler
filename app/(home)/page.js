import SectionHero from '@/components/sectionHero'
import { SignInButton, SignOutButton } from '@/components/logButtons'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function Home() {
	const session = await getServerSession(authOptions)
	return (

		<div className='flex flex-col min-w-full items-center'>
			<SectionHero className='self-start' title={`Basic Inventory Tracking Change Handler`}></SectionHero>
			<div className='flex flex-1 min-w-full min-h-full flex-wrap justify-center gap-4 p-4'>
				{!session && <SignInButton buttonText={'Sign In'}></SignInButton>}
			</div>
		</div>

	)
}
