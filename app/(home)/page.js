import SectionHero from '@/components/sectionHero'
import { SignInButton, SignOutButton } from '@/components/logButtons'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function Home() {
	const session = await getServerSession(authOptions)
	return (

		<div className='flex flex-col min-w-full items-center'>
			<SectionHero className='self-start' title={`Basic Inventory Tracking Change Handler`}></SectionHero>
			{!session && <div className=' flex flex-1 items-center'>
				<SignInButton buttonText={'Sign In'}></SignInButton>
			</div>}
			<pre>{JSON.stringify(session, null, 2)}</pre>
		</div>

	)
}
