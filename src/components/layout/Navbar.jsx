import { useState, useEffect } from "react";
import Container from "../common/Container";
import MobileMenu from "./MobileMenu";
import { navLinks } from "../../data/navLinks";
import logo from "../../assets/images/logo.png";
import { useScrollSpy } from "../../hooks/useScrollSpy";

/** Stable array of section IDs derived from navLinks — computed once at module level */
const SECTION_IDS = navLinks.map((l) => l.href.replace("#", ""));

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS, "home");

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 transition-all duration-300 flex">
        <Container>
          <nav
            aria-label="Main navigation"
            className="flex items-center justify-between mt-5 py-3 px-4 bg-white rounded-full"
          >
            {/* Logo */}
            <a
              href="#home"
              aria-label="Verify home"
              className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 rounded-xl"
            >
              <img
                src={logo}
                alt="Verify"
                className="h-8 w-auto object-contain"
                draggable={false}
              />
            </a>

            {/* Desktop nav links */}
            <ul className="hidden items-center gap-5 lg:flex">
              {navLinks.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeSection === id;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={`text-[14px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 rounded-md ${
                        isActive
                          ? "text-amber font-medium"
                          : "text-[#929292] hover:text-ink font-normal"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Right: Sign In CTA + hamburger */}
            <div className="flex items-center gap-3">
              {/* Sign In — navy pill */}
              <a
                href="#contact"
                className="hidden group items-center gap-1 rounded-full px-3.5 py-2.5 text-[14px] font-normal text-white leading-1
                bg-[linear-gradient(292deg,#0A192F_0%,#002966_50%,#002966_100%)] bg-[length:200%_100%] bg-[100%] hover:bg-left transition-[background-position] duration-500
                active:scale-95 lg:inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
              >
                Sign In
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 group-hover:rotate-45 duration-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>

              {/* Mobile hamburger */}
              <div className="relative">
                <button
                  id="mobile-menu-toggle"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                  className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-lg lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2"
                >
                  <span
                    className={`block h-[2px] w-5 rounded-full bg-ink transition-all duration-300 ${
                      menuOpen ? "translate-y-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-5 rounded-full bg-ink transition-all duration-300 ${
                      menuOpen ? "opacity-0 scale-x-0" : ""
                    }`}
                  />
                  <span
                    className={`block h-[2px] w-5 rounded-full bg-ink transition-all duration-300 ${
                      menuOpen ? "-translate-y-[7px] -rotate-45" : ""
                    }`}
                  />
                </button>

                <MobileMenu
                  isOpen={menuOpen}
                  onClose={() => setMenuOpen(false)}
                  activeSection={activeSection}
                />
              </div>
            </div>
          </nav>
        </Container>
      </header>
    </>
  );
};

export default Navbar;