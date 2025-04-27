import { motion } from "framer-motion";
import React from "react";

export default function Card({ review }) {
    const renderStars = (rating) => {
        const totalStars = 5; // Total number of stars
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            if (i <= rating) {
                stars.push(
                    <span key={i} className="text-yellow-500">
                        ★
                    </span>
                ); // Filled star
            } else {
                stars.push(
                    <span key={i} className="text-gray-300">
                        ☆
                    </span>
                ); // Empty star
            }
        }

        return stars;
    };

    return (
        <div className="flex justify-center items-center bg-gray-100">
            <motion.div
                className="rounded-md flex flex-col w-screen justify-center items-center text-white font-bold text-lg p-4"
                style={{
                    width: 700,
                    height: 200,
                    backgroundColor: "#2E8457",
                }}
                transition={{
                    duration: 0.3,
                    ease: "easeOut",
                }}
            >
                {/* ✍️ You can put anything here */}
                <div className="flex space-x-1">
                    {renderStars(review.rating)}
                </div>

                <h3>{review.reviewer_name}</h3>
                <p>{review.review}</p>
            </motion.div>
        </div>
    );
}
