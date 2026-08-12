import Image from "next/image";

function Features() {
  return (
    <section className="bg-white py-10 sm:py-16 border-b border-zinc-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 md:px-12 py-5 bg-white border border-zinc-200 rounded-2xl shadow-sm">

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-700 mb-4 sm:mb-6">
          What <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-500">You Can Expect</span> 
        </h2>

        <p className="text-base sm:text-lg text-zinc-700 leading-relaxed mb-6 sm:mb-8">
          BookNest is loaded with features , features that can help u to
          manage your books like you keeping it in your shelf according yor
          reliability and choice that which book u want to read or finished
          and all tha in one single place non other than BookNest.
        </p>

        <div className="space-y-6">

          <div className="flex items-start gap-4">
            <Image
              src="/plus.png"
              alt="Add books"
              width={32}
              height={32}
              className="shrink-0"
            />

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-zinc-900">
                Add Books
              </h3>

              <p className="text-sm sm:text-base text-zinc-700">
                Add books to your shelf with minor details.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Image
              src="/book.png"
              alt="Organise books"
              width={32}
              height={32}
              className="shrink-0"
            />

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-zinc-900">
                Organise Books
              </h3>

              <p className="text-sm sm:text-base text-zinc-700">
                Keep your books organised on the basis reading status.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Image
              src="/track.png"
              alt="Track reading status"
              width={32}
              height={32}
              className="shrink-0"
            />

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-zinc-900">
                Track Reading Status
              </h3>

              <p className="text-sm sm:text-base text-zinc-700">
                Keep track of books you are reading, have finished,
                or want to read in future.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Image
              src="/search.png"
              alt="Search books"
              width={32}
              height={32}
              className="shrink-0"
            />

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-zinc-900">
                Search and Filter
              </h3>

              <p className="text-sm sm:text-base text-zinc-700">
                Find books using search and filter option.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Image
              src="/review.png"
              alt="Book ratings and notes"
              width={32}
              height={32}
              className="shrink-0"
            />

            <div>
              <h3 className="text-base sm:text-lg font-semibold text-zinc-900">
                Ratings and Personal Notes
              </h3>

              <p className="text-sm sm:text-base text-zinc-700">
                Add your own ratings and personal thoughts.
              </p>
            </div>
          </div>

        </div>

        <p className="text-base sm:text-lg text-zinc-700 leading-relaxed mt-8 sm:mt-10">
          So, the aim of this website is to give you a personal manager app but for books.
          Thank you, now just hit the buttons above to login and explore the features
        </p>

      </div>
    </section>
  );
}

export default Features;