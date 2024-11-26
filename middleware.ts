import { NextResponse } from "next/server";
import { auth } from "@/app/(auth)/auth";
import {
  isPublicRoute,
  redirectToLogin,
  redirectToWelcome,
} from "@/app/(auth)/utils/middleware.utils";
import { AuthenticatedNextRequest } from "@/app/(auth)/types/middleware.types";

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

export default auth((req: AuthenticatedNextRequest) => {
  try {
    const { nextUrl } = req;
    const isAuthenticated = !!req.auth?.user;
    const isValidPublicRoute = isPublicRoute(nextUrl.pathname);

    if (isValidPublicRoute && isAuthenticated) {
      return redirectToWelcome(nextUrl);
    }

    if (!isAuthenticated && !isValidPublicRoute) {
      return redirectToLogin(nextUrl);
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Error in middleware:", error);
    return redirectToLogin(req.nextUrl);
  }
});
