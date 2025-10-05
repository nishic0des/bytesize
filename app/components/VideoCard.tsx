import { useCallback, useEffect, useState } from "react";
import { Video } from "../generated/prisma";
import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";
import { filesize } from "filesize";
import { Clock, FileDown, FileText } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";

dayjs.extend(relativeTime);

interface VideoCardProps {
	video: Video;
	onDownload: (url: string, title: string) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onDownload }) => {
	const [isHovered, setHovered] = useState(false);
	const [previewError, setPreviewError] = useState(false);

	const getThumbnailUrl = useCallback((publicId: string) => {
		return getCldImageUrl({
			src: publicId,
			width: 400,
			height: 225,
			crop: "fill",
			gravity: "auto",
			format: "jpg",
			quality: "auto",
			assetType: "video",
		});
	}, []);

	const getCloudVideoUrl = getCldVideoUrl({
		width: 500,
		height: 400,
		src: video.publicId,
	});

	const formatSize = useCallback((size: number) => {
		return filesize(size);
	}, []);

	const formatDuration = useCallback((seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.round(seconds % 60);
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	}, []);

	const compressionPercentage = Math.round(
		(1 - Number(video.compressedSize) / Number(video.originalSize)) * 100
	);

	useEffect(() => {
		setPreviewError(false);
	}, [isHovered]);

	const handlePreviewError = () => {
		setPreviewError(true);
	};

	return (
		<div
			className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300"
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			onClick={() => onDownload(getCloudVideoUrl, video.title)}>
			<figure className="aspect-video relative">
				{isHovered ? (
					previewError ? (
						<div className="w-full h-full flex items-center justify-center bg-gray-200">
							<p className="text-red-500">Preview not available</p>
						</div>
					) : (
						<video
							src={getCloudVideoUrl}
							autoPlay
							loop
							muted
							className="w-full h-full object-cover"
							onError={handlePreviewError}
						/>
					)
				) : (
					<Image
						src={getThumbnailUrl(video.publicId)}
						alt={video.title}
						className="w-full h-full object-cover"
						width={400}
						height={200}
					/>
				)}
				<div className="absolute bottom-2 right-2 bg-base-100 bg-opacity-70 px-2 py-1 rounded-lg text-sm flex items-center">
					<Clock size={16} className="mr-1" />
					{formatDuration(video.duration)}
				</div>
			</figure>
			<div className="card-body p-4">
				<h2 className="card-title text-lg font-bold">{video.title}</h2>
				<p>{video.description}</p>
				<div className="flex flex-row justify-between items-center gap-2 mb-2">
					<div className="flex flex-row">
						<FileText color="pink" />
						{formatSize(Number(video.compressedSize))}
					</div>
					<div className="flex flex-row">
						<FileDown color="aqua" />
						{compressionPercentage}%
					</div>
				</div>
				<p className="text-sm text-base-content opacity-70 mb-4">
					Uploaded {dayjs(video.createdAt).fromNow()}
				</p>
			</div>
		</div>
	);
};
