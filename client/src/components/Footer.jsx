import { Link } from "react-router-dom";

const SocialIcon = ({ children }) => (
  <a
    href="#"
    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 text-gray-700 transition hover:bg-blue-600 hover:text-white"
    aria-label="social link"
  >
    {children}
  </a>
);

const StoreBadge = ({ store }) => (
  <a
    href="#"
    className="flex w-36 items-center gap-2 rounded-md bg-gray-900 px-3 py-2 text-white"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      {store === "apple" ? (
        <path d="M16.4 12.8c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8s-1.6-.8-2.7-.8c-1.4 0-2.6.8-3.3 2-1.4 2.5-.4 6.1 1 8.1.7 1 1.4 2.1 2.5 2 1-.1 1.4-.6 2.6-.6s1.5.6 2.6.6 1.8-1 2.5-2c.8-1.1 1.1-2.2 1.1-2.3-.1 0-2.1-.8-2.1-3zM14.6 6.3c.6-.7 1-1.6.9-2.6-.8 0-1.8.6-2.4 1.2-.5.6-1 1.5-.9 2.5.9.1 1.8-.4 2.4-1.1z" />
      ) : (
        <path d="M3.6 2.3c-.3.3-.5.7-.5 1.3v16.8c0 .6.2 1 .5 1.3l.1.1L13 12.1v-.2L3.7 2.2l-.1.1zM16.5 15.2L13.6 12.3v-.6l2.9-2.9.1.1 3.5 2c1 .6 1 1.5 0 2.1l-3.6 2.2zM13.6 12.6l2.9 2.9-9.2 5.3c-.3.2-.7.2-.9 0l7.2-8.2zM6.4 2.4c-.3-.2-.6-.2-.9 0l9.2 5.3-2.9 2.9L6.4 2.4z" />
      )}
    </svg>
    <span className="text-left text-[10px] leading-tight">
      <span className="block opacity-80">
        {store === "apple" ? "Download on the" : "Get it on"}
      </span>
      <span className="block text-sm font-semibold">
        {store === "apple" ? "App Store" : "Google Play"}
      </span>
    </span>
  </a>
);

const footerColumns = [
  { title: "About", links: ["About Us", "Find store", "Categories", "Blogs"] },
  { title: "Partnership", links: ["About Us", "Find store", "Categories", "Blogs"] },
  {
    title: "Information",
    links: ["Help Center", "Money Refund", "Shipping", "Contact us"],
  },
  {
    title: "For users",
    links: ["Login", "Register", "Settings", "My Orders"],
  },
];

export default function Footer() {
  return (
    <>
      {/* ---- Newsletter band ---- */}
      <section className="bg-gray-100">
        <div className="mx-auto max-w-2xl px-4 py-10 text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Subscribe on our newsletter
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get daily news on upcoming offers from many suppliers all over the
            world
          </p>
          <form
            className="mx-auto mt-5 flex max-w-md gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Email"
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* ---- Main footer ---- */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-3 lg:grid-cols-6">
          {/* Brand + social */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zM14 3h7v7h-7V3zm0 11h7v7h-7v-7z" />
                </svg>
              </span>
              <span className="text-xl font-bold text-blue-600">Brand</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-gray-500">
              Best information about the company goes here but now lorem ipsum is
              the best.
            </p>
            <div className="mt-4 flex gap-2">
              <SocialIcon>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.2c-1.2 0-1.6.8-1.6 1.6V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.8 3.6A11.3 11.3 0 0 1 3.1 4.6a4 4 0 0 0 1.2 5.3c-.6 0-1.2-.2-1.8-.5a4 4 0 0 0 3.2 3.9c-.6.2-1.2.2-1.8.1a4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.6 11.3 11.3 0 0 0 8.1 20c7.3 0 11.4-6.1 11.4-11.4v-.5c.8-.6 1.5-1.3 2-2.2z" />
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm6 0h3.8v1.7h.05c.53-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9V9z" />
                </svg>
              </SocialIcon>
              <SocialIcon>
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.7 3.7 0 0 1-1.4-.9 3.7 3.7 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 5.2a4.6 4.6 0 1 0 0 9.2 4.6 4.6 0 0 0 0-9.2zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.8-7.8a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" />
                </svg>
              </SocialIcon>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold text-gray-700">
                {col.title}
              </h4>
              <ul className="space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link to="/" className="text-gray-500 hover:text-blue-600">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Get app */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-700">Get app</h4>
            <div className="flex flex-col gap-2">
              <StoreBadge store="apple" />
              <StoreBadge store="google" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-200 bg-gray-100">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} Ecommerce.</p>
            <button className="flex items-center gap-1 hover:text-blue-600">
              <span className="text-base">🇺🇸</span> English
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
