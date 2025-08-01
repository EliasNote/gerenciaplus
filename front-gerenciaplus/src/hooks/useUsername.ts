/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase-browser";
import { buscarProfilePorId } from "@/services/loja.service";

export function useUsername() {
	const [username, setUsername] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUsername() {
			const supabase = createClient();
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				try {
					const profile = await buscarProfilePorId(user.id);
					setUsername(profile.username);
				} catch (e) {
					setUsername(null);
				}
			}
		}
		fetchUsername();
	}, []);

	return username;
}
