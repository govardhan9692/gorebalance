import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, Sun, Moon, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useTheme } from "@/components/shared/ThemeProvider";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Treatments", href: "/treatments" },
  { name: "Gallery", href: "/gallery" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 60);
    });
  }, [scrollY]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full flex justify-center pointer-events-none">
      <motion.div
        animate={{
          width: isScrolled ? "min(1280px, calc(100% - 32px))" : "100%",
          paddingTop: isScrolled ? "12px" : "32px",
          paddingBottom: isScrolled ? "12px" : "32px",
          paddingLeft: isScrolled ? "24px" : "40px",
          paddingRight: isScrolled ? "24px" : "40px",
          y: isScrolled ? 16 : 0,
          backgroundColor: isScrolled ? "rgba(var(--surface-rgb), 0.72)" : "rgba(255, 255, 255, 0)",
          borderRadius: isScrolled ? "999px" : "0px",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "flex items-center justify-between transition-colors pointer-events-auto",
          isScrolled && "glass shadow-lg"
        )}
      >
        <Logo className={cn("transition-colors", !isScrolled && "text-white")} />

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "relative group font-jakarta text-[15px] font-medium transition-colors",
                isScrolled ? "text-text" : "text-white/90 hover:text-white"
              )}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-full" />
              {link.name === "Home" && (
                <span className="absolute -right-2 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className={cn(
              "p-2 rounded-full transition-colors relative overflow-hidden",
              isScrolled ? "hover:bg-primary/10" : "hover:bg-white/10"
            )}
            aria-label="Toggle theme"
          >
            <div className="relative w-5 h-5">
              <motion.div
                animate={{
                  rotate: theme === "dark" ? 0 : 90,
                  opacity: theme === "dark" ? 1 : 0,
                  scale: theme === "dark" ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Moon className={cn("w-5 h-5", isScrolled ? "text-text" : "text-white")} />
              </motion.div>
              <motion.div
                animate={{
                  rotate: theme === "dark" ? -90 : 0,
                  opacity: theme === "dark" ? 0 : 1,
                  scale: theme === "dark" ? 0 : 1,
                }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Sun className={cn("w-5 h-5", isScrolled ? "text-text" : "text-white")} />
              </motion.div>
            </div>
          </button>

          <button className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-accent text-white rounded-pill font-jakarta text-[14px] font-semibold transition-all hover:scale-105 active:scale-95 group">
            Start My Assessment
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className={cn("w-6 h-6", isScrolled || isMenuOpen ? "text-text" : "text-white")} />
            ) : (
              <Menu className={cn("w-6 h-6", isScrolled ? "text-text" : "text-white")} />
            )}
          </button>
        </div>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden bg-bg/95 backdrop-blur-xl flex flex-col pt-32 px-8 pb-12"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="font-fraunces text-4xl font-semibold text-text"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-8">
              <button className="w-full py-4 bg-accent text-white rounded-pill font-jakarta text-lg font-semibold">
                Start My Assessment
              </button>
              <div className="text-center">
                <p className="font-jakarta text-sm text-text-muted mb-1">Questions? Call us</p>
                <a href="tel:+919390414536" className="font-fraunces text-2xl text-text">
                  +91 93904 14536
                </a>
                <p className="mt-2 text-[13px] text-text-muted">Hyderabad, Telangana · Kakinada, Andhra Pradesh</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
