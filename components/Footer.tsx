// Footer ────────────────────────────────────────────────────────────────────
// Placeholder links are intentionally non-functional (demo project)

// フッター ────────────────────────────────────────────────────────────────────
// プレースホルダーのリンクは、デモプロジェクトのため意図的に機能していません

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-12">
      <div className="flex justify-between mb-12">
        {/* Brand and tagline */}
        {/* ブランド名とキャッチコピー */}
        <div>
          <p className="text-white font-extrabold text-2xl mb-4">SupplyMate</p>
          <p className="text-sm w-64">現代のチームにおける資材発注の一元化。</p>
        </div>

        {/* Link columns */}
        {/* 列のリンク */}
        <nav aria-label="フッターナビゲーション" className="flex gap-24">
          <div className="flex flex-col gap-3">
            <h2 className="text-white font-bold mb-1">製品</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-sm cursor-default">特長</span>
              </li>
              <li>
                <span className="text-sm cursor-default">価格</span>
              </li>
              <li>
                <span className="text-sm cursor-default">変更履歴</span>
              </li>
              <li>
                <span className="text-sm cursor-default">ロードマップ</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-white font-bold mb-1">会社</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-sm cursor-default">概要</span>
              </li>
              <li>
                <span className="text-sm cursor-default">ブログ</span>
              </li>
              <li>
                <span className="text-sm cursor-default">採用情報</span>
              </li>
              <li>
                <span className="text-sm cursor-default">報道</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-white font-bold mb-1">サポート</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-sm cursor-default">ドキュメント</span>
              </li>
              <li>
                <span className="text-sm cursor-default">ヘルプセンター</span>
              </li>
              <li>
                <span className="text-sm cursor-default">お問い合わせ</span>
              </li>
              <li>
                <span className="text-sm cursor-default">ステータス</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-white font-bold mb-1">法務</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-sm cursor-default">
                  プライバシーポリシー
                </span>
              </li>
              <li>
                <span className="text-sm cursor-default">利用規約</span>
              </li>
              <li>
                <span className="text-sm cursor-default">クッキーポリシー</span>
              </li>
              <li>
                <span className="text-sm cursor-default">GDPR</span>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      {/* ボトムバー */}
      <div className="border-t border-slate-700 pt-8 flex justify-between items-center text-sm">
        <p>
          © {new Date().getFullYear()} SupplyMate。無断転載・複製を禁じます。
        </p>
        <p className="text-xs text-slate-500 w-96 text-right">
          SupplyMateはデモプロジェクトです。記載されている会社名、製品、および
          サービスはすべて架空のものです。実在する企業や製品との
          類似点は、あくまで偶然によるものです。本アプリケーションは、
          実際の取引を処理したり、機密データを保存したりすることはありません。
        </p>
      </div>
    </footer>
  );
};

export default Footer;
