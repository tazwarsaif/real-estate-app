import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Footer from "../Layouts/Footer";
import Layout from "../Layouts/Layout";
export default function Projects({ projects, searchPast, category }) {
    let temparr = projects;
    if (typeof projects == "object") {
        temparr = Object.values(projects);
    }
    const [isFocused, setIsFocused] = useState(false);
    const [previewImage, setPreviewImage] = useState(null); // manage current previewed image
    const [selectedCategory, setSelectedCategory] = useState(
        category ? category : "All"
    );
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

    const handleCategoryChange = (e, projects) => {
        setSelectedCategory(e.target.value);
        console.log(e.target.value);
    };

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        // fetch suggestions
        const res = await fetch(`/search/suggestions?q=${value}`);
        const data = await res.json();
        setSuggestions(data);
    };

    return (
        <>
            <div className="flex flex-col justify-between h-screen space-y-52">
                <Layout />
                <div className="container mx-auto px-2 flex flex-col">
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
                                                <div className="relative w-full">
                                                    <label className="input w-full">
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
                                                        <div className="flex flex-col w-full">
                                                            <div>
                                                                <input
                                                                    type="search"
                                                                    placeholder="Search"
                                                                    value={
                                                                        search
                                                                    }
                                                                    name="search"
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        settingText(
                                                                            e
                                                                        );
                                                                        handleInputChange(
                                                                            e
                                                                        );
                                                                    }}
                                                                    onFocus={() =>
                                                                        setIsFocused(
                                                                            true
                                                                        )
                                                                    }
                                                                    onBlur={() =>
                                                                        setTimeout(
                                                                            () =>
                                                                                setIsFocused(
                                                                                    false
                                                                                ),
                                                                            200
                                                                        )
                                                                    } // Delay for click
                                                                    className="relative z-10 p-2 w-full"
                                                                />
                                                            </div>

                                                            {isFocused &&
                                                                suggestions.length >
                                                                    0 && (
                                                                    <ul className="absolute top-full left-0 w-full bg-white shadow-md z-20 max-h-60 overflow-auto">
                                                                        {suggestions.map(
                                                                            (
                                                                                item,
                                                                                index
                                                                            ) => (
                                                                                <li
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="p-2 cursor-pointer hover:bg-gray-200"
                                                                                    onClick={() => {
                                                                                        setSearch(
                                                                                            item
                                                                                        ); // optional: update field
                                                                                        setIsFocused(
                                                                                            false
                                                                                        );
                                                                                        router.get(
                                                                                            `/projects`,
                                                                                            {
                                                                                                search: item,
                                                                                                category:
                                                                                                    selectedCategory,
                                                                                            },
                                                                                            {
                                                                                                preserveState: true,
                                                                                            }
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        item
                                                                                    }
                                                                                </li>
                                                                            )
                                                                        )}
                                                                    </ul>
                                                                )}
                                                        </div>
                                                    </label>
                                                </div>

                                                <div>
                                                    <button
                                                        className="btn bg-green-800 text-white ml-2 mr-3"
                                                        type="submit"
                                                    >
                                                        Search
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="flex justify-center items-center">
                                                <select
                                                    className="select"
                                                    value={selectedCategory}
                                                    onChange={(e) =>
                                                        handleCategoryChange(
                                                            e,
                                                            projects
                                                        )
                                                    }
                                                    name="category"
                                                >
                                                    <option>All</option>
                                                    <option>Residential</option>
                                                    <option>Commercial</option>
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {projects.length == 0 && (
                                        <div className="flex justify-center items-center text-center text-4xl">
                                            <h1 className="text-center mt-7">
                                                No Projects Found
                                            </h1>
                                        </div>
                                    )}
                                    {temparr.map((project) => (
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
                                                                project
                                                                    .allImages[0]
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
                                                        className="modal mb-7"
                                                    >
                                                        <div className="modal-box max-w-5xl">
                                                            {/* Modal Close Button */}
                                                            <div className="modal-action mb-6 md:hidden">
                                                                <form method="dialog">
                                                                    <button className="btn">
                                                                        X
                                                                    </button>
                                                                </form>
                                                            </div>
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
                                                                        className="w-full h-70 md:h-100 object-cover rounded-lg"
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
                                                            <div className="flex flex-wrap justify-center gap-2">
                                                                {project.allImages.map(
                                                                    (
                                                                        image,
                                                                        index
                                                                    ) => (
                                                                        <button
                                                                            type="button"
                                                                            key={
                                                                                index
                                                                            }
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
                                                                            {index +
                                                                                1}
                                                                        </button>
                                                                    )
                                                                )}
                                                            </div>

                                                            {/* Project Details */}
                                                            <div className="max-h-max scroll-auto">
                                                                <h3 className="font-bold text-lg mt-4">
                                                                    {
                                                                        project.name
                                                                    }
                                                                </h3>
                                                                <p>
                                                                    {
                                                                        project.description
                                                                    }
                                                                </p>
                                                                <p>
                                                                    <strong>
                                                                        Building
                                                                        Type:
                                                                    </strong>{" "}
                                                                    {
                                                                        project.type
                                                                    }
                                                                </p>
                                                                <p>
                                                                    <strong>
                                                                        Status:
                                                                    </strong>{" "}
                                                                    {project.status ===
                                                                    "Active" ? (
                                                                        <span className="text-blue-500">
                                                                            {
                                                                                project.status
                                                                            }
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-green-500">
                                                                            {
                                                                                project.status
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </p>
                                                                <p>
                                                                    <strong>
                                                                        Number
                                                                        of
                                                                        floors:
                                                                    </strong>{" "}
                                                                    {
                                                                        project.no_of_floors
                                                                    }
                                                                </p>
                                                                <p>
                                                                    <strong>
                                                                        Number
                                                                        of
                                                                        Units:
                                                                    </strong>{" "}
                                                                    {project.no_of_units ===
                                                                    null
                                                                        ? "Not Available"
                                                                        : project.no_of_units}
                                                                </p>
                                                                <p>
                                                                    <strong>
                                                                        Size:
                                                                    </strong>{" "}
                                                                    {
                                                                        project.size
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="modal-action mb-6">
                                                                <form method="dialog">
                                                                    <button className="btn -mt-14">
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
                </div>
                <Footer></Footer>
            </div>
        </>
    );
}
