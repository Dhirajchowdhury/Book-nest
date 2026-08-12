import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-8">
        
        <div className="grid grid-cols-2 gap-12 items-center">
          
          {/* Left side - Introduction and Signup */}
          <div>
            <h1 className="text-5xl font-bold text-emerald-700 mb-6">
              Welcome, pleasure to have you here!
            </h1>

            <p className="text-lg text-zinc-700 leading-relaxed mb-6">
              BookNest is a platform where you can manage and organise
              your books that you have read, are going to read, or want
              to read in the future. You can say that BookNest is your
              personal shelf where instead of keeping books, you store
              and organise the status of your books.
            </p>

            <p className="text-lg text-zinc-700 mb-6">
              So, don't wait and start organising your books now by just
              hitting the button!
            </p>

            <Link
              href="/signup"
              className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Fatak se Sign Up
            </Link>
          </div>

          {/* Right side - Hero Image */}
          <div className="flex justify-center">
            <Image
              src="/hero-image.png"
              alt="Person reading a book"
              width={500}
              height={500}
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;