import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    // Check scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            className={`fixed w-full top-0 left-0 z-50 transition-colors duration-500 ${
                isScrolled ? "bg-white shadow-md" : "bg-transparent"
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="container mx-auto flex justify-between items-center px-4 py-4 pb-2">
                {/* Logo */}
                <div className="text-4xl font-bold text-green-700">
                    RealEstate
                </div>

                {/* Navigation Links */}
                <div className="flex space-x-8">
                    <a
                        href="#home"
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
                        href="#listings"
                        className="text-gray-700 hover:text-green-700 font-medium"
                    >
                        Listings
                    </a>
                    <a
                        href="#contact"
                        className="text-gray-700 hover:text-green-700 font-medium"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </motion.nav>
    );
}

export default Navbar;
