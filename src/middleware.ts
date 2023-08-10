import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr', 'es', 'eo'],
  defaultLocale: 'en',
});
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};