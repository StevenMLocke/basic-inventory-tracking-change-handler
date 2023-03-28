import ModelClientWrapper from './components/modelClientWrapper'
import { getData } from '@/lib/helpers'

export default async function Page() {
	const models = await getData('http://localhost:3000/api/model/get/models')
	const manufacturers = await getData('http://localhost:3000/api/manufacturer/get/manufacturers', { next: { revalidate: 30 } })

	return (
		<ModelClientWrapper models={models} manufacturers={manufacturers}></ModelClientWrapper>
	)
}