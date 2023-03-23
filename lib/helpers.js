export async function getData(url) {
	const res = await fetch(url, {
		next: { revalidate: 0 },
		cache: 'no-store'
	})

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