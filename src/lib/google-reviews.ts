export interface GoogleReview {
  authorName: string;
  authorUrl: string;
  profilePhotoUrl?: string;
  rating: number;
  text: string;
  relativeTime: string;
  time: number;
}

export interface GooglePlaceReviews {
  reviews: GoogleReview[];
  rating: number;
  totalReviews: number;
  googleMapsUrl: string;
}

interface PlacesReview {
  author_name: string;
  author_url: string;
  profile_photo_url?: string;
  rating: number;
  text: string;
  relative_time_description: string;
  time: number;
}

interface PlacesDetailsResponse {
  status: string;
  result?: {
    reviews?: PlacesReview[];
    rating?: number;
    user_ratings_total?: number;
    url?: string;
  };
}

const PLACES_FIELDS = 'reviews,rating,user_ratings_total,url';

function mapReview(r: PlacesReview): GoogleReview {
  return {
    authorName: r.author_name,
    authorUrl: r.author_url,
    profilePhotoUrl: r.profile_photo_url,
    rating: r.rating,
    text: r.text,
    relativeTime: r.relative_time_description,
    time: r.time,
  };
}

async function fetchPlacesReviews(
  apiKey: string,
  placeId: string,
  language: string,
): Promise<PlacesDetailsResponse | null> {
  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
  url.searchParams.set('place_id', placeId);
  url.searchParams.set('fields', PLACES_FIELDS);
  url.searchParams.set('language', language);
  url.searchParams.set('key', apiKey);

  const res = await fetch(url.toString());
  if (!res.ok) return null;
  return (await res.json()) as PlacesDetailsResponse;
}

/** Places API devuelve máx. 5 reseñas por idioma; combinamos es + ca para obtener más. */
function mergeReviewsByAuthor(
  spanish: GoogleReview[],
  other: GoogleReview[],
  limit: number,
): GoogleReview[] {
  const byAuthor = new Map<string, GoogleReview>();

  for (const review of spanish) {
    byAuthor.set(review.authorName, review);
  }
  for (const review of other) {
    if (!byAuthor.has(review.authorName)) {
      byAuthor.set(review.authorName, review);
    }
  }

  return [...byAuthor.values()]
    .sort((a, b) => b.time - a.time)
    .slice(0, limit);
}

export async function fetchGoogleReviews(limit = 6): Promise<GooglePlaceReviews | null> {
  const apiKey = import.meta.env.GOOGLE_PLACES_API_KEY;
  const placeId = import.meta.env.GOOGLE_PLACES_PLACE_ID;

  if (!apiKey || !placeId) {
    console.warn('[google-reviews] GOOGLE_PLACES_API_KEY o GOOGLE_PLACES_PLACE_ID no configurados');
    return null;
  }

  try {
    const [esData, caData] = await Promise.all([
      fetchPlacesReviews(apiKey, placeId, 'es'),
      fetchPlacesReviews(apiKey, placeId, 'ca'),
    ]);

    const esResult = esData?.status === 'OK' ? esData.result : undefined;
    const caResult = caData?.status === 'OK' ? caData.result : undefined;
    const meta = esResult ?? caResult;

    if (!meta) {
      console.warn('[google-reviews] API status:', esData?.status ?? caData?.status);
      return null;
    }

    const esReviews = (esResult?.reviews ?? []).map(mapReview);
    const caReviews = (caResult?.reviews ?? []).map(mapReview);
    const reviews = mergeReviewsByAuthor(esReviews, caReviews, limit);

    if (reviews.length === 0) return null;

    return {
      reviews,
      rating: meta.rating ?? 5,
      totalReviews: meta.user_ratings_total ?? reviews.length,
      googleMapsUrl: meta.url ?? `https://www.google.com/maps/place/?q=place_id:${placeId}`,
    };
  } catch (err) {
    console.warn('[google-reviews] fetch failed:', err);
    return null;
  }
}

export function renderStars(rating: number): string[] {
  const count = Math.min(5, Math.max(0, Math.round(rating)));
  return Array.from({ length: count }, () => '★');
}
