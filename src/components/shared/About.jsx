import { motion } from "framer-motion";

const sampleStaff = [
  {
    name: "Alice Johnson",
    role: "CEO",
    img: "https://i.pravatar.cc/150?img=11",
  },
  {
    name: "Michael Lee",
    role: "CTO",
    img: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Sara Kim",
    role: "Marketing Head",
    img: "https://i.pravatar.cc/150?img=13",
  },
  {
    name: "David Park",
    role: "Customer Support",
    img: "https://i.pravatar.cc/150?img=14",
  },
];

// Updated core values with icon URLs (replace with your own if needed)
const sampleCorevalue = [
  {
    title: "Customer First",
    description:
      "We prioritize your satisfaction and strive to provide excellent service at every step.",
    icon: "https://cdn-icons-png.flaticon.com/512/1250/1250615.png", // handshake icon
  },
  {
    title: "Quality Products",
    description:
      "Only the best makes it to our catalog — curated for quality and value.",
    icon: "https://cdn-icons-png.flaticon.com/512/190/190411.png", // checkmark icon
  },
  {
    title: "Continuous Innovation",
    description:
      "We leverage technology and creativity to improve your shopping experience.",
    icon: "https://cdn-icons-png.flaticon.com/512/992/992700.png", // rocket icon
  },
];

const sampleAwards = [
  {
    year: 2024,
    title: "Best Online Retailer",
    description: "Awarded by Retail Association for outstanding service.",
  },
  {
    year: 2023,
    title: "Innovation in E-commerce",
    description: "Recognized for cutting-edge shopping technology.",
  },
];
const sampleTestimonials = [
  {
    name: "Jessica Williams",
    role: "Verified Buyer",
    text: "ShopEase has completely changed how I shop online. Fast shipping and excellent customer service!",
    img: "https://i.pravatar.cc/100?img=32",
    rating: 5,
    date: "March 2025",
  },
  {
    name: "Mark Robinson",
    role: "Happy Customer",
    text: "Great quality products at amazing prices. Highly recommend ShopEase!",
    img: "https://i.pravatar.cc/100?img=45",
    rating: 4,
    date: "February 2025",
  },
  {
    name: "Emily Chen",
    role: "Frequent Shopper",
    text: "Love the curated products and the continuous innovation keeps me coming back!",
    img: "https://i.pravatar.cc/100?img=52",
    rating: 5,
    date: "January 2025",
  },
  {
    name: "Daniel Smith",
    role: "Long-term Customer",
    text: "Customer support is top-notch. Always quick to resolve any issues.",
    img: "https://i.pravatar.cc/100?img=27",
    rating: 5,
    date: "December 2024",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Helper component for stars
const Stars = ({ rating }) => {
  return (
    <div className="flex scroll-smooth space-x-1 text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${
            i < rating
              ? "fill-current"
              : "stroke-current stroke-1 text-yellow-300"
          }`}
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="12 2 15 8.5 22 9.3 17 14 18.3 21 12 17.5 5.7 21 7 14 2 9.3 9 8.5 12 2" />
        </svg>
      ))}
    </div>
  );
};

const About = () => {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 text-gray-800">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <motion.section
          className="mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <motion.h1
            className="text-4xl font-extrabold text-indigo-700 mb-4"
            variants={fadeUp}
          >
            About ShopEase
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-lg text-gray-600"
            variants={fadeUp}
            custom={1}
          >
            ShopEase is your trusted online marketplace, offering a curated
            selection of quality products at competitive prices with exceptional
            customer service.
          </motion.p>
        </motion.section>
      </section>

      {/* Company Story */}
      {/* Company Story */}
      <motion.section
        className="mb-16 grid gap-10 md:grid-cols-2 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
          alt="Team collaboration"
          className="rounded-lg shadow-md object-cover w-full h-64 md:h-80"
          loading="lazy"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-indigo-700">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Founded in 2023, ShopEase was created with a simple goal: make
            online shopping easy, enjoyable, and accessible to everyone. We
            believe in quality, transparency, and trust.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our dedicated team works tirelessly to source the best products and
            deliver them right to your door with fast, reliable shipping.
          </p>
        </motion.div>
      </motion.section>

      {/* Core Values */}
      <section className="mb-16 text-center">
        <h2 className="text-3xl font-semibold mb-8 text-indigo-700">
          Our Core Values
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {sampleCorevalue.map(({ title, description, icon }) => (
            <div
              key={title}
              className="bg-indigo-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={icon}
                alt={`${title} icon`}
                className="w-12 h-12 mx-auto mb-4"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold mb-2 text-indigo-700">
                {title}
              </h3>
              <p className="text-gray-700">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Awards & Recognition */}
      <motion.section
        className="mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl font-semibold mb-8 text-indigo-700 text-center"
          variants={fadeUp}
        >
          Awards & Recognition
        </motion.h2>

        <motion.ul
          className="max-w-3xl mx-auto space-y-6 text-gray-700"
          variants={container}
        >
          {sampleAwards.map(({ year, title, description }, i) => (
            <motion.li
              key={title}
              className="border-l-4 border-indigo-700 pl-4 shadow-sm bg-indigo-50 rounded p-4"
              variants={fadeUp}
              custom={i}
            >
              <h3 className="text-xl font-semibold text-indigo-700">
                {title} <span className="text-gray-500">({year})</span>
              </h3>
              <p>{description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {/* Customer Testimonials */}

      <section className="mb-16 relative bg-indigo-50 py-12 rounded-lg">
        <h2 className="text-3xl font-semibold mb-8 text-indigo-700 text-center">
          What Our Customers Say
        </h2>

        {/* Scroll container with snapping */}
        <div className="relative max-w-5xl mx-auto overflow-x-auto scroll-pl-6 scroll-smooth snap-x snap-mandatory flex gap-6 px-6 no-scrollbar">
          {sampleTestimonials.map(({ name, role, text, img, rating, date }) => (
            <article
              key={name}
              className="snap-start flex-shrink-0 w-80 bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={img}
                  alt={name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-indigo-700">{name}</p>
                  <p className="text-gray-600 text-sm">{role}</p>
                  <p className="text-gray-400 text-xs mt-1">{date}</p>
                </div>
              </div>

              <Stars rating={rating} />

              <p className="mt-4 text-gray-800 italic flex-grow">"{text}"</p>
            </article>
          ))}
        </div>

        {/* Left fade overlay */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-indigo-50"></div>
        {/* Right fade overlay */}
        <div className="pointer-events-none absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-indigo-50"></div>
      </section>

      {/* Meet The Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-indigo-700 text-center">
          Meet The Team
        </h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto">
          {sampleStaff.map(({ name, role, img }) => (
            <div
              key={name}
              className="text-center rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={img}
                alt={name}
                className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
                loading="lazy"
              />
              <h3 className="text-lg font-semibold text-indigo-700">{name}</h3>
              <p className="text-gray-600">{role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 rounded-lg py-12 px-6 text-center text-white max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">
          Have Questions? We’re Here to Help
        </h2>
        <p className="mb-6 max-w-xl mx-auto">
          Reach out anytime and our dedicated support team will assist you
          promptly.
        </p>
        <a
          href="/contact"
          className="inline-block bg-white text-indigo-700 font-semibold px-6 py-3 rounded shadow hover:bg-indigo-50 transition"
        >
          Contact Us
        </a>
      </section>
    </main>
  );
};

export default About;
