import ClientWrapper from '@/components/mgmtClientWrapper'
import { getData } from '@/lib/helpers'
import { Suspense } from 'react'

export default async function Page() {
	const data = await getData('http://localhost:3000/api/model/get/models')
	const tableData = data.map((item) => {
		return {
			id: item.id,
			name: item.name,
			manufacturer: item.manufacturer.name
		}
	})

	const selectData = data.map((item) => {
		return {
			id: item.id,
			name: `${item.manufacturer.name} - ${item.name}`
		}
	})

	const inputTextArray = [{ id: 'model', name: 'model' }, { id: 'manufacturer', name: 'manufacturer' }]
	const inputSelectArray = [{ id: 'model', type: 'modeL', data: selectData }]

	return (
		<>
			hi
		</>
	)
}