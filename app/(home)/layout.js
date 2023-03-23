import SideBar from './../../components/SideBar'
import { Main } from './../../components/Main'
import Link from 'next/link'

export default function HomeLayout({ children }) {
	return (
		<div className="page-wrapper border-2 border-white flex h-[100cqh] md:w-5/6 mx-auto">
			<SideBar>
				<ul className='menu menu-compact'>
					<li>
						<Link href={'/'}>Home</Link>
					</li>
					<li>
						<Link href={'/manage/'}>Manage</Link>
					</li>
				</ul>
			</SideBar>
			<Main>{children}</Main>
		</div>
	)
}