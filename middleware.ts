import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
	"/home",
	"/",
	"/signin(.*)",
	"/signup(.*)",
]);

const isPublicApiRoute = createRouteMatcher(["/api/videos"]);

export default clerkMiddleware(async (auth, req) => {
	const { userId } = await auth();
	const currentUrl = new URL(req.url);

	const isAccessingAuthRoute =
		currentUrl.pathname === "/signin" || currentUrl.pathname === "/signup";
	const isAccessingPublicRoute = isPublicRoute(req);
	const isAccessingPublicApiRoute = isPublicApiRoute(req);

	// If user is logged in and trying to access auth routes, redirect to home
	if (userId && isAccessingAuthRoute) {
		return NextResponse.redirect(new URL("/home", req.url));
	}

	// If user is not logged in
	if (!userId) {
		// Only redirect if they're trying to access a protected route
		if (!isAccessingPublicRoute && !isAccessingPublicApiRoute) {
			return NextResponse.redirect(new URL("/signin", req.url));
		}
	}

	return NextResponse.next();
});

export const config = {
	matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
