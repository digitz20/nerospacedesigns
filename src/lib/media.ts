/**
 * Build a Cloudinary delivery URL with on-the-fly transformations inserted.
 *
 * Uploads are stored at full original quality by /api/upload; this helper is
 * used at render time to deliver a sized, high-quality variant so pages and
 * the lightbox load fast on desktop and mobile. `q_auto:best` keeps full
 * visual quality and `f_auto` serves the most efficient modern format the
 * browser supports.
 *
 * Non-Cloudinary URLs (external hosts) and video resources are returned
 * unchanged — video transformations are intentionally avoided.
 */
export function cloudinaryImg(
  url: string | undefined | null,
  width = 1600
): string {
  if (!url) return "";
  const match = url.match(
    /^(https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/)(.+)$/
  );
  if (!match) return url;
  return `${match[1]}f_auto,q_auto:best,w_${width}/${match[2]}`;
}
