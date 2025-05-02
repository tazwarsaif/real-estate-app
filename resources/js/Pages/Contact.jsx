import Layout from "@/Layouts/Layout.jsx";
import { router } from "@inertiajs/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Footer from "../Layouts/Footer.jsx";
const Contact = ({ countries }) => {
    const countryCodes = countries;
    const [prefix, setPrefix] = useState("44"); // default: UK
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handlePrefixChange = (e) => {
        setPrefix(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleNumberChange = (e) => {
        setNumber(e.target.value);
    };
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (
                name === "" ||
                number === "" ||
                subject === "" ||
                message === "" ||
                email === ""
            ) {
                toast.error("Please Fill the fields");
                return;
            }
            const formData = {
                name: name,
                number: number,
                subject: subject,
                message: message,
                email: email,
            };
            console.log(formData);
            const res = await fetch("https://http://127.0.0.1:8000/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            console.log(res);
            const data = await res.json();

            if (!res.ok)
                throw new Error(data.error || "Failed to create account");
            toast.success("Message has been sent!");
            router.visit("/home");
            return;
        } catch (error) {
            console.error(error);
            throw error;
        }
    };
    return (
        <>
            <div className="flex flex-col justify-between space-y-52">
                <Layout />
                <div className="container mx-auto px-2 py-10 pt-22 flex flex-col">
                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-w-5xl mx-auto mt-10"
                        >
                            <h1 className="text-3xl pb-7 text-center">
                                Fill this form to connect with us!
                            </h1>
                            <div className="flex flex-col lg:space-x-6 md:flex-row md:justify-around md:space-x-3 space-y-6 md:space-y-0">
                                <div className="flex flex-col space-y-2 w-full md:w-1/2">
                                    <fieldset className="fieldset">
                                        <label className="font-semibold text-lg">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            className="input w-full"
                                            required
                                            placeholder="John Kabir"
                                            onChange={handleNameChange}
                                        />
                                    </fieldset>
                                    <fieldset className="fieldset">
                                        <div className="flex flex-col gap-4 w-full">
                                            <label className="font-semibold text-lg">
                                                Phone Number
                                            </label>
                                            <div className="flex">
                                                <select
                                                    value={prefix}
                                                    onChange={
                                                        handlePrefixChange
                                                    }
                                                    className="border rounded-l-md px-3 py-2 bg-white w-max"
                                                >
                                                    {Object.entries(
                                                        countryCodes
                                                    ).map(([key, label]) => (
                                                        <option
                                                            key={key}
                                                            value={key}
                                                        >
                                                            {label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <input
                                                    type="tel"
                                                    placeholder="Enter number"
                                                    value={number}
                                                    onChange={
                                                        handleNumberChange
                                                    }
                                                    className="input w-full rounded-l-none"
                                                />
                                            </div>

                                            <div className="text-sm text-gray-600">
                                                <strong>Full Number:</strong> +
                                                {prefix} {number}
                                            </div>
                                        </div>
                                    </fieldset>
                                    <fieldset className="fieldset">
                                        <label className="font-semibold text-lg">
                                            Email
                                        </label>
                                        <input
                                            type="mail"
                                            className="input w-full"
                                            required
                                            placeholder="example@gmail.com"
                                            onChange={handleEmailChange}
                                        />
                                    </fieldset>
                                </div>

                                <div className="flex flex-col space-y-2 w-full md:w-1/2">
                                    <fieldset className="fieldset">
                                        <label className="font-semibold text-lg">
                                            Subject
                                        </label>
                                        <input
                                            type="text"
                                            className="input w-full"
                                            required
                                            placeholder="What's on your mind?"
                                            onChange={handleSubjectChange}
                                        />
                                    </fieldset>
                                    <fieldset className="fieldset">
                                        <label className="font-semibold text-lg">
                                            Enter Your Message
                                        </label>
                                        <textarea
                                            className="textarea h-31 w-full text-lg"
                                            placeholder="Enter text"
                                            onChange={handleMessageChange}
                                        ></textarea>
                                    </fieldset>
                                    <button
                                        className="btn btn-outline btn-success w-full self-start"
                                        type="submit"
                                    >
                                        Success
                                    </button>
                                </div>
                            </div>
                        </form>
                    </motion.div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default Contact;
