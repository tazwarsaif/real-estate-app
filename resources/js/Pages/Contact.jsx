import Layout from "@/Layouts/Layout.jsx";
import React from "react";
import Footer from "../Layouts/Footer.jsx";
const Contact = () => {
    return (
        <>
            <Layout />
            <div className="container mx-auto px-2 py-10 pt-22 flex flex-col">
                <h1 className="text-3xl">Fill this form to connect with us!</h1>
                <form action="">
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend">
                            What is your name?
                        </legend>
                        <input
                            type="text"
                            className="input"
                            placeholder="Type here"
                        />
                        <p className="label">Optional</p>
                    </fieldset>
                </form>
            </div>

            <div className="flex flex-col justify-end h-screen">
                <Footer />
            </div>
        </>
    );
};

export default Contact;
