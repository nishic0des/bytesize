"use client";
import { useCallback, useEffect, useState } from "react";
import { Video } from "@/types";
import { VideoCard } from "@/app/components/VideoCard";

export default function Home() {
	const [videos, setVideos] = useState<Video[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string>("");

	const fetchVideos = useCallback(async () => {
		try {
			const response = await fetch("/api/videos");
			const data = await response.json();
			if (Array.isArray(data)) {
				setVideos(data);
			} else {
				throw new Error("Unexpected response format");
			}
		} catch (error) {
			console.log("Error fetching videos: ", error);
			setError("Failed to fetch videos");
		} finally {
			setLoading(false);
		}
	}, []);
	useEffect(() => {
		console.log("Home component mounted");
		fetchVideos();
	}, [fetchVideos]);

	const handleDownload = useCallback((url: string, title: string) => {
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", `${title}.mp4`);
		link.setAttribute("target", "_blank");
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}, []);

	if (loading) {
		return (
			<div className="mt-4">
				<progress className="progress progress-primary w-full"></progress>
			</div>
		);
	}

	if (error)
		return <div className="flex items-center">Error displaying videos</div>;

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Videos</h1>
			{videos.length === 0 ? (
				<div className="text-center text-lg text-gray-500">
					No videos available
				</div>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{videos.map((video) => (
						<VideoCard
							key={video.id}
							video={video}
							onDownload={handleDownload}
						/>
					))}
				</div>
			)}
		</div>
	);
}
