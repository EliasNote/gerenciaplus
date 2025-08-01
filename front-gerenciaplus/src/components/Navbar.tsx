"use client";
import { useUsername } from "@/hooks/useUsername";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
	const username = useUsername();
	const pathname = usePathname();
	const [configOpen, setConfigOpen] = useState(false);

	const NavButton = ({ text, href }: { text: string; href: string }) => {
		const isActive = pathname === href;
		return (
			<Link href={href} className="group relative">
				<button className="relative px-[10px] py-[10px] font-semibold cursor-pointer">
					{text}
					<span
						className={`absolute bottom-0 left-0 h-[4px] w-0 bg-white duration-200 ${
							isActive ? "w-full" : "w-0"
						} group-hover:w-full`}
					></span>
				</button>
			</Link>
		);
	};

	return (
		<nav className="flex flex-row items-center w-full bg-primary h-[70px] sticky px-[20px] justify-between">
			<Image src="/logo.svg" alt="Logo" width={40} height={40} />
			<div className="flex flex-row gap-[10px]">
				<NavButton text="Dashboard" href="/dashboard" />
				<NavButton text="Finanças" href="/finances" />
				<NavButton text="Estoque" href="/inventory" />
			</div>
			<div className="flex flex-row gap-[10px]">
				<p>{username}</p>
				<div
					className="relative w-[26px] h-[26px] group cursor-pointer"
					onClick={() => setConfigOpen((open) => !open)}
				>
					<Image
						src="/gear.svg"
						alt="Configurações"
						width={26}
						height={26}
						className={`absolute top-0 left-0 transition-opacity duration-200 ${
							configOpen ? "opacity-0" : "group-hover:opacity-0"
						}`}
					/>
					<Image
						src="/gear-hover.svg"
						alt="Configurações Hover"
						width={26}
						height={26}
						className={`absolute top-0 left-0 opacity-0 transition-opacity duration-200 ${
							configOpen ? "opacity-100" : "group-hover:opacity-100"
						}`}
					/>
					<div
						className={`flex flex-col gap-1 items-baseline absolute top-full translate-y-[20px] w-[160px] right-[-20px] rounded-[3px] mt-1 shadow-md origin-top duration-200 ${
							configOpen ? "scale-y-100" : "scale-y-0"
						} bg-primary`}
					>
						<button className="cursor-pointer p-4 flex flex-row gap-2 hover:bg-[#0080ff] w-full">
							<Image
								src="/gear.svg"
								alt="Configurações"
								width={26}
								height={26}
							/>
							Configurações
						</button>
						<hr className="border-t border-[#6194c7] w-full m-[-6px]" />
						<button className="cursor-pointer p-4 flex flex-row gap-2 hover:bg-red-500 w-full">
							<Image src="/logout.svg" alt="Sair" width={26} height={26} />
							Sair
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
