"use client";

import { ClerkProvider, useClerk, useUser } from "@clerk/nextjs";
import "../globals.css";
import {
	ImageIcon,
	LayoutDashboardIcon,
	LogOutIcon,
	MenuIcon,
	Share2Icon,
	UploadCloudIcon,
} from "lucide-react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
const sidebarItems = [
	{ href: "/home", icon: LayoutDashboardIcon, label: "Home Page" },
	{ href: "social-share", icon: Share2Icon, label: "Social Share" },
	{ href: "/video-upload", icon: UploadCloudIcon, label: "Video Upload" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const pathname = usePathname();
	const { signOut } = useClerk();
	const { user } = useUser();
	const router = useRouter();

	const handleLogoClick = () => {
		router.push("/");
	};

	const handleSignOut = async () => {
		await signOut();
	};

	return (
		<ClerkProvider>
			<div className="drawer lg:drawer-open">
				<input
					id="sidebar-drawer"
					type="checkbox"
					className="drawer-toggle"
					checked={sidebarOpen}
					onChange={() => setSidebarOpen(!sidebarOpen)}
				/>
				<div className="drawer-content flex flex-col">
					<header className="w-full bg-base-200">
						<div className="navbar max-w-7xl mx-auto px-4 sm:pm-6 lg:px-8">
							<div className="flex-none lg:hidden">
								<label
									htmlFor="sidebar-drawer"
									className="btn btn-square btn-ghost drawer-button">
									<MenuIcon />
								</label>
							</div>
							<div className="flex-1">
								<Link href="/" onClick={handleLogoClick}>
									<div className="btn btn-ghost normal-case text-2xl">
										ByteSize Showcase
									</div>
								</Link>
							</div>
							<div className="flex-none flex items-center space-x-4">
								{user && (
									<>
										<div className="avatar">
											<div className="w-8 h-8 rounded-full">
												<Image
													src={user.imageUrl}
													alt={
														user.username || user.emailAddresses[0].emailAddress
													}
													width={500}
													height={500}
												/>
											</div>
										</div>
										<span className="text-sm truncate max-w-xs lg:max-w-md">
											{user.username || user.emailAddresses[0].emailAddress}
										</span>
										<button
											className="btn btn-ghost btn-circle"
											onClick={handleSignOut}>
											<LogOutIcon className="h-6 w-6" />
										</button>
									</>
								)}
							</div>
						</div>
					</header>
					<main className="flex-grow">
						<div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-8">
							{children}
						</div>
					</main>
				</div>
				<div className="drawer-side">
					<label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
					<aside className="bg-base-200 w-64 h-full flex flex-col">
						<div className="flex items-center justify-center py-4">
							<ImageIcon className="w-10 h-10 text-primary" />
						</div>
						<ul className="menu p-4 w-full text-base-content flex-grow">
							{sidebarItems.map((item) => (
								<li key={item.href} className="mb-2">
									<Link
										href={item.href}
										className={`flex items-center space-x-4 px-4 py-2 rounded-lg ${
											pathname === item.href
												? "bg-primary text-white"
												: "hover:bg-base-300"
										}`}
										onClick={() => setSidebarOpen(false)}>
										<item.icon className="w-6 h-6" />
										<span>{item.label}</span>
									</Link>
								</li>
							))}
						</ul>
						{user && (
							<div className="p-4">
								<button
									onClick={handleSignOut}
									className="btn btn-outline btn-error w-full">
									<LogOutIcon className="mr-2 h-5 w-5" />
									Sign Out
								</button>
							</div>
						)}
					</aside>
				</div>
			</div>
		</ClerkProvider>
	);
}
