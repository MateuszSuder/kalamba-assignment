import React from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import ArticleList from "./ArticleList";
import {AuthProvider} from "../../context/AuthContext";
import {wait} from "@testing-library/user-event/dist/utils";

test("renders conduit link", () => {
	render(
		<AuthProvider>
			<ArticleList />
		</AuthProvider>
	);

	const linkElement = screen.getAllByText(/conduit/i)[0];
	expect(linkElement).toBeInTheDocument();
});

test("renders list of articles", async () => {
	render(
		<AuthProvider>
			<ArticleList />
		</AuthProvider>
	);

	await waitFor(() => {
		screen.getByText("Trump Put a Right-Wing Radio Host in Charge of a National Park. Emails Show the Chaos That Ensued.");
	})
})

test("click on article redirects to article", async () => {
	render(
		<AuthProvider>
			<ArticleList />
		</AuthProvider>
	);

	await waitFor(() => {
		const header = screen.getByText("Trump Put a Right-Wing Radio Host in Charge of a National Park. Emails Show the Chaos That Ensued.");
		expect(header.closest("a")).toHaveAttribute("href", "/#/michael-savage-donald-trump-presidio-trust-san-francisco")
	})
})