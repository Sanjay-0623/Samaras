import { Router, type IRouter } from "express";

const router: IRouter = Router();

interface CachedReviews {
  data: Review[];
  fetchedAt: number;
}

interface Review {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}

const CACHE_TTL_MS = 30 * 60 * 1000;
let cache: CachedReviews | null = null;

router.get("/reviews", async (_req, res) => {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey) {
    return res.json({ reviews: [], status: "no_api_key" });
  }

  if (!placeId) {
    return res.json({ reviews: [], status: "no_place_id" });
  }

  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return res.json({ reviews: cache.data, status: "ok", cached: true });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&reviews_sort=newest&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json() as {
      status: string;
      result?: { reviews?: Review[] };
    };

    if (data.status !== "OK" || !data.result?.reviews) {
      return res.json({ reviews: [], status: "api_error", detail: data.status });
    }

    const filtered = data.result.reviews.filter((r) => r.rating >= 4);

    cache = { data: filtered, fetchedAt: Date.now() };
    return res.json({ reviews: filtered, status: "ok" });
  } catch (err) {
    console.error("Google Places API error:", err);
    return res.json({ reviews: [], status: "fetch_error" });
  }
});

export default router;
