import { authMiddleware } from "@clerk/nextjs";

// this middleware tells clerk what to ignore and what is public
export default authMiddleware({
  publicRoutes: [
    '/',
    '/events/:id',
    '/api/webhooks/clerk',
    '/api/webhooks/stripe',
    '/api/uploadthing'
  ],
  ignoredRoutes: [
    '/api/webhooks/clerk',
    '/api/webhooks/stripe',
    '/api/uploadthing'
  ]
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
