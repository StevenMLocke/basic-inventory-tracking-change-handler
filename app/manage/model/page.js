import ModelClientWrapper from './components/modelClientWrapper'
import { getModels } from './lib/model'

export default async function Page() {
	const models = await getModels()
	return (
		<ModelClientWrapper models={models}></ModelClientWrapper>
	)
}