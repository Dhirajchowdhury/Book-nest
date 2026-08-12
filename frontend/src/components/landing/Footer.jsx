function Footer() {
  return (
    <footer className="bg-emerald-950 text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">

          <div>
            <h2 className="text-2xl font-bold">
              Book<span className="text-emerald-400">Nest</span>
            </h2>

            <p className="text-sm text-emerald-200 mt-2">
              Simply BookShelf manager but in website.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Contact</h3>

            <p className="text-sm text-emerald-200">
              Email: booknest@gmail.com
            </p>

            <p className="text-sm text-emerald-200 mt-1">
              Phone: +91 98765 43210
            </p>
          </div>

        </div>
        <div className="border-t border-emerald-800 mt-8 pt-5 text-sm text-emerald-300 flex justify-center text-center">
          © 2026 BookNest. All rights reserved. Made with khoon paseena by Dhiraj 
        </div>

      </div>
    </footer>
  );
}

export default Footer;