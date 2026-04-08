"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { value: "OFFICE_SUPPLIES", label: "Office Supplies" },
  { value: "ELECTRONICS", label: "Electronics" },
  { value: "FURNITURE", label: "Furniture" },
  { value: "SOFTWARE", label: "Software" },
  { value: "OTHER", label: "Other" },
];

export default function NewRequestPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // input ids following standard useId protocol
  // 入力IDは標準のuseIdプロトコルに準拠しています
  const id = useId();
  const titleId = `${id}-title`;
  const descriptionId = `${id}-description`;
  const amountId = `${id}-amount`;
  const categoryId = `${id}-category`;

  // Handle form submission - Prevent default form reload - Send request to API - Handle errors + redirect on success
  // フォーム送信の処理 - フォームの自動再読み込みの防止 - APIへのリクエスト送信 - エラー処理および成功時のリダイレクト
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          description: formData.get("description"),
          amount: Number(formData.get("amount")),
          category: formData.get("category"),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Something went wrong");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="flex flex-col w-[40vw]"
      aria-labelledby="new-request-heading"
    >
      {/* Page Header */}
      {/* ページヘッダー */}
      <header className="my-12">
        <h1 className="text-3xl font-bold text-slate-100">New Request</h1>
        <p className="text-md text-slate-100 mt-2">
          Submit a new supplies purchase request for approval
        </p>
      </header>

      {/* Form */}
      {/* フォーム */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 rounded-xl p-6 space-y-8"
        noValidate
      >
        <fieldset disabled={loading} className="space-y-6">
          <legend className="sr-only">Request details</legend>

          {/* Title */}
          {/* タイトル */}
          <div>
            <label
              htmlFor={titleId}
              className="block text-sm font-medium text-black mb-1"
            >
              Title
            </label>
            <input
              id={titleId}
              name="title"
              type="text"
              required
              placeholder="e.g. Monitor Purchase"
              autoComplete="off"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          {/* 説明 */}
          <div>
            <label
              htmlFor={descriptionId}
              className="block text-sm font-medium text-black mb-1"
            >
              Description
              <span className="text-gray-400 font-normal ml-1">(optional)</span>
            </label>
            <textarea
              id={descriptionId}
              name="description"
              rows={3}
              placeholder="Provide any additional context..."
              className="w-full p-3 border border-gray-300 rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Amount + Category */}
          {/* 金額 + カテゴリ */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={amountId}
                className="block text-sm font-medium text-black mb-1"
              >
                Amount (¥)
              </label>
              <input
                id={amountId}
                name="amount"
                type="number"
                required
                min={1}
                inputMode="numeric"
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor={categoryId}
                className="block text-sm font-medium text-black mb-1"
              >
                Category
              </label>
              <select
                id={categoryId}
                name="category"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        {/* Error Message */}
        {/* エラーメッセージ */}
        {error && (
          <p
            role="alert"
            aria-live="assertive"
            className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
          >
            {error}
          </p>
        )}

        {/* Actions */}
        {/* アクション */}
        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            onClick={() => router.back()}
            className="flex-1 px-4 py-2 text-sm font-medium text-black bg-slate-200 hover:bg-slate-300 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400 rounded-lg transition-colors"
          >
            {loading ? "Submitting..." : "Submit request"}
          </button>
        </div>
      </form>
    </section>
  );
}
