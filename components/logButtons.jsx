"use client";
import { signIn, signOut } from "next-auth/react";

export function SignInButton({ buttonText, className }) {
	return (
		<button
			className={`btn btn-primary btn-sm bg-inherit btn-outline ${className}`}
			onClick={(e) => {
				e.preventDefault();
				signIn("google", { callbackUrl: "http://localhost:3000/" });
			}}
		>
			{buttonText}
		</button>
	);
}

export function SignOutButton({ buttonText, className }) {
	return (
		<button
			className={`btn btn-primary btn-sm bg-inherit btn-outline ${className}`}
			onClick={(e) => {
				e.preventDefault();
				signOut({ callbackUrl: "http://localhost:3000/" });
			}}
		>
			{buttonText}
		</button>
	);
}
