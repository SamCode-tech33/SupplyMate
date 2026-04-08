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
          <p className="text-sm w-64">
            Centralizing supply requisitions for modern teams.
          </p>
        </div>

        {/* Link columns */}
        {/* 列のリンク */}
        <nav aria-label="Footer navigation" className="flex gap-24">
          <div className="flex flex-col gap-3">
            <h2 className="text-white font-bold mb-1">Product</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-sm cursor-default">Features</span>
              </li>
              <li>
                <span className="text-sm cursor-default">Pricing</span>
              </li>
              <li>
                <span className="text-sm cursor-default">Changelog</span>
              </li>
              <li>
                <span className="text-sm cursor-default">Roadmap</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-white font-bold mb-1">Company</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-sm cursor-default">About</span>
              </li>
              <li>
                <span className="text-sm cursor-default">Blog</span>
              </li>
              <li>
                <span className="text-sm cursor-default">Careers</span>
              </li>
              <li>
                <span className="text-sm cursor-default">Press</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-white font-bold mb-1">Support</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-sm cursor-default">Documentation</span>
              </li>
              <li>
                <span className="text-sm cursor-default">Help Center</span>
              </li>
              <li>
                <span className="text-sm cursor-default">Contact Us</span>
              </li>
              <li>
                <span className="text-sm cursor-default">Status</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-white font-bold mb-1">Legal</h2>
            <ul className="flex flex-col gap-3">
              <li>
                <span className="text-sm cursor-default">Privacy Policy</span>
              </li>
              <li>
                <span className="text-sm cursor-default">Terms of Service</span>
              </li>
              <li>
                <span className="text-sm cursor-default">Cookie Policy</span>
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
        <p>© {new Date().getFullYear()} SupplyMate. All rights reserved.</p>
        <p className="text-xs text-slate-500 w-96 text-right">
          SupplyMate is a demo project. All company names, products, and
          services mentioned are fictitious. Any resemblance to real companies
          or products is purely coincidental. This application does not process
          real transactions or store sensitive data.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
