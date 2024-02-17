import { authMiddleware } from "@clerk/nextjs";

// this middleware tells clerk what to ignore and what is public
export default authMiddleware({
  publicRoutes: [
    '/',
    '/events/:id',
    '/api/clerk',
    '/api/stripe',
    '/api/uploadthing',
  ],
  ignoredRoutes: [
    '/api/clerk',
    '/api/stripe',
    '/api/uploadthing',
  ]
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};