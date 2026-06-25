// import { useState } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import { sidebarCategories } from "../data/products";
// import { useAuth } from "../context/AuthContext";

// // Inline icon helper (no icon library — keeps deps minimal).
// const Icon = ({ path, className = "h-6 w-6" }) => (
//   <svg
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="1.7"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className={className}
//     aria-hidden="true"
//   >
//     {path}
//   </svg>
// );

// const icons = {
//   search: <path d="M21 21l-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />,
//   user: (
//     <>
//       <circle cx="12" cy="8" r="4" />
//       <path d="M4 21a8 8 0 0 1 16 0" />
//     </>
//   ),
//   message: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
//   orders: (
//     <>
//       <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
//       <path d="M3 6h18M16 10a4 4 0 0 1-8 0" />
//     </>
//   ),
//   cart: (
//     <>
//       <circle cx="9" cy="21" r="1" />
//       <circle cx="20" cy="21" r="1" />
//       <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
//     </>
//   ),
//   logout: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />,
//   admin: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
//   menu: <path d="M3 12h18M3 6h18M3 18h18" />,
//   close: <path d="M18 6L6 18M6 6l12 12" />,
//   chevron: <path d="M6 9l6 6 6-6" />,
// };

// // Generic informational icons (kept from before)
// const actions = [
//   { key: "message", label: "Message", icon: icons.message, to: "/" },
//   { key: "orders", label: "Orders", icon: icons.orders, to: "/" },
// ];

// const navLinks = [
//   { label: "Hot offers", to: "/products" },
//   { label: "Gift boxes", to: "/products" },
//   { label: "Projects", to: "/products" },
//   { label: "Menu item", to: "/products" },
//   { label: "Help", to: "/products", caret: true },
// ];

// export default function Navbar() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const navigate = useNavigate();
//   const { user, logout } = useAuth();

//   // Submit the search bar -> go to the listing page with a ?search= param
//   const handleSearch = (e) => {
//     e.preventDefault();
//     const q = query.trim();
//     navigate(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
//     setMobileOpen(false);
//   };

//   const handleLogout = () => {
//     logout();
//     setMobileOpen(false);
//     navigate("/");
//   };

//   return (
//     <header className="sticky top-0 z-40 w-full bg-white">
//       {/* ---- Top bar: logo + search + actions ---- */}
//       <div className="border-b border-gray-200">
//         <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
//           {/* Mobile menu toggle */}
//           <button
//             type="button"
//             className="lg:hidden"
//             onClick={() => setMobileOpen((v) => !v)}
//             aria-label="Toggle menu"
//           >
//             <Icon path={mobileOpen ? icons.close : icons.menu} />
//           </button>

//           {/* Logo */}
//           <Link to="/" className="flex shrink-0 items-center gap-2">
//             <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
//               <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
//                 <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zM14 3h7v7h-7V3zm0 11h7v7h-7v-7z" />
//               </svg>
//             </span>
//             <span className="text-xl font-bold text-blue-600">Brand</span>
//           </Link>

//           {/* Search bar (desktop) */}
//           <div className="hidden flex-1 md:block">
//             <form
//               onSubmit={handleSearch}
//               className="flex w-full rounded-md border-2 border-blue-600"
//             >
//               <input
//                 type="text"
//                 placeholder="Search"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 className="w-full rounded-l-md px-3 py-2 text-sm focus:outline-none"
//               />
//               <div className="relative flex items-center border-l border-gray-200">
//                 <select
//                   className="h-full cursor-pointer appearance-none bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:outline-none"
//                   defaultValue=""
//                 >
//                   <option value="">All category</option>
//                   {sidebarCategories.slice(0, 8).map((c) => (
//                     <option key={c} value={c}>
//                       {c}
//                     </option>
//                   ))}
//                 </select>
//                 <span className="pointer-events-none absolute right-2 text-gray-400">
//                   <Icon path={icons.chevron} className="h-4 w-4" />
//                 </span>
//               </div>
//               <button
//                 type="submit"
//                 className="rounded-r-md bg-blue-600 px-6 text-sm font-medium text-white hover:bg-blue-700"
//               >
//                 Search
//               </button>
//             </form>
//           </div>

