import { getData } from '@/lib/helpers'
import MgmtClientWrapper from '@/components/mgmtClientWrapper'

export default async function Page() {
	const users = await getData('http://localhost:3000/api/user/get/users')

	return (
		<>
			<MgmtClientWrapper
				items={users}
				heroTitle={'Users'}
				managedItemType={'user'} //should match api endpoint name
			></MgmtClientWrapper>
		</>
	)
}