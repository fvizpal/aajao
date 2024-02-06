import { authMiddleware } from "@clerk/nextjs";

// this middleware tells clerk what to ignore and what is public
export default authMiddleware({
  publicRoutes: [
    '/',
    '/events/:id',
    '/events/create',
    '/api/webhook/clerk',
    '/api/webhook/stripe',
  ],
  ignoredRoutes: [
    '/api/webhook/clerk',
    '/api/webhook/stripe',
  ]
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};