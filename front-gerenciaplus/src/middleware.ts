import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/finances", "/inventory"];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	const cookies = request.cookies.getAll();
	const hasSupabaseSession = cookies.some(
		(cookie) =>
			cookie.name.startsWith("sb-") && cookie.name.includes("auth-token")
	);

	if (
		protectedRoutes.some((route) => pathname.startsWith(route)) &&
		!hasSupabaseSession
	) {
		const loginUrl = new URL("/login", request.url);
		return NextResponse.redirect(loginUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/dashboard",
		"/finances",
		"/inventory",
		"/login",
		"/cadastro",
		"/reset",
	],
};
