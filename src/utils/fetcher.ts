import {HttpMethods} from "../types/HttpMethods";

export default async function fetcher<T>(url: string, method: HttpMethods, body?: Record<string, unknown>): Promise<T> {
	let token = "";

	if(sessionStorage.getItem("token")) {
		token = `Token: ${sessionStorage.getItem("token")}`;
	}

	const response = await fetch(`${process.env.REACT_APP_API}${url}`, {
		method,
		body: JSON.stringify(body),
		headers: {
			"Content-type": "application/json",
			Authorization: token
		}
	})

	if (!response.ok) {
		throw new Error('Error while fetching data')
	} else {
		return response.json()
	}
}