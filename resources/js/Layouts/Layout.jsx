import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // Optional: lucide icons (or use your own)
import React, { useEffect, useState } from "react";

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <motion.nav
            className={`fixed w-full top-0 left-0 z-50 transition-colors duration-500 ${
                isScrolled ? "bg-white shadow-md" : "bg-transparent"
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="container mx-auto flex justify-between items-center px-4 py-4">
                {/* Logo */}
                <div className="text-2xl md:text-4xl font-bold text-green-700">
                    <a href="/">RealEstate</a>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-8">
                    <a
                        href="/"
                        className="text-gray-700 hover:text-green-700 font-medium"
                    >
                        Home
                    </a>
                    <a
                        href="/projects"
                        className="text-gray-700 hover:text-green-700 font-medium"
                    >
                        Projects
                    </a>
                    <a
                        href="/contact"
                        className="text-gray-700 hover:text-green-700 font-medium"
                    >
                        Contact
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Links */}
            {isMenuOpen && (
                <div className="md:hidden px-4 pb-4 bg-white shadow-md">
                    <a
                        href="/"
                        className="block py-2 text-gray-700 hover:text-green-700"
                    >
                        Home
                    </a>
                    <a
                        href="/projects"
                        className="block py-2 text-gray-700 hover:text-green-700"
                    >
                        Projects
                    </a>
                    <a
                        href="/contact"
                        className="block py-2 text-gray-700 hover:text-green-700"
                    >
                        Contact
                    </a>
                </div>
            )}
        </motion.nav>
    );
}

export default Navbar;
