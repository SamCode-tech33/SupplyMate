"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useId } from "react";

// Review Page ───────────────────────────────────────────────────────────────
// Allows admins to approve or reject a pending purchase request.
// Action and request ID are read from the URL — no extra state needed.

export default function ReviewPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const action = searchParams.get("action") as "approve" | "reject";
  const isApprove = action === "approve";
  const reviewNoteId = useId();

  const [reviewNote, setReviewNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string | null>(null);

  // Fetch the request title on mount to display in the form heading
  useEffect(() => {
    fetch(`/api/requests/${params.id}`)
      .then((res) => {
        console.log("status:", res.status);
        return res.text();
      })
      .then((text) => {
        console.log("body:", text);
        const data = JSON.parse(text);
        setTitle(data.title);
      });
  }, [params.id]);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch(`/api/requests/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, reviewNote }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="w-[40vw]">
      {/* Page header ──────────────────────────────────────────── */}
      <div className="my-12">
        <h2 className="text-4xl font-semibold text-slate-100">
          {isApprove ? "Approve Request" : "Reject Request"}
        </h2>
        <p className="text-slate-100 mt-2">
          {isApprove
            ? "Confirm approval of this purchase request"
            : "Confirm rejection of this purchase request"}
        </p>
      </div>
      {/* Review form ───────────────────────────────────────────── */}
      <form
        onSubmit={handleSubmit}
        aria-label={isApprove ? "Approve request form" : "Reject request form"}
        className="bg-slate-100 rounded-xl border p-6 space-y-5 h-[34vh]"
      >
        <div>
          <h2
            aria-live="polite"
            aria-atomic="true"
            className="text-xl font-semibold text-gray-900 mb-2"
          >
            {title ?? "Loading..."}
          </h2>
          {/* Textarea label — htmlFor must match textarea id */}
          <label
            htmlFor="reviewNote"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Comment
            <span className="text-gray-400 font-normal ml-1">(optional)</span>
          </label>
          <textarea
            id={reviewNoteId}
            rows={3}
            value={reviewNote}
            onChange={(e) => setReviewNote(e.target.value)}
            placeholder={
              isApprove
                ? "e.g. Please order from the preferred vendor list"
                : "e.g. We already have this covered"
            }
            aria-describedby={error ? "review-error" : undefined}
            className="w-full h-[140px] px-3 py-2 border mb-2 border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent text-black resize-none"
          />
        </div>

        {/* Error message — announced to screen readers via role="alert" */}
        {error && (
          <p
            role="alert"
            className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
          >
            {error}
          </p>
        )}

        {/* Actions ──────────────────────────────────────────────── */}
        <div className="flex gap-3 pt-1">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className={`flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
              isApprove
                ? "bg-green-700 hover:bg-green-800 disabled:bg-green-400"
                : "bg-red-700 hover:bg-red-800 disabled:bg-red-400"
            }`}
          >
            {loading
              ? "Saving..."
              : isApprove
                ? "Confirm approval"
                : "Confirm rejection"}
          </button>
        </div>
      </form>
    </main>
  );
}
