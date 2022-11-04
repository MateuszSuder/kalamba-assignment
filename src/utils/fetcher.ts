import {HttpMethods} from "../types/HttpMethods";

export default async function fetcher<T>(url: string, method: HttpMethods): Promise<T> {
	console.log(process.env);
	const response = await fetch(`${process.env.REACT_APP_API}${url}`, {
		method
	})

	if (!response.ok) {
		throw new Error('Error while fetching data')
	} else {
		return response.json()
	}
}