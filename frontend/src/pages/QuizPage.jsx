import React, { useState, useEffect } from "react";

// Dummy quiz data (replace with backend data later)
const quizData = [
  {
    question: "During electroplating, why is platinum or carbon commonly used as the anode?",
    options: [
      "They react easily with the electrolyte.",
      "They are cheaper than other metals.",
      "They do not dissolve during the electroplating process.",
      "They enhance the deposition rate.",
    ],
  },
  // Add more questions as needed
  ...Array(19).fill({
    question: "Sample question for layout purposes?",
    options: [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4",
    ],
  }),
];

const TOTAL_TIME = 2 * 60 * 60; // 2 hours in seconds

const QuizPage = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));
  const [timer, setTimer] = useState(TOTAL_TIME);
  const [showSubmit, setShowSubmit] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Timer logic
  useEffect(() => {
    if (timer > 0 && !submitted) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
    if (timer === 0 && !submitted) {
      setShowSubmit(true);
    }
  }, [timer, submitted]);

  // Format timer as HH:MM:SS
  const formatTime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(1, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h} : ${m} : ${s}`;
  };

  // Handle option select
  const handleOptionChange = (optionIdx) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = optionIdx;
    setAnswers(newAnswers);
  };

  // Navigation
  const goToQuestion = (idx) => setCurrentQ(idx);

  // Submit logic
  const handleSubmit = () => {
    setSubmitted(true);
  };

  // Navigation buttons
  const handlePrev = () => setCurrentQ((q) => Math.max(0, q - 1));
  const handleNext = () => setCurrentQ((q) => Math.min(quizData.length - 1, q + 1));

  return (
    <div className="flex min-h-screen bg-[#f4f4f6]">
      {/* Sidebar */}
      <div className="w-[300px] min-h-screen flex flex-col gap-6 p-6">
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-blue-600 font-bold text-lg mb-1">Topic Name</div>
          <div className="text-gray-700">Electrochemistry</div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-blue-600 font-bold text-lg mb-1">Time</div>
          <div className="flex items-center gap-2 text-xl font-mono">
            {formatTime(timer).split(":").map((t, i) => (
              <span key={i} className="bg-gray-100 rounded px-2 py-0.5 shadow-inner">{t.trim()}</span>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-4">
          <div className="text-blue-600 font-bold text-lg mb-2">Questions</div>
          <div className="grid grid-cols-5 gap-2">
            {quizData.map((_, idx) => (
              <button
                key={idx}
                className={`w-9 h-9 rounded border text-base font-semibold transition
                  ${currentQ === idx
                    ? "bg-blue-100 border-blue-600 text-blue-700"
                    : "bg-white border-gray-300 hover:bg-blue-50"}
                  ${answers[idx] !== null && "ring-2 ring-green-400"}
                `}
                onClick={() => goToQuestion(idx)}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start py-12 px-8">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow p-8">
          {!submitted ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <button
                  className="flex items-center gap-1 text-gray-600 font-semibold disabled:text-gray-300"
                  onClick={handlePrev}
                  disabled={currentQ === 0}
                >
                  <span className="text-xl">&#8592;</span> Previous
                </button>
                <div className="font-bold text-2xl text-blue-600">
                  Question no. {currentQ + 1}
                </div>
                <button
                  className="flex items-center gap-1 text-gray-600 font-semibold disabled:text-gray-300"
                  onClick={handleNext}
                  disabled={currentQ === quizData.length - 1}
                >
                  next <span className="text-xl">&#8594;</span>
                </button>
              </div>
              <div className="mb-6 text-lg font-medium text-gray-800">
                {quizData[currentQ].question}
              </div>
              <div className="flex flex-col gap-4 mb-8">
                {quizData[currentQ].options.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-3 px-3 py-2 rounded border cursor-pointer transition
                      ${answers[currentQ] === idx
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 bg-white hover:bg-gray-50"}
                    `}
                  >
                    <input
                      type="radio"
                      name={`q${currentQ}`}
                      checked={answers[currentQ] === idx}
                      onChange={() => handleOptionChange(idx)}
                      className="accent-blue-600"
                    />
                    <span className="text-base">{opt}</span>
                  </label>
                ))}
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700 transition"
                  onClick={() => setShowSubmit(true)}
                  disabled={answers[currentQ] === null}
                >
                  Submit
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-4">Quiz Submitted!</div>
              <div className="mb-4">Thank you for completing the quiz.</div>
              <div className="mb-6">
                <span className="font-semibold">Your Answers:</span>
                <ul className="mt-2 text-left">
                  {quizData.map((q, idx) => (
                    <li key={idx}>
                      <span className="font-bold">Q{idx + 1}:</span>{" "}
                      {q.options[answers[idx]] || <span className="text-gray-400">Not answered</span>}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                onClick={() => {
                  setAnswers(Array(quizData.length).fill(null));
                  setCurrentQ(0);
                  setSubmitted(false);
                  setTimer(TOTAL_TIME);
                  setShowSubmit(false);
                }}
              >
                Restart Quiz
              </button>
            </div>
          )}
        </div>
        {/* Show submit modal if time is up or user clicks submit */}
        {showSubmit && !submitted && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg text-center">
              <div className="text-xl mb-4">Are you sure you want to submit?</div>
              <button
                className="bg-green-600 text-white px-6 py-2 rounded mr-4 hover:bg-green-700"
                onClick={handleSubmit}
              >
                Yes, Submit
              </button>
              <button
                className="bg-gray-300 px-6 py-2 rounded hover:bg-gray-400"
                onClick={() => setShowSubmit(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
