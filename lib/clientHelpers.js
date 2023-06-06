
export function dateToString(dateObject) {
	const dateObj = new Date(`${dateObject} gmt-0400`);
	return dateObj.toLocaleDateString("en-us", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

export async function postData(url, data) {
	const res = await fetch(url, {
		method: "POST",
		body: JSON.stringify(data),
		next: { revalidate: 0 },
	});

	return res.json();
}