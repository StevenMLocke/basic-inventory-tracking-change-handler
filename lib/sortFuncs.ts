export function tableSort(items: Array<object>, col:string, direction: Boolean):Array<object> {
	return items.sort((a, b) => {
		if (a[col] > b[col]) return direction ? 1 : -1
		if (a[col] < b[col]) return direction ? -1 : 1
		return 0
	})
}