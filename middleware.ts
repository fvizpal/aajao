import { authMiddleware } from "@clerk/nextjs";

// this middleware tells clerk what to ignore and what is public
export default authMiddleware({
  publicRoutes: [
    '/',
    '/events/:id',
    '/api/clerk',
    '/api/stripe',
  ],
  ignoredRoutes: [
    '/api/clerk',
    '/api/stripe',
  ]
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};