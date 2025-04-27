import React from "react";

export default function Projects({ projects }) {
    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-6">Projects</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="border rounded-lg p-4 shadow"
                    >
                        <img
                            src={project.image_path}
                            alt={project.name}
                            className="w-full h-48 object-cover mb-4"
                        />
                        <h2 className="text-2xl font-semibold">
                            {project.name}
                        </h2>
                        <p>Rating: {project.reviews_avg_rating.toFixed(1)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
