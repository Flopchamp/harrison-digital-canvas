const UNSPLASH_HOSTNAME = "images.unsplash.com";

// Params Unsplash's imgix-based API uses for resizing/cropping/quality/format.
// A stored URL already carries some of these from whenever it was picked, so
// a caller-specific size has to replace them, not stack on top.
const TRANSFORM_PARAM_KEYS = ["w", "h", "fit", "crop", "q", "fm", "auto"];

export const isUnsplashUrl = (url: string): boolean => {
  try {
    return new URL(url).hostname === UNSPLASH_HOSTNAME;
  } catch {
    return false;
  }
};

interface UnsplashImageOptions {
  width: number;
  height?: number;
  fit?: string;
  quality?: number;
  format?: string;
}

/**
 * Right-sizes an Unsplash-hosted image for one specific consumer. Every
 * non-Unsplash URL (all of this site's local /images/* assets) is returned
 * completely unchanged — there is no transform service in front of them.
 */
export const getOptimizedImageUrl = (url: string, options: UnsplashImageOptions): string => {
  if (!isUnsplashUrl(url)) return url;

  try {
    const parsed = new URL(url);
    const params = parsed.searchParams;

    TRANSFORM_PARAM_KEYS.forEach((key) => params.delete(key));

    params.set("w", String(options.width));
    if (options.height) params.set("h", String(options.height));
    params.set("fit", options.fit ?? "crop");
    params.set("q", String(options.quality ?? 75));
    params.set("fm", options.format ?? "auto");

    parsed.search = params.toString();
    return parsed.toString();
  } catch {
    return url;
  }
};
