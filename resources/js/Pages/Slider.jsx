import { motion } from "framer-motion";
import React from "react";

export default function Slider({ projects }) {
    return (
        <>
            <motion.div
                className="w-full"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            >
                <div className="carousel w-full h-96">
                    {/* Slide 1 */}
                    <div
                        id="slide1"
                        className="carousel-item relative w-full h-96 overflow-hidden"
                    >
                        <div className="relative w-full h-96">
                            <a href="#" className="block relative w-full h-96">
                                {/* Consistent Image Styling */}
                                <img
                                    src={projects[0].image_path}
                                    className="w-full h-full object-cover opacity-70"
                                    alt={projects[0].name}
                                />
                                {/* Title Text */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <h2 className="text-green-900 text-3xl font-bold bg-amber-50">
                                        {projects[0].name}
                                    </h2>
                                </div>
                            </a>
                            <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                                <a href="#slide4" className="btn btn-circle">
                                    ❮
                                </a>
                                <a href="#slide2" className="btn btn-circle">
                                    ❯
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Slide 2 */}
                    <div
                        id="slide2"
                        className="carousel-item relative w-full h-96 overflow-hidden"
                    >
                        <a href="#" className="block relative w-full h-96">
                            <img
                                src={projects[1].image_path}
                                className="w-full h-full object-cover opacity-70"
                                alt={projects[1].name}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-green-900 text-3xl font-bold bg-amber-50">
                                    {projects[1].name}
                                </h2>
                            </div>
                        </a>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide1" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide3" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>

                    {/* Slide 3 */}
                    <div
                        id="slide3"
                        className="carousel-item relative w-full h-96 overflow-hidden"
                    >
                        <a href="#" className="block relative w-full h-96">
                            <img
                                src={projects[2].image_path}
                                className="w-full h-full object-cover opacity-70"
                                alt={projects[2].name}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-green-900 text-3xl font-bold bg-amber-50">
                                    {projects[2].name}
                                </h2>
                            </div>
                        </a>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide2" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide4" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>

                    {/* Slide 4 */}
                    <div
                        id="slide4"
                        className="carousel-item relative w-full h-96 overflow-hidden"
                    >
                        <a href="#" className="block relative w-full h-96">
                            <img
                                src={projects[3].image_path}
                                className="w-full h-full object-cover opacity-70"
                                alt={projects[3].name}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h2 className="text-green-900 text-3xl font-bold bg-amber-50">
                                    {projects[3].name}
                                </h2>
                            </div>
                        </a>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                            <a href="#slide3" className="btn btn-circle">
                                ❮
                            </a>
                            <a href="#slide1" className="btn btn-circle">
                                ❯
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
