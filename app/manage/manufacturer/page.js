import { getData } from '@/lib/helpers'
import ManufacturerClientWrapper from './components/maufacturerClientWrapper'

export default async function Page() {
	const manufacturers = await getData('http://localhost:3000/api/manufacturer/get/manufacturers')
	return (
		<ManufacturerClientWrapper manufacturers={manufacturers}></ManufacturerClientWrapper>
	)
}