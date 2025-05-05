import Layout from "@/Layouts/Layout.jsx";
import { router, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Footer from "../Layouts/Footer.jsx";
const Contact = ({ countries }) => {
    const countryCodes = countries;
    const props = usePage().props;
    const [prefix, setPrefix] = useState("44"); // default: UK
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [formErrors, setFormErrors] = useState({});

    const validateForm = () => {
        const errors = {};

        if (!name.trim()) {
            errors.name = "Name is required.";
        }

        if (!email.trim()) {
            errors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = "Email is invalid.";
        }

        if (!prefix.trim() || !/^\d+$/.test(prefix)) {
            errors.prefix = "Prefix must be numeric.";
        }

        if (!number.trim()) {
            errors.number = "Phone number is required.";
        } else if (!/^\d{7,15}$/.test(number)) {
            errors.number = "Enter a valid phone number.";
        }

        if (!subject.trim()) {
            errors.subject = "Subject is required.";
        }

        if (!message.trim()) {
            errors.message = "Message is required.";
        }

        return errors;
    };

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
        const errors = validateForm();
        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
            console.log(errors);
            return;
        }
        try {
            if (
                name === "" ||
                number === "" ||
                subject === "" ||
                message === "" ||
                email === ""
            ) {
                window.alert("Please fill in all fields");
                return;
            }

            const formData = {
                name,
                number: `${prefix} ${number}`,
                subject,
                message,
                email,
                _token: props.csrf_token,
            };

            const res = router.post(
                "http://127.0.0.1:8000/api/contactpost",
                formData
            );
            console.log(res);
            toast.success("Message has been sent!");
            router.visit("/");
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.error || "Failed to send message"
            );
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
                            {Object.keys(formErrors).length > 0 && (
                                <div role="alert" className="alert alert-error">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 shrink-0 stroke-current"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <ul>
                                        {Object.entries(formErrors).map(
                                            ([key, value]) => (
                                                <li key={key}>{value}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

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
                                        Submit
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
