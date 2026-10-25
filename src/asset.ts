/** Resolves a file in `public/` against the deploy base (absolute on the site, relative in the artifact build). */
export const asset = (path: string) => import.meta.env.BASE_URL + path.replace(/^\//, "");
