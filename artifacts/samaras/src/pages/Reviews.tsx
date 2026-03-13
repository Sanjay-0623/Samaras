import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaStar, FaGoogle, FaQuoteLeft } from "react-icons/fa";
import PageTransition from "@/components/PageTransition";

interface Review {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  text: string;
  time: number;
  relative_time_description: string;
}

interface ApiResponse {
  reviews: Review[];
  status: string;
  cached?: boolean;
}

const CACHE_KEY = "samaras_reviews_cache";
const CACHE_TTL = 30 * 60 * 1000;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          className={star <= rating ? "text-[#FF7A00]" : "text-white/15"}
          size={14}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const MAX_LENGTH = 220;
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > MAX_LENGTH;
  const displayText =
    isLong && !expanded ? review.text.slice(0, MAX_LENGTH).trimEnd() + "…" : review.text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="relative group flex flex-col rounded-3xl border border-white/8 bg-white/[0.04] backdrop-blur-md p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-[#FF7A00]/30 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,122,0,0.12)] transition-all duration-300 overflow-hidden cursor-default"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#FF7A00]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-3xl" />

      <FaQuoteLeft className="text-[#FF7A00]/25 absolute top-6 right-6" size={32} />

      <div className="flex items-center gap-4 mb-5 relative z-10">
        <div className="relative shrink-0">
          {review.profile_photo_url ? (
            <img
              src={review.profile_photo_url}
              alt={review.author_name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-[#FF7A00]/30 transition-all duration-300"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-[#FF7A00]/20 flex items-center justify-center text-[#FF7A00] font-bold text-lg ring-2 ring-white/10">
              {review.author_name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-white font-semibold text-[15px] leading-tight">
            {review.author_name}
          </h4>
          <p className="text-white/40 text-xs mt-0.5">{review.relative_time_description}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-5 relative z-10">
        <StarRating rating={review.rating} />
        <span className="text-[#FF7A00] font-bold text-sm">{review.rating}.0</span>
      </div>

      <p className="text-white/60 text-[15px] leading-relaxed flex-1 relative z-10">
        {displayText}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-[#FF7A00] text-sm font-medium hover:text-white transition-colors relative z-10 self-start"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      <div className="mt-6 pt-4 border-t border-white/8 flex items-center gap-2 relative z-10">
        <FaGoogle className="text-[#4285F4]" size={12} />
        <span className="text-white/30 text-xs tracking-wider uppercase">Google Review</span>
      </div>
    </motion.div>
  );
}

function AverageRatingBadge({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) return null;
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="inline-flex flex-col items-center gap-2 px-8 py-5 rounded-2xl border border-white/8 bg-white/[0.04] backdrop-blur-sm mt-8"
    >
      <span className="text-5xl font-bold text-[#FF7A00]">{avg}</span>
      <StarRating rating={Math.round(Number(avg))} />
      <span className="text-white/40 text-sm">Based on {reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
    </motion.div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [status, setStatus] = useState<"loading" | "ok" | "no_key" | "empty" | "error">("loading");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data, ts } = JSON.parse(cached);
        if (Date.now() - ts < CACHE_TTL && Array.isArray(data)) {
          setReviews(data);
          setStatus(data.length > 0 ? "ok" : "empty");
          return;
        }
      } catch {}
    }

    fetch("/api/reviews")
      .then((r) => r.json())
      .then((json: ApiResponse) => {
        if (json.status === "no_api_key" || json.status === "no_place_id") {
          setStatus("no_key");
          return;
        }
        const list = json.reviews ?? [];
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: list, ts: Date.now() }));
        setReviews(list);
        setStatus(list.length > 0 ? "ok" : "empty");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <PageTransition>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 relative min-h-[60vh]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FF7A00]/5 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#FF7A00]/40 to-transparent mb-16" />

        <div className="text-center mb-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#FF7A00] text-xs font-semibold tracking-[0.3em] uppercase mb-4"
          >
            Guest Experiences
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl font-display font-bold text-white mb-5 leading-tight"
          >
            What Our Customers Say
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center gap-2 text-white/45 text-sm"
          >
            <FaGoogle className="text-[#4285F4]" size={14} />
            <span>Real reviews from Google</span>
          </motion.div>

          {status === "ok" && <AverageRatingBadge reviews={reviews} />}
        </div>

        {status === "loading" && (
          <div className="mt-24 flex flex-col items-center gap-5">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#FF7A00]"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
            <p className="text-white/35 text-sm">Loading reviews…</p>
          </div>
        )}

        {status === "no_key" && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col items-center gap-6 px-10 py-10 rounded-3xl border border-white/8 bg-white/[0.03] backdrop-blur-sm max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-[#FF7A00]/10 border border-[#FF7A00]/20 flex items-center justify-center">
                <FaGoogle className="text-[#FF7A00]" size={28} />
              </div>
              <div>
                <h3 className="text-white font-display font-bold text-2xl mb-3">
                  Customer reviews will appear here soon.
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">
                  Google Places integration is not configured yet. Add your{" "}
                  <code className="text-[#FF7A00] font-mono text-xs bg-[#FF7A00]/10 px-1.5 py-0.5 rounded">
                    GOOGLE_PLACES_API_KEY
                  </code>{" "}
                  and{" "}
                  <code className="text-[#FF7A00] font-mono text-xs bg-[#FF7A00]/10 px-1.5 py-0.5 rounded">
                    GOOGLE_PLACE_ID
                  </code>{" "}
                  in the Secrets tab to load real reviews.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {(status === "error" || status === "empty") && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col items-center gap-5 px-10 py-10 rounded-3xl border border-white/8 bg-white/[0.03] max-w-lg mx-auto">
              <FaGoogle className="text-white/20" size={36} />
              <h3 className="text-white/70 font-display font-semibold text-xl">
                Customer reviews will appear here soon.
              </h3>
            </div>
          </motion.div>
        )}

        {status === "ok" && reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {reviews.map((review, i) => (
              <ReviewCard key={`${review.author_name}-${review.time}`} review={review} index={i} />
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://maps.google.com/?q=Samaras+Restaurant"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-white/10 bg-white/[0.03] text-white/60 text-sm hover:border-[#FF7A00]/40 hover:text-white hover:bg-white/[0.06] transition-all duration-300 group"
          >
            <FaGoogle className="text-[#4285F4] group-hover:scale-110 transition-transform" size={14} />
            View on Google Maps
          </a>
          <a
            href="https://maps.google.com/?q=Samaras+Restaurant"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#FF7A00] text-white text-sm font-semibold tracking-wide hover:bg-[#FF7A00]/90 hover:shadow-[0_0_30px_rgba(255,122,0,0.35)] transition-all duration-300"
          >
            Leave a Review
          </a>
        </motion.div>
      </div>
    </PageTransition>
  );
}