//           {/* Action icons + auth */}
//           <nav className="ml-auto flex items-center gap-4 text-gray-500 sm:gap-5 md:ml-0">
//             {actions.map((a) => (
//               <Link
//                 key={a.key}
//                 to={a.to}
//                 className="hidden flex-col items-center text-[11px] hover:text-blue-600 sm:flex"
//               >
//                 <Icon path={a.icon} className="h-5 w-5" />
//                 <span>{a.label}</span>
//               </Link>
//             ))}

//             {/* Cart (always visible) */}
//             <Link
//               to="/cart"
//               className="flex flex-col items-center text-[11px] hover:text-blue-600"
//             >
//               <Icon path={icons.cart} className="h-5 w-5" />
//               <span>My cart</span>
//             </Link>

//             {/* Auth area (sm and up) */}
//             {user ? (
//               <>
//                 <Link
//                   to="/profile"
//                   className="hidden flex-col items-center text-[11px] hover:text-blue-600 sm:flex"
//                 >
//                   <Icon path={icons.user} className="h-5 w-5" />
//                   <span className="max-w-[70px] truncate">
//                     {user.name.split(" ")[0]}
//                   </span>
//                 </Link>
//                 <Link
//                   to="/admin"
//                   className="hidden flex-col items-center text-[11px] hover:text-blue-600 sm:flex"
//                 >
//                   <Icon path={icons.admin} className="h-5 w-5" />
//                   <span>Admin</span>
//                 </Link>
//                 <button
//                   onClick={handleLogout}
//                   className="hidden flex-col items-center text-[11px] hover:text-red-500 sm:flex"
//                 >
//                   <Icon path={icons.logout} className="h-5 w-5" />
//                   <span>Logout</span>
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link
//                   to="/login"
//                   className="hidden flex-col items-center text-[11px] hover:text-blue-600 sm:flex"
//                 >
//                   <Icon path={icons.user} className="h-5 w-5" />
//                   <span>Login</span>
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="hidden rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 sm:block"
//                 >
//                   Sign up
//                 </Link>
//               </>
//             )}
//           </nav>
//         </div>
//       </div>

//       {/* ---- Mobile search ---- */}
//       <div className="border-b border-gray-200 px-4 py-2 md:hidden">
//         <form
//           onSubmit={handleSearch}
//           className="flex rounded-md border-2 border-blue-600"
//         >
//           <input
//             type="text"
//             placeholder="Search"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="w-full rounded-l-md px-3 py-2 text-sm focus:outline-none"
//           />
//           <button
//             type="submit"
//             className="rounded-r-md bg-blue-600 px-4 text-white"
//             aria-label="Search"
//           >
//             <Icon path={icons.search} className="h-5 w-5" />
//           </button>
//         </form>
//       </div>

//       {/* ---- Second nav row (desktop) ---- */}
//       <div className="hidden border-b border-gray-200 lg:block">
//         <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-2 text-sm text-gray-600">
//           <button className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600">
//             <Icon path={icons.menu} className="h-5 w-5" />
//             All category
//           </button>
//           {navLinks.map((l) => (
//             <Link
//               key={l.label}
//               to={l.to}
//               className="flex items-center gap-1 hover:text-blue-600"
//             >
//               {l.label}
//               {l.caret && <Icon path={icons.chevron} className="h-3 w-3" />}
//             </Link>
//           ))}

