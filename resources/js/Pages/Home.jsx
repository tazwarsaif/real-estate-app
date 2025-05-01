import Layout from "@/Layouts/Layout.jsx";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Footer from "../Layouts/Footer.jsx";
import Card from "./Card.jsx";
import Slider from "./Slider.jsx";
import { router } from "@inertiajs/react";

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
                scrollContainer.scrollLeft += 1; // Scroll 1px at a time
                scrollAmount += 1;

                // Reset the scroll when it reaches the end
                if (scrollAmount >= scrollContainer.scrollWidth) {
                    scrollContainer.scrollLeft = 0;
                    scrollAmount = 0;
                }
            }
        };

        // Set interval for auto-scroll
        const scrollInterval = setInterval(scrollCards, 10); // Scroll every 10ms (adjust speed here)

        // Clear the interval on unmount
        return () => clearInterval(scrollInterval);
    }, []);
    const handleClick = () => {
        if (searchProject != null) {
            router.visit(`/projects?search=${searchProject}&category=All`);
        } else {
            router.visit(`/projects?search=&category=All`);
        }
    };
    return (
        <>
            <Layout />
            <div className="container mx-auto px-2 py-10 pt-22 flex flex-col space-y-20">
                {/* Top Section */}
                <motion.div
                    className="flex justify-between space-x-7"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    {/* Left Image */}
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    >
                        <img
                            src="/storage/landing/index.png"
                            alt="Building image"
                            className="h-170"
                        />
                    </motion.div>

                    {/* Right Content */}
                    <motion.div
                        className="flex flex-col justify-center items-end w-xl"
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        {/* Heading */}
                        <div className="text-right mt-5">
                            <h1 className="text-4xl font-bold">
                                Find your perfect place to call{" "}
                                <span className="text-5xl font-bold text-green-700">
                                    home
                                </span>
                            </h1>
                        </div>

                        {/* Paragraph */}
                        <p className="text-right mt-3 text-xl">
                            Whether you're buying, renting, or investing,
                            explore stunning properties handpicked to match your
                            lifestyle. With trusted agents and seamless tools,
                            your dream home is just a few clicks away.
                        </p>

                        {/* Search Input */}
                        <div className="join mt-4">
                            <div>
                                <label className="input validator join-item">
                                    <input
                                        type="email"
                                        required
                                        className="text-xl p-2 py-3"
                                        placeholder="Enter a project name"
                                        name="project_name"
                                        onChange={settingText}
                                    />
                                </label>
                                <div className="validator-hint hidden">
                                    Enter a name of project
                                </div>
                            </div>
                            <button
                                className="btn btn-neutral join-item"
                                onClick={handleClick}
                            >
                                Search
                            </button>
                        </div>
                        <a
                            className="btn bg-black text-white join-item mt-3 rounded-3xl"
                            href="/projects"
                        >
                            >> See All Projects
                        </a>
                    </motion.div>
                </motion.div>

                {/* Featured Section */}
                <motion.div
                    className="w-full"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    <h1 className="text-4xl font-bold text-center mt-5">
                        Contruction Projects
                    </h1>

                    <div className="grid grid-cols-3 gap-4 mt-5">
                        {/* Featured items here later */}
                    </div>

                    {/* Stats Section */}
                    <motion.div
                        className="flex justify-center mt-10"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="stats shadow">
                            {/* Stat 1 */}
                            <div className="stat w-xl">
                                <div className="stat-figure text-primary">
                                    <img
                                        src="/storage/landing/houseBuilding.png"
                                        alt="house building"
                                        height="50"
                                        width="50"
                                    />
                                </div>
                                <div className="stat-title">
                                    Total Residential Projects
                                </div>
                                <div className="stat-value text-primary">
                                    {residentialProjects}
                                </div>
                            </div>

                            {/* Stat 2 */}
                            <div className="stat w-xl">
                                <div className="stat-figure text-accent">
                                    <img
                                        src="/storage/landing/commercialBuilding.png"
                                        alt="commercial building"
                                        height="50"
                                        width="50"
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
                </motion.div>

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

                <h1 className="text-4xl font-bold text-center mt-5">
                    Explore Our Featured Projects
                </h1>

                <Slider projects={mostRatedProjects} />

                <h1 className="text-4xl font-bold text-center mt-5">
                    Testimonials
                </h1>

                <motion.div
                    className="w-full"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                >
                    {/* Stats Section */}
                    <motion.div
                        className="flex justify-start space-x-5 overflow-hidden w-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Card components inside a wrapper with animation */}
                        <motion.div
                            className="flex space-x-5 animate-scroll"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            {reviews.map((review) => (
                                <Card
                                    key={review.id}
                                    review={review}
                                    className="w-1/3"
                                />
                            ))}
                            {/* Add more Card components here if needed */}
                        </motion.div>
                    </motion.div>
                </motion.div>

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
                        <div className="hero h-screen">
                            <div className="hero-content flex-col lg:flex-row-reverse">
                                <img
                                    src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29udGFjdCUyMHVzfGVufDB8fDB8fHww"
                                    className="max-w-sm rounded-lg shadow-2xl"
                                />
                                <div>
                                    <h1 className="text-5xl font-bold">
                                        Contact Us
                                    </h1>
                                    <p className="py-6 text-2xl">
                                        Provident cupiditate voluptatem et in.
                                        Quaerat fugiat ut assumenda excepturi
                                        exercitationem quasi. In deleniti eaque
                                        aut repudiandae et a id nisi.
                                        <ul>
                                            <li>
                                                # Need help or looking for a
                                                quote?
                                            </li>
                                            <li>
                                                # Fill out the form below and
                                                we’ll be in touch as soon as
                                                possible.
                                            </li>
                                            <li>
                                                # Or give us a call at [Your
                                                Phone Number].
                                            </li>
                                        </ul>
                                    </p>
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="h-100 w-100 flex p-10 items-center justify-center cursor-pointer rounded-4xl border-2 border-transparent bg-green-600 text-white transition-all duration-200 hover:border-green-600 hover:bg-white hover:text-green-600 md:h-12 md:w-12"
                                    >
                                        <a
                                            href="/contact"
                                            className="text-center"
                                        >
                                            Get Started
                                        </a>
                                    </motion.div>

                                    <div className="flex"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            <Footer></Footer>
        </>
    );
}

export default Home;
