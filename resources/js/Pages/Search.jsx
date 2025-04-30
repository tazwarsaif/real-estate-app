import { router } from "@inertiajs/react";
import React, { useState } from "react";
const Search = () => {
    const [search, setSearch] = useState("");
    const settingText = (e) => {
        setSearch(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        router.get(
            `/projects`,
            { search: search },
            {
                preserveState: true,
            }
        );
    };

    return (
        <>
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
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="m21 21-4.3-4.3"></path>
                                    </g>
                                </svg>
                                <input
                                    type="search"
                                    required
                                    placeholder="Search"
                                    value={search}
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
                        <select defaultValue="Pick a color" className="select">
                            <option disabled={true}>Pick a color</option>
                            <option>Crimson</option>
                            <option>Amber</option>
                            <option>Velvet</option>
                        </select>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Search;