//           <div className="ml-auto flex items-center gap-4">
//             <button className="flex items-center gap-1 hover:text-blue-600">
//               English, USD
//               <Icon path={icons.chevron} className="h-3 w-3" />
//             </button>
//             <button className="flex items-center gap-1 hover:text-blue-600">
//               Ship to <span className="text-base">🇩🇪</span>
//               <Icon path={icons.chevron} className="h-3 w-3" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ---- Mobile dropdown menu ---- */}
//       {mobileOpen && (
//         <nav className="border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
//           <ul className="flex flex-col gap-1">
//             {/* Auth section */}
//             {user ? (
//               <>
//                 <li className="px-2 py-1 text-sm text-gray-500">
//                   Hi, <span className="font-medium text-gray-800">{user.name}</span>
//                 </li>
//                 <li>
//                   <Link
//                     to="/profile"
//                     onClick={() => setMobileOpen(false)}
//                     className="block rounded px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//                   >
//                     Profile
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/admin"
//                     onClick={() => setMobileOpen(false)}
//                     className="block rounded px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//                   >
//                     Admin Panel
//                   </Link>
//                 </li>
//                 <li>
//                   <button
//                     onClick={handleLogout}
//                     className="block w-full rounded px-2 py-2 text-left text-sm font-medium text-red-500 hover:bg-red-50"
//                   >
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li>
//                   <Link
//                     to="/login"
//                     onClick={() => setMobileOpen(false)}
//                     className="block rounded px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//                   >
//                     Login
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/signup"
//                     onClick={() => setMobileOpen(false)}
//                     className="block rounded px-2 py-2 text-sm font-medium text-blue-600 hover:bg-gray-50"
//                   >
//                     Sign up
//                   </Link>
//                 </li>
//               </>
//             )}

//             <li className="mt-2 border-t border-gray-100 pt-2">
//               <NavLink
//                 to="/products"
//                 onClick={() => setMobileOpen(false)}
//                 className="block rounded px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//               >
//                 All category
//               </NavLink>
//             </li>
//             {navLinks.map((l) => (
//               <li key={l.label}>
//                 <Link
//                   to={l.to}
//                   onClick={() => setMobileOpen(false)}
//                   className="block rounded px-2 py-2 text-sm text-gray-700 hover:bg-gray-50"
//                 >
//                   {l.label}
//                 </Link>
//               </li>
//             ))}
//             <li className="mt-2 border-t border-gray-100 pt-2 text-xs font-semibold uppercase text-gray-400">
//               Categories
//             </li>
//             {sidebarCategories.map((c) => (
//               <li key={c}>
//                 <Link
//                   to="/products"
//                   onClick={() => setMobileOpen(false)}
//                   className="block rounded px-2 py-2 text-sm text-gray-600 hover:bg-gray-50"
//                 >
//                   {c}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       )}
//     </header>
//   );
// }



