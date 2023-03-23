import UsersClientWrapper from './components/UsersClientWrapper'
import { getUsers } from './lib/user'

export default async function User() {
	const users = await getUsers()
	return (
		<>
			<UsersClientWrapper users={users}></UsersClientWrapper>
		</>
	)
}