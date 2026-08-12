function Footer() {
  return (
    <footer className="bg-emerald-950 text-white py-10">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex justify-between items-start">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              Book<span className="text-emerald-400">Nest</span>
            </h2>

            <p className="text-sm text-emerald-200 mt-2">
              A simple space to organize and track your reading.
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-semibold mb-3">Contact</h3>

            <p className="text-sm text-emerald-200">
              Email: hello@booknest.app
            </p>

            <p className="text-sm text-emerald-200 mt-1">
              Phone: +91 98765 43210
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-emerald-800 mt-8 pt-5 text-sm text-emerald-300">
          © {new Date().getFullYear()} BookNest. All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;