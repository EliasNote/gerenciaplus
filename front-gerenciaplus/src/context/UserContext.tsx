"use client";

import React, { createContext, useContext, useState } from "react";
import type { Profile } from "@/app/inventory/columns";

type UserContextValue = {
	profile?: Profile;
	setProfile: (p?: Profile) => void;
};

const UserContext = createContext<UserContextValue>({
	profile: undefined,
	setProfile: () => {},
});

export function UserProvider({
	children,
	initialProfile,
}: {
	children: React.ReactNode;
	initialProfile?: Profile;
}) {
	const [profile, setProfile] = useState<Profile | undefined>(initialProfile);

	return (
		<UserContext.Provider value={{ profile, setProfile }}>
			{children}
		</UserContext.Provider>
	);
}

export const useUser = () => useContext(UserContext);
