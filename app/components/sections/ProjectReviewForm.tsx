"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";

type ProjectReviewFormProps = {
  projectTitle?: string;
};

const ratingLabels = [
  "Poor",
  "Fair",
  "Good",
  "Very Good",
  "Excellent",
];

export default function ProjectReviewForm({ projectTitle }: ProjectReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const ratingLabel = useMemo(() => {
    if (rating < 1 || rating > 5) return "Select a rating";
    return ratingLabels[rating - 1];
  }, [rating]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setRating(0);
    setName("");
    setEmail("");
    setReview("");
  };

  return (
    <section className="py-20 md:py-32 border-t border-[#3D2B1F]/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-6">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#D97706]">Leave a Review</span>
          <h3 className="font-serif text-3xl md:text-4xl text-[#3D2B1F]">
            Share your experience{projectTitle ? ` with ${projectTitle}` : ""}
          </h3>
          <p className="text-[#6B5B4F] text-lg leading-relaxed">
            Your feedback helps others understand our process and helps us keep improving.
          </p>
        </div>

        <div className="lg:col-span-8">
          <form onSubmit={handleSubmit} className="space-y-6 bg-white/70 border border-[#3D2B1F]/10 rounded-2xl p-6 md:p-10">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#9B8B7A]">Rating</span>
              <div className="flex items-center gap-2">
                {Array.from({ length: 5 }).map((_, index) => {
                  const value = index + 1;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      className={`text-2xl transition-colors ${value <= rating ? "text-[#D97706]" : "text-[#D9D1C1]"}`}
                      aria-label={`Set rating to ${value}`}
                    >
                      ★
                    </button>
                  );
                })}
                <span className="text-sm text-[#6B5B4F] ml-2">{ratingLabel}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2 text-sm text-[#3D2B1F]">
                Name
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className="border border-[#3D2B1F]/20 rounded-lg px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#D97706]/40"
                  placeholder="Your name"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-[#3D2B1F]">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="border border-[#3D2B1F]/20 rounded-lg px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#D97706]/40"
                  placeholder="name@email.com"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-[#3D2B1F]">
              Review
              <textarea
                value={review}
                onChange={(event) => setReview(event.target.value)}
                required
                rows={5}
                className="border border-[#3D2B1F]/20 rounded-lg px-4 py-3 bg-white/80 focus:outline-none focus:ring-2 focus:ring-[#D97706]/40 resize-none"
                placeholder="Tell us what stood out to you..."
              />
            </label>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#3D2B1F] text-[#FAF6F1] uppercase tracking-widest text-xs font-semibold hover:bg-[#2b1e15] transition-colors"
              >
                Submit Review
              </button>
              {submitted ? (
                <span className="text-sm text-[#6B5B4F]">Thanks for sharing your feedback.</span>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
