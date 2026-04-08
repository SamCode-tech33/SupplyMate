"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = [
  { value: "OFFICE_SUPPLIES", label: "オフィス用品" },
  { value: "ELECTRONICS", label: "電子機器" },
  { value: "FURNITURE", label: "家具" },
  { value: "SOFTWARE", label: "ソフトウェア" },
  { value: "OTHER", label: "その他" },
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
      aria-labelledby="新しいリクエストのヘッダー"
    >
      {/* Page Header */}
      {/* ページヘッダー */}
      <header className="my-12">
        <h1 className="text-3xl font-bold text-slate-100">新規リクエスト</h1>
        <p className="text-md text-slate-100 mt-2">
          新しい備品購入申請を提出し、承認を得る
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
          <legend className="sr-only">詳細をリクエストする</legend>

          {/* Title */}
          {/* タイトル */}
          <div>
            <label
              htmlFor={titleId}
              className="block text-sm font-medium text-black mb-1"
            >
              タイトル
            </label>
            <input
              id={titleId}
              name="タイトル"
              type="text"
              required
              placeholder="e.g. モニターの購入"
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
              説明
              <span className="text-gray-400 font-normal ml-1">(任意)</span>
            </label>
            <textarea
              id={descriptionId}
              name="説明"
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
                金額 (¥)
              </label>
              <input
                id={amountId}
                name="金額"
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
                カテゴリ
              </label>
              <select
                id={categoryId}
                name="カテゴリ"
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
            キャンセル
          </button>
          <button
            type="submit"
            disabled={loading}
            aria-busy={loading}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 disabled:bg-slate-400 rounded-lg transition-colors"
          >
            {loading ? "送信中..." : "リクエストを送信"}
          </button>
        </div>
      </form>
    </section>
  );
}
