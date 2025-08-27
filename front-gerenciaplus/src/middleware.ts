import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const protectedRoutes = ["/dashboard", "/finances", "/inventory"];
const authPages = ["/login", "/cadastro"];

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const response = NextResponse.next();

	// Supabase SSR: handle cookies read/write in middleware (allowed context)
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll: () => {
					const all = request.cookies.getAll();
					return all?.map(({ name, value }) => ({ name, value })) ?? [];
				},
				setAll: (items) => {
					for (const { name, value, options } of items) {
						// Next allows writing cookies in middleware via response
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						(response.cookies as any).set(name, value, options as any);
					}
				},
			},
		}
	);

	// Touch auth state to allow SSR to refresh cookies if needed
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const isProtected = protectedRoutes.some((route) =>
		pathname.startsWith(route)
	);
	const isAuthPage = authPages.some((route) => pathname.startsWith(route));

	if (isProtected && !user) {
		const loginUrl = new URL("/login", request.url);
		return NextResponse.redirect(loginUrl);
	}

	if (isAuthPage && user) {
		const dashboardUrl = new URL("/dashboard", request.url);
		return NextResponse.redirect(dashboardUrl);
	}

	return response;
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
