"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";

export function useRequireAuth(redirectTo = "/login") {
	const router = useRouter();

	useEffect(() => {
		const supabase = createClient();
		supabase.auth.getUser().then(({ data: { user } }) => {
			if (!user) {
				router.replace(redirectTo);
			}
		});
	}, [router, redirectTo]);
}