import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { sidebarCategories } from "../data/products";
import { useAuth } from "../context/AuthContext";
import {
  Search,
  User,
  ShoppingCart,
  LogOut,
  Shield,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

const navLinks = [
  // f// { label: "Help", to: "/products", caret: true },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/products?search=${encodeURIComponent(q)}` : "/products");
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white">

      {/* ── Top bar ── */}
      <div className="border-b border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">

          {/* Hamburger (mobile) */}
          <button
            type="button"
            className="lg:hidden text-gray-600 hover:text-blue-600"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zM14 3h7v7h-7V3zm0 11h7v7h-7v-7z" />
              </svg>
            </span>
            <span className="text-xl font-bold text-blue-600">Brand</span>
          </Link>

          {/* Search bar (desktop) */}
          <div className="hidden flex-1 md:block">
            <form
              onSubmit={handleSearch}
              className="flex w-full rounded-md border-2 border-blue-600"
            >
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-l-md px-3 py-2 text-sm focus:outline-none"
              />
              <div className="relative flex items-center border-l border-gray-200">
                <select
                  className="h-full cursor-pointer appearance-none bg-white py-2 pl-3 pr-8 text-sm text-gray-700 focus:outline-none"
                  defaultValue=""
                >
                  <option value="">All category</option>
                  {sidebarCategories.slice(0, 8).map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2 text-gray-400">
                  <ChevronDown size={16} />
                </span>
              </div>
              <button
                type="submit"
                className="rounded-r-md bg-blue-600 px-6 text-sm font-medium text-white hover:bg-blue-700"
              >
                Search
              </button>
            </form>
          </div>

          {/* Action icons */}
          <nav className="ml-auto flex items-center gap-4 text-gray-500 sm:gap-5 md:ml-0">

            {/* Cart — always visible */}
            <Link
              to="/cart"
              className="flex flex-col items-center text-[11px] hover:text-blue-600"
            >
              <ShoppingCart size={20} />
              <span>My cart</span>
            </Link>

            {/* Logged in */}
            {user ? (
              <>
                {/* Profile */}
                <Link
                  to="/profile"
                  className="hidden flex-col items-center text-[11px] hover:text-blue-600 sm:flex"
                >
                  <User size={20} />
                  <span className="max-w-[70px] truncate">
                    {user.name.split(" ")[0]}
                  </span>
                </Link>

                {/* Admin — sirf admin role wale ko */}
                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    className="hidden flex-col items-center text-[11px] hover:text-blue-600 sm:flex"
                  >
                    <Shield size={20} />
                    <span>Admin</span>
                  </Link>
                )}

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="hidden flex-col items-center text-[11px] hover:text-red-500 sm:flex"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden flex-col items-center text-[11px] hover:text-blue-600 sm:flex"
                >
                  <User size={20} />
                  <span>Login</span>
                </Link>
                <Link
                  to="/signup"
                  className="hidden rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 sm:block"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* ── Mobile search ── */}
      <div className="border-b border-gray-200 px-4 py-2 md:hidden">
        <form
          onSubmit={handleSearch}
          className="flex rounded-md border-2 border-blue-600"
        >
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-l-md px-3 py-2 text-sm focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-r-md bg-blue-600 px-4 text-white"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </form>
      </div>

      {/* ── Second nav row (desktop) ── */}
      <div className="hidden border-b border-gray-200 lg:block">
        <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-2 text-sm text-gray-600">
          <button className="flex items-center gap-2 font-medium text-gray-700 hover:text-blue-600">
            <Menu size={20} />
            All category
          </button>
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className="flex items-center gap-1 hover:text-blue-600"
            >
              {l.label}
              {l.caret && <ChevronDown size={12} />}
            </Link>
          ))}

          <div className="ml-auto flex items-center gap-4">
            <button className="flex items-center gap-1 hover:text-blue-600">
              {/* English, USD <ChevronDown size={12} /> */}
            </button>
            <button className="flex items-center gap-1 hover:text-blue-600">
              {/* Ship to <span className="text-base">🇩🇪</span> */}
              {/* <ChevronDown size={12} /> */}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile dropdown menu ── */}
      {mobileOpen && (
        <nav className="border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <ul className="flex flex-col gap-1">

            {user ? (
              <>
                <li className="px-2 py-1 text-sm text-gray-500">
                  Hi, <span className="font-medium text-gray-800">{user.name}</span>
                </li>
                <li>
                  <Link
                    to="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Profile
                  </Link>
                </li>

                {/* Admin link mobile — sirf admin ko */}
                {user.role === "admin" && (
                  <li>
                    <Link
                      to="/admin"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                      Admin Panel
                    </Link>
                  </li>
                )}

                <li>
                  <button
                    onClick={handleLogout}
                    className="block w-full rounded px-2 py-2 text-left text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded px-2 py-2 text-sm font-medium text-blue-600 hover:bg-gray-50"
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}

            <li className="mt-2 border-t border-gray-100 pt-2">
              <NavLink
                to="/products"
                onClick={() => setMobileOpen(false)}
                className="block rounded px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                All category
              </NavLink>
            </li>
            {navLinks.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded px-2 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  {l.label}
                </Link>
              </li>
            ))}

            <li className="mt-2 border-t border-gray-100 pt-2 text-xs font-semibold uppercase text-gray-400">
              Categories
            </li>
            {sidebarCategories.map((c) => (
              <li key={c}>
                <Link
                  to="/products"
                  onClick={() => setMobileOpen(false)}
                  className="block rounded px-2 py-2 text-sm text-gray-600 hover:bg-gray-50"
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
