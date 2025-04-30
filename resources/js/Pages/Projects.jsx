import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Layout from "../Layouts/Layout";

export default function Projects({ projects, searchPast }) {
    const [previewImage, setPreviewImage] = useState(null); // manage current previewed image
    const [selectedCategory, setSelectedCategory] = useState("All");
    const handlePreview = (image) => {
        setPreviewImage(image);
    };
    const [search, setSearch] = useState(searchPast ? searchPast : ""); // manage search input
    const settingText = (e) => {
        setSearch(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        router.get(
            `/projects`,
            { search: search, category: selectedCategory },
            {
                preserveState: true,
            }
        );
    };

    const handleCategoryChange = (e) => {
        console.log(e.target.value);
        setSelectedCategory(e.target.value);
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
                        <div className="flex justify-between items-center mb-4 w-full">
                            <form
                                onSubmit={handleSubmit}
                                className="flex justify-center items-center w-full"
                            >
                                <div className="flex justify-center items-center w-full">
                                    <div className="flex justify-items-end w-full max-w-2xl">
                                        <div>
                                            <label className="input">
                                                <svg
                                                    className="h-[1em] opacity-50"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <g
                                                        strokeLinejoin="round"
                                                        strokeLinecap="round"
                                                        strokeWidth="2.5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                    >
                                                        <circle
                                                            cx="11"
                                                            cy="11"
                                                            r="8"
                                                        ></circle>
                                                        <path d="m21 21-4.3-4.3"></path>
                                                    </g>
                                                </svg>
                                                <input
                                                    type="search"
                                                    required
                                                    placeholder="Search"
                                                    value={search}
                                                    name="search"
                                                    onChange={settingText}
                                                />
                                            </label>
                                        </div>

                                        <div>
                                            <button
                                                className="btn bg-green-800 text-white ml-2"
                                                type="submit"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex justify-center items-center">
                                        <select
                                            defaultValue="Pick a color"
                                            className="select"
                                            onChange={handleCategoryChange}
                                            name="category"
                                        >
                                            <option
                                                value="All"
                                                selected={
                                                    selectedCategory === "All"
                                                }
                                            >
                                                All
                                            </option>
                                            <option
                                                selected={
                                                    selectedCategory ===
                                                    "Residential"
                                                }
                                            >
                                                Residential
                                            </option>
                                            <option
                                                selected={
                                                    selectedCategory ===
                                                    "Commercial"
                                                }
                                            >
                                                Commercial
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
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
                                                className="btn bg-green-800 hover:bg-secondary-focus text-white"
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
                                                    <p>
                                                        <strong>
                                                            Building Type:
                                                        </strong>{" "}
                                                        {project.type}
                                                    </p>
                                                    <p>
                                                        <strong>Status:</strong>{" "}
                                                        {project.status ===
                                                        "Active" ? (
                                                            <span className="text-blue-500">
                                                                {project.status}
                                                            </span>
                                                        ) : (
                                                            <span className="text-green-500">
                                                                {project.status}
                                                            </span>
                                                        )}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Number of floors:
                                                        </strong>{" "}
                                                        {project.no_of_floors}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Number of Units:
                                                        </strong>{" "}
                                                        {project.no_of_units ===
                                                        null
                                                            ? "Not Available"
                                                            : project.no_of_units}
                                                    </p>
                                                    <p>
                                                        <strong>Size:</strong>{" "}
                                                        {project.size}
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
