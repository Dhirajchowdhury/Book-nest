import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-8">
        
        <div className="grid grid-cols-2 gap-12 items-start">
          
          <div>
            <h1 className="text-5xl font-bold text-emerald-900 mb-6">
              Welcome, <span className="text-5xl font-bold text-emerald-500 mb-6">pleasure to have you here!</span> 
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
              className=" mt-18 block w-fit mx-auto bg-emerald-600 text-white text-2xl px-9 py-5 rounded-xl font-bold text-center"
            >
              Fatak se Sign Up
            </Link>
          </div>

          <div className="flex justify-center">
            <Image
              src="/landerimg.png"
              alt="Person reading a book"
              width={500}
              height={500}
              className="border-2 border-black rounded-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;