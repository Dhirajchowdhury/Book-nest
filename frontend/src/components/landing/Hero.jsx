import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="bg-white py-10 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          <div className="p-5 sm:p-6 md:p-8 bg-white border border-zinc-200 rounded-2xl shadow-sm">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-900 mb-4 sm:mb-6">
              Welcome, <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-500">pleasure to have you here!</span> 
            </h1>

            <p className="text-base sm:text-lg text-zinc-700 leading-relaxed mb-4 sm:mb-6">
              BookNest is a platform where you can manage and organise
              your books that you have read, are going to read, or want
              to read in future. You can say that BookNest is your
              personal shelf where not only you can store books,but also 
              you store the status,ranking,author,title of your books.
            </p>

            <p className="text-base sm:text-lg text-zinc-700 mb-6">
              So, don&apos;t wait and start organising your books now by just
              hitting the button below !!
            </p>

            <Link
              href="/signup"
              className="mt-6 sm:mt-10 block w-full sm:w-fit mx-auto bg-emerald-600 hover:bg-emerald-700 text-white text-lg sm:text-xl md:text-2xl px-5 py-3 rounded-xl font-bold text-center transition-colors"
            >
              Do SignUp
            </Link>
          </div>

          <div className="flex justify-center w-full">
            <Image
              src="/landerimg.png"
              alt="Person reading a book"
              width={500}
              height={1000}
              className="border-2 border-black rounded-2xl w-full max-w-md md:max-w-none h-auto object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;