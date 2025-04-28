import { motion } from "framer-motion";
import React, { useState } from "react";
import Layout from "../Layouts/Layout";

export default function Projects({ projects }) {
    const [previewImage, setPreviewImage] = useState(null); // manage current previewed image

    const handlePreview = (image) => {
        setPreviewImage(image);
    };

    return (
        <>
            <Layout />
            <motion.div
                className="flex justify-between space-x-7"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="container mx-auto px-2 py-10 pt-22 flex flex-col space-y-20">
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                                >
                                    <figure>
                                        <img
                                            src={project.image_path}
                                            alt="Project Cover"
                                            className="w-full h-60 object-cover rounded-t-lg"
                                        />
                                    </figure>
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {project.name}
                                        </h2>
                                        <p>
                                            {project.description
                                                .split(" ")
                                                .slice(0, 20)
                                                .join(" ")}
                                            ...
                                        </p>
                                        <div className="card-actions justify-end">
                                            <button
                                                className="btn bg-green-600 hover:bg-secondary-focus text-white"
                                                onClick={() => {
                                                    setPreviewImage(
                                                        project.allImages[0]
                                                    ); // Default first image
                                                    document
                                                        .getElementById(
                                                            `my_modal_${project.id}`
                                                        )
                                                        .showModal();
                                                }}
                                            >
                                                Details
                                            </button>
                                            <dialog
                                                id={`my_modal_${project.id}`}
                                                className="modal"
                                            >
                                                <div className="modal-box w-11/12 max-w-5xl">
                                                    {/* Preview Image */}
                                                    {previewImage && (
                                                        <div className="w-full mb-4">
                                                            <motion.img
                                                                key={
                                                                    previewImage
                                                                } // important: triggers re-animation when previewImage changes
                                                                src={
                                                                    previewImage
                                                                }
                                                                alt="Preview"
                                                                className="w-full h-100 object-cover rounded-lg"
                                                                initial={{
                                                                    opacity: 0,
                                                                    y: 20,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    y: 0,
                                                                }}
                                                                transition={{
                                                                    duration: 0.5,
                                                                }}
                                                            />
                                                        </div>
                                                    )}

                                                    {/* Thumbnail Buttons */}
                                                    <div className="flex flex-wrap justify-center gap-2 py-2">
                                                        {project.allImages.map(
                                                            (image, index) => (
                                                                <button
                                                                    type="button"
                                                                    key={index}
                                                                    onClick={() =>
                                                                        handlePreview(
                                                                            image
                                                                        )
                                                                    }
                                                                    className={`btn btn-xs ${
                                                                        previewImage ===
                                                                        image
                                                                            ? "btn-success text-white"
                                                                            : "btn-ghost text-gray-500"
                                                                    }`}
                                                                >
                                                                    {index + 1}
                                                                </button>
                                                            )
                                                        )}
                                                    </div>

                                                    {/* Project Details */}
                                                    <h3 className="font-bold text-lg mt-4">
                                                        {project.name}
                                                    </h3>
                                                    <p className="py-4">
                                                        {project.description}
                                                    </p>

                                                    {/* Modal Close Button */}
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            <button className="btn">
                                                                Close
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
