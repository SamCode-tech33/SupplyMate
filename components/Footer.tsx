const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 px-12">
      <div className="flex justify-between mb-12">
        <div>
          <h2 className="text-white font-extrabold text-2xl mb-4">
            SupplyMate
          </h2>
          <p className="text-sm w-64">
            Centralizing supply requisitions for modern teams.
          </p>
        </div>

        <div className="flex gap-24">
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold mb-1">Product</h3>
            <span className="text-sm cursor-default">Features</span>
            <span className="text-sm cursor-default">Pricing</span>
            <span className="text-sm cursor-default">Changelog</span>
            <span className="text-sm cursor-default">Roadmap</span>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold mb-1">Company</h3>
            <span className="text-sm cursor-default">About</span>
            <span className="text-sm cursor-default">Blog</span>
            <span className="text-sm cursor-default">Careers</span>
            <span className="text-sm cursor-default">Press</span>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold mb-1">Support</h3>
            <span className="text-sm cursor-default">Documentation</span>
            <span className="text-sm cursor-default">Help Center</span>
            <span className="text-sm cursor-default">Contact Us</span>
            <span className="text-sm cursor-default">Status</span>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-white font-bold mb-1">Legal</h3>
            <span className="text-sm cursor-default">Privacy Policy</span>
            <span className="text-sm cursor-default">Terms of Service</span>
            <span className="text-sm cursor-default">Cookie Policy</span>
            <span className="text-sm cursor-default">GDPR</span>
          </div>
        </div>
      </div>

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
