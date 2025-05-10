

type CacheControlOptions = {
  maxAge?: number;
  staleWhileRevalidate?: number;
  isPrivate?: boolean;
  noStore?: boolean;
};

export const createCacheHeaders = ({
  maxAge = 60, // Default 1 minute
  staleWhileRevalidate = 30,
  isPrivate = false,
  noStore = false,
}: CacheControlOptions = {}): Headers => {
  const headers = new Headers();

  if (noStore) {
    headers.set("Cache-Control", "no-store");
    return headers;
  }

  const directives = [
    isPrivate ? "private" : "public",
    `max-age=${maxAge}`,
    `stale-while-revalidate=${staleWhileRevalidate}`,
  ];

  headers.set("Cache-Control", directives.join(", "));
  return headers;
};

// Predefined cache configurations
export const cacheHeaders = {
  // For static content that rarely changes (e.g., images, logos)
  static: () =>
    createCacheHeaders({
      maxAge: 86400, // 24 hours
      staleWhileRevalidate: 43200, // 12 hours
    }),

  // For dynamic content that changes occasionally (e.g., event listings)
  dynamic: () =>
    createCacheHeaders({
      maxAge: 300, // 5 minutes
      staleWhileRevalidate: 60, // 1 minute
    }),

  // For user-specific content
  private: () =>
    createCacheHeaders({
      maxAge: 60,
      staleWhileRevalidate: 30,
      isPrivate: true,
    }),

  // For content that should never be cached (e.g., checkout pages)
  noStore: () =>
    createCacheHeaders({
      noStore: true,
    }),
} as const;
