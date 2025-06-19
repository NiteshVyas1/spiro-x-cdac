import React, { useState } from "react";
import { toast } from "react-toastify";
import spiro_edu from "../assets/spiro_.png";

const FeedbackPage = () => {
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !feedback) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, feedback }),
      });
      if (response.ok) {
        toast.success("Our team will reach to you soon");
        setSubmitted(true);
        setFeedback("");
        setEmail("");
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to send feedback.");
      }
    } catch (error) {
      toast.error("Failed to send feedback. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f4f4f6]">
      {/* Left section */}
      <div className="flex-1 flex flex-col justify-center pl-16">
        <div className="mb-8">
          <img src={spiro_edu} alt="SPIRO" className="h-12 mb-4" />
          <h1 className="text-3xl font-bold text-blue-700 mb-6">Send feedback to SPIRO</h1>
        </div>
      </div>
      {/* Right section */}
      <div className="flex-1 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-8 w-full max-w-md">
          <label className="block text-sm font-medium mb-1">Email*</label>
          <input
            type="email"
            className="w-full border rounded p-2 mb-3 focus:outline-blue-500"
            placeholder="Your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <label className="block text-lg font-medium mb-2">Describe your feedback</label>
          <textarea
            className="w-full border rounded p-3 mb-2 min-h-[100px] focus:outline-blue-500"
            placeholder="Tell us what prompted this feedback..."
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            required
          />
          <div className="text-xs text-gray-500 mb-4">Please don't include any sensitive information</div>
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

export default FeedbackPage; 