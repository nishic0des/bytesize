"use client";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function VideoUpload() {
	const [file, setFile] = useState<File | null>(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [isUploading, setIsUploading] = useState(false);

	const MAX_FILE_SIZE = 70 * 1024 * 1024;

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsUploading(true);
		if (!file) return;
		if (file.size > MAX_FILE_SIZE) {
			alert("File size is too large");
			return;
		}
		const formData = new FormData();
		formData.append("file", file);
		formData.append("title", title);
		formData.append("description", description);
		formData.append("originalSize", file.size.toString());

		try {
			const response = await fetch("/api/video-upload", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) throw new Error("Failed to upload video");

			const data = await response.json();
			console.log(data);
			// Reset form
			setTitle("");
			setDescription("");
			setFile(null);
			redirect("/home");
		} catch (error) {
			console.error("Error uploading video", error);
			throw new Error("Error uploading video");
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Upload Video</h1>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div className="pb-8">
					<label className="label">
						<span className="label-text">Title</span>
					</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="input input-bordered w-full"
						required
					/>
				</div>
				<div className="pb-8">
					<label className="label">
						<span className="label-text">Description</span>
					</label>
					<input
						type="text"
						multiple
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="input input-bordered w-full h-20"
						required
					/>
				</div>
				<div className="pb-5">
					<label className="label">
						<span className="label-text">Video File</span>
					</label>
					<input
						type="file"
						accept="video/*"
						onChange={(e) => setFile(e.target.files?.[0] || null)}
						className="input input-bordered w-full p-5 h-15"
						required
					/>
				</div>
				<button
					type="submit"
					className="btn btn-primary"
					disabled={isUploading}>
					{isUploading ? "Uploading..." : "Upload Video"}
				</button>
			</form>
		</div>
	);
}
