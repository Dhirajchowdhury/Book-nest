import Image from "next/image";

function Features() {
  return (
    <section className="bg-white py-16 border-b border-zinc-100">
      <div className="max-w-5xl mx-auto px-8">

        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-emerald-700 mb-6">
          What You Can Expect
        </h2>

        {/* Introduction */}
        <p className="text-lg text-zinc-700 leading-relaxed mb-8">
          BookNest is designed to give readers a simple place to manage their
          books and keep track of their reading journey. Instead of keeping
          everything scattered, you can organise your books and their details
          in one personal space.
        </p>

        {/* Main Features */}
        <div className="space-y-6">

          {/* Add Books */}
          <div className="flex items-start gap-4">
            <Image
              src="/add-book.png"
              alt="Add books"
              width={32}
              height={32}
            />

            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Add Books
              </h3>

              <p className="text-zinc-700">
                Add books to your personal library with their basic details.
              </p>
            </div>
          </div>

          {/* Organise Books */}
          <div className="flex items-start gap-4">
            <Image
              src="/organise-book.png"
              alt="Organise books"
              width={32}
              height={32}
            />

            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Organise Books
              </h3>

              <p className="text-zinc-700">
                Keep your books organised according to their reading status.
              </p>
            </div>
          </div>

          {/* Track Reading Status */}
          <div className="flex items-start gap-4">
            <Image
              src="/track-book.png"
              alt="Track reading status"
              width={32}
              height={32}
            />

            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Track Reading Status
              </h3>

              <p className="text-zinc-700">
                Keep track of books you are currently reading, have completed,
                or want to read.
              </p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-start gap-4">
            <Image
              src="/search-book.png"
              alt="Search books"
              width={32}
              height={32}
            />

            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Search and Filter
              </h3>

              <p className="text-zinc-700">
                Find books easily using search and filtering options.
              </p>
            </div>
          </div>

          {/* Ratings and Personal Notes */}
          <div className="flex items-start gap-4">
            <Image
              src="/book-notes.png"
              alt="Book ratings and notes"
              width={32}
              height={32}
            />

            <div>
              <h3 className="text-lg font-semibold text-zinc-900">
                Ratings and Personal Notes
              </h3>

              <p className="text-zinc-700">
                Add your own ratings and personal thoughts to remember your
                experience with each book.
              </p>
            </div>
          </div>

        </div>

        {/* Closing Paragraph */}
        <p className="text-lg text-zinc-700 leading-relaxed mt-10">
          All these features are focused on one simple idea: making your
          reading collection easier to manage without making the experience
          complicated. BookNest is your personal digital shelf for your
          reading journey.
        </p>

      </div>
    </section>
  );
}

export default Features;