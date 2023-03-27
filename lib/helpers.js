export async function getData(url, options = {
	next: { revalidate: 0 },
	cache: 'no-store'
}) {
	const res = await fetch(url, options)

	return res.json()
}

export async function postData(url, data) {
	const res = await fetch(url, {
		method: "POST",
		body: JSON.stringify(data),
		next: { revalidate: 0 }
	});

	return res.json()
}