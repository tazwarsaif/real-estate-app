import Layout from "@/Layouts/Layout.jsx";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Footer from "../Layouts/Footer.jsx";
import Card from "./Card.jsx";
import Slider from "./Slider.jsx";

function Home({
    reviews,
    totalProjects,
    residentialProjects,
    commercialProjects,
    mostRatedProjects,
}) {
    const scrollContainerRef = useRef(null);
    const [searchProject, setSearchProject] = useState("");

    const settingText = (e) => {
        setSearchProject(e.target.value);
    };

    useEffect(() => {
        const scrollContainer = scrollContainerRef.current;
        let scrollAmount = 0;
        const scrollCards = () => {
            if (scrollContainer) {
                scrollContainer.scrollLeft += 1;
                scrollAmount += 1;
                if (scrollAmount >= scrollContainer.scrollWidth) {
                    scrollContainer.scrollLeft = 0;
                    scrollAmount = 0;
                }
            }
        };
        const scrollInterval = setInterval(scrollCards, 10);
        return () => clearInterval(scrollInterval);
    }, []);

    const handleClick = () => {
        const q = searchProject ?? "";
        router.visit(`/projects?search=${q}&category=All`);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Layout />

            <main className="container mx-auto px-4 py-8 mt-12 flex flex-col space-y-16 flex-grow">
                {/* Hero / Top Section */}
                <motion.div
                    className="flex flex-col-reverse lg:flex-row justify-between space-y-10 lg:space-y-0 lg:space-x-7"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Left Image */}
                    <motion.div
                        className="flex justify-center lg:justify-start"
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <img
                            src="/storage/landing/index.png"
                            alt="Building image"
                            className="h-64 mt-7 md:h-96 lg:h-[1000px] object-contain"
                        />
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        className="flex flex-col justify-center items-center lg:items-end w-full"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        <div className="text-center lg:text-right mt-5 px-2">
                            <h1 className="text-3xl md:text-4xl font-bold">
                                Find your perfect place to call{" "}
                                <span className="text-green-700 text-4xl md:text-5xl font-bold">
                                    home
                                </span>
                            </h1>
                            <p className="mt-3 text-base md:text-xl">
                                Whether you're buying, renting, or investing,
                                explore stunning properties...
                            </p>
                        </div>

                        {/* Search Input */}
                        <div className="join mt-4 flex flex-col sm:flex-row items-center">
                            <label className="input validator join-item w-full sm:w-auto mb-3 sm:mb-0">
                                <input
                                    type="text"
                                    className="text-lg p-2 py-3 w-full sm:w-auto"
                                    placeholder="Enter a project name"
                                    onChange={settingText}
                                />
                            </label>
                            <button
                                className="btn btn-neutral join-item w-full sm:w-auto"
                                onClick={handleClick}
                            >
                                Search
                            </button>
                        </div>
                        <a
                            className="btn bg-black text-white mt-3 rounded-3xl w-fit"
                            href="/projects"
                        >
                            &gt;&gt; See All Projects
                        </a>
                    </motion.div>
                </motion.div>

                {/* Featured Projects */}
                <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-2xl sm:text-3xl font-bold text-center">
                        Construction Projects
                    </h2>

                    {/* Stats */}
                    <div className="stats shadow stats-vertical sm:stats-horizontal w-full justify-center">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <img
                                    src="/storage/landing/houseBuilding.png"
                                    alt="residential"
                                    className="h-12 w-12"
                                />
                            </div>
                            <div className="stat-title">
                                Total Residential Projects
                            </div>
                            <div className="stat-value text-primary">
                                {residentialProjects}
                            </div>
                        </div>
                        <div className="stat">
                            <div className="stat-figure text-accent">
                                <img
                                    src="/storage/landing/commercialBuilding.png"
                                    alt="commercial"
                                    className="h-12 w-12"
                                />
                            </div>
                            <div className="stat-title">
                                Total Commercial Projects
                            </div>
                            <div className="stat-value text-accent">
                                {commercialProjects}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    className="w-full"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    {/* Stats Section */}
                    <motion.div
                        className="flex justify-center mt-10"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                            <li>
                                <div className="timeline-middle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="timeline-start mb-10 md:text-end">
                                    <time className="font-mono italic">
                                        1984
                                    </time>
                                    <div className="text-lg text-primary font-black">
                                        Residential Buildings
                                    </div>
                                    The Apple Macintosh—later rebranded as the
                                    Macintosh 128K—is the original Apple
                                    Macintosh personal computer. It played a
                                    pivotal role in establishing desktop
                                    publishing as a general office function. The
                                    motherboard, a 9 in (23 cm) CRT monitor, and
                                    a floppy drive were housed in a beige case
                                    with integrated carrying handle; it came
                                    with a keyboard and single-button mouse.
                                </div>
                                <hr />
                            </li>
                            <li>
                                <hr />
                                <div className="timeline-middle">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <div className="timeline-end md:mb-10">
                                    <time className="font-mono italic">
                                        1998
                                    </time>
                                    <div className="text-lg text-teal-500 font-black">
                                        Commercial Building
                                    </div>
                                    iMac is a family of all-in-one Mac desktop
                                    computers designed and built by Apple Inc.
                                    It has been the primary part of Apple's
                                    consumer desktop offerings since its debut
                                    in August 1998, and has evolved through
                                    seven distinct forms
                                </div>
                                <hr />
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Slider: Featured */}
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                        Explore Our Featured Projects
                    </h2>
                    <Slider projects={mostRatedProjects} />
                </div>

                {/* Testimonials */}
                <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">
                        Testimonials
                    </h2>
                    <div
                        ref={scrollContainerRef}
                        className="flex space-x-4 overflow-x-auto no-scrollbar pb-4"
                    >
                        {reviews.map((rv) => (
                            <Card
                                key={rv.id}
                                review={rv}
                                className="w-64 flex-shrink-0"
                            />
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <motion.div
                    className="flex flex-col lg:flex-row gap-8 items-center lg:items-start"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <img
                        src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e"
                        alt="Contact"
                        className="w-full lg:w-1/2 rounded-lg shadow-lg object-cover max-h-80"
                    />
                    <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
                        <h2 className="text-3xl font-bold">Contact Us</h2>
                        <p className="text-lg">
                            Provident cupiditate voluptatem … in touch as soon
                            as possible.
                        </p>

                        <a
                            href="/contact"
                            className="btn btn-outline btn-success w-full"
                        >
                            📝
                        </a>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}

export default Home;
