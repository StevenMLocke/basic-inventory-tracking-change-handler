import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

export async function getData(url, options) {
	const cStore = cookies()
	const cookees = cStore.getAll()
	const req = new NextRequest(url)

	cookees.forEach(cookie => {
		req.cookies.set(cookie.name, cookie.value)
	})

	const res = await fetch(req, options)

	return res.json()
}

export async function postData(url, data) {
	const cStore = cookies()
	const cookees = cStore.getAll()
	const req = new NextRequest(url)

	cookees.forEach(cookie => {
		req.cookies.set(cookie.name, cookie.value)
	})

	const res = await fetch(req, {
		method: "POST",
		body: JSON.stringify(data),
		next: { revalidate: 0 }
	});

	return res.json()
}