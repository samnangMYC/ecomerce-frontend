import React, { useState } from "react";
import contactImg from "../../assets/contact.avif";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all fields");
      return;
    }
    setSubmitting(true);

    try {
      const response = await fetch("http://localhost:3001/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`Thanks, ${formData.name}! Your message was sent.`);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(data.message || "Error sending email");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="min-h-screen scroll-smooth flex p-6 flex-col md:flex-row bg-gradient-to-r from-indigo-50 via-white to-indigo-50">
          {/* Left image section */}
          <div className="hidden md:flex md:w-1/2 relative">
            <img
              src={contactImg}
              alt="Contact"
              className="object-cover w-full h-full rounded-l-xl"
            />
            <div className="absolute inset-0  bg-opacity-60 rounded-l-xl flex flex-col justify-center items-center p-10 text-white">
              <h2 className="text-4xl font-extrabold mb-4">
                Let's Build Something Together
              </h2>
              <p className="max-w-xs text-center ">
                Whether you have questions, feedback, or want to collaborate,
                reach out and say hi!
              </p>
            </div>
          </div>

          {/* Form section */}
          <div className="flex-1 flex items-center justify-center p-12">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-lg bg-white rounded-xl shadow-xl p-10 space-y-8"
              noValidate
            >
              <h3 className="text-3xl font-semibold text-gray-800 text-center">
                Contact Us
              </h3>

              {/* Floating label input */}
              {[
                { label: "Name", type: "text", name: "name" },
                { label: "Email", type: "email", name: "email" },
              ].map(({ label, type, name }) => (
                <div key={name} className="relative z-0 w-full group">
                  <input
                    type={type}
                    name={name}
                    id={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                    placeholder=" "
                    disabled={submitting}
                  />
                  <label
                    htmlFor={name}
                    className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    {label}
                  </label>
                </div>
              ))}

              {/* Floating label textarea */}
              <div className="relative z-0 w-full group">
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder=" "
                  disabled={submitting}
                  className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none resize-none focus:outline-none focus:ring-0 focus:border-indigo-600 peer"
                />
                <label
                  htmlFor="message"
                  className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Message
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                  submitting
                    ? "bg-indigo-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Contact;
