import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Next 15: await cookies() internally; expose getAll to Supabase
export const createClient = async () => {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
	const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
	const cookieStore = await cookies();

	return createServerClient(supabaseUrl, supabaseKey, {
		cookies: {
			getAll: () => {
				const all = cookieStore.getAll();
				if (!all || all.length === 0) return [];
				return all.map(({ name, value }) => ({ name, value }));
			},
		},
	});
};
