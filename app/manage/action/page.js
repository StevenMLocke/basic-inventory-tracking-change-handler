import { getData } from '@/lib/helpers'
import ActionClientWrapper from './components/actionClientWrapper'

export default async function Page() {
	const actions = await getData('http://localhost:3000/api/action/get')

	return (
		<ActionClientWrapper actions={actions}></ActionClientWrapper>
	)
}