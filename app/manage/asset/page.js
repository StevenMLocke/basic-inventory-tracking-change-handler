import { getData } from "@/lib/helpers"
import AssetClientWrapper from './components/assetClientWrapper'

export default async function Page() {
	const assets = await getData('http://localhost:3000/api/asset/get')
	return (
		<AssetClientWrapper assets={assets}></AssetClientWrapper>
	)
}