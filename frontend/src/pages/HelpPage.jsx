import React, { useState } from "react";
import { toast } from "react-toastify";

const HelpPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Our team will reach to you soon");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex bg-[#f4f4f6]">
      {/* Left section */}
      <div className="flex-1 flex flex-col justify-center pl-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">SPIRO Help</h1>
          <p className="text-lg mb-4">How can we help you?</p>
          <div className="flex items-center gap-2 mb-2 text-gray-700"><span>📍</span> Mumbai</div>
          <div className="flex items-center gap-2 mb-2 text-gray-700"><span>✉️</span> spiroedu9@gmail.com</div>
          <div className="flex items-center gap-2 mb-2 text-gray-700"><span>📞</span> 91+ 8452976481</div>
        </div>
      </div>
      {/* Right section */}
      <div className="flex-1 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 w-full max-w-md">
          <label className="block text-sm font-medium mb-1">Name*</label>
          <input
            className="w-full border rounded p-2 mb-3 focus:outline-blue-500"
            placeholder="Full name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label className="block text-sm font-medium mb-1">Email*</label>
          <input
            className="w-full border rounded p-2 mb-3 focus:outline-blue-500"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label className="block text-sm font-medium mb-1">Message*</label>
          <textarea
            className="w-full border rounded p-2 mb-4 min-h-[80px] focus:outline-blue-500"
            placeholder="Write your message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
          >
            SUBMIT <span className="text-lg">&#8594;</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default HelpPage; 