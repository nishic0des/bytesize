"use client";
import { HomeIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const handleHomeClick = () => {
		router.push("/home");
	};
	return (
		<div className="relative min-h-screen w-full">
			{/* Background Image with Overlay */}
			<div className="fixed inset-0 -z-10">
				<Image
					src="/bystesize.webp"
					alt="Background"
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-black/50"></div>
			</div>

			<div className="flex flex-row items-center  z-10 min-h-screen p-8 pb-20 sm:p-20">
				<main className="flex flex-col items-center justify-center sm:items-start w-full">
					{/* Header with Welcome and HomeIcon */}

					{/* Main Content */}
					<div className="w-full flex flex-col items-center">
						<div className="w-175 flex flex-row justify-around">
							<p>Wecolme to</p>
							<button
								onClick={handleHomeClick}
								className="p-1 hover:bg-white/10 rounded-md transition-colors"
								aria-label="Go to home">
								<HomeIcon className="text-white w-6 h-6" />
							</button>
						</div>

						<h1 className="text-8xl font-bold text-white mt-[-1rem]">
							ByteSize
						</h1>
						<p className="text-white mt-4">A media optimization SaaS</p>
					</div>
				</main>
			</div>
		</div>
	);
}
