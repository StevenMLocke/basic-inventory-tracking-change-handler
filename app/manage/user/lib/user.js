export async function getUsers() {
	const res = await fetch("http://localhost:3000/api/user/get/users", {
		next: { revalidate: 0 },
		cache: 'no-store'
	});
	return res.json()
}

export async function removeUser(userId) {
	const res = await fetch("http://localhost:3000/api/user/remove", {
		method: "POST",
		body: JSON.stringify(userId),
	});
	return res.json()
}

export async function createUser(user) {
	const res = await fetch("http://localhost:3000/api/user/create/", {
		method: "POST",
		body: JSON.stringify(user),
		next: { revalidate: 0 }
	});

	return res.json()
}

export async function editUser(user) {
	const res = await fetch("http://localhost:3000/api/user/edit", {
		method: "POST",
		body: JSON.stringify(user),
		next: { revalidate: 0 }
	})

	return res.json()
}