# ByteSize

## Overview

ByteSize is a powerful media optimization tool that lets users resize images and compress videos seamlessly. Built with cutting-edge technologies like Next.js, Prisma, Tailwind CSS, Cloudinary AI, and Clerk, it delivers fast, efficient, and high-quality transformations for web and mobile use.

## Features

- **Image Resizing:** Resize images to various aspect ratios and resolutions.
- **AI-Powered Compression:** Reduce video sizes without sacrificing quality.
- **Download Videos on the Go:** Access and download media uploaded by other users.
- **Cloud Storage:** All media is processed and stored securely using Cloudinary.
- **Real-Time Preview:** See changes before downloading.

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS, daisyUI, lucide-react
- **Backend:** Next.js API routes, Prisma ORM
- **Database:** NeonDB (serverless PostgreSQL)
- **Storage and Processing:** Cloudinary AI

## Getting Started

To set up the project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/bytesize.git
   cd bytesize
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env.local` and `.env` file in the root directory and add the necessary API keys and database credentials. Refer `sample.env` and `sample.env.local`.

4. Run the development server:
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:3000/`.

## Deployment

ByteSize is deployed using Vercel for frontend and API hosting. Cloudinary handles media storage and processing, while NeonDB is used for the database. To deploy your own version:

1. Set up a Vercel account and link the repository.
2. Configure environment variables in the Vercel dashboard.
3. Deploy the project with a single click or via the Vercel CLI:
   ```sh
   vercel
   ```

## Usage

- Upload an image or video.
- Choose resizing or compression options.
- Preview the changes in real-time.
- Download the optimized media file.

## Contributing

Contributions are welcome! If you'd like to improve ByteSize, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch-name
   ```
3. Make your changes and commit them:
   ```sh
   git commit -m "Add new feature"
   ```
4. Push to your forked repository:
   ```sh
   git push origin feature-branch-name
   ```
5. Create a pull request.

## Work in Progress

ByteSize is actively being improved. Upcoming features include:

- Enhanced AI-powered optimizations.
- Batch processing for multiple files.
- User analytics for tracking media usage.

## License

This project is free to be used for educational purposes.

---

Happy Coding!
