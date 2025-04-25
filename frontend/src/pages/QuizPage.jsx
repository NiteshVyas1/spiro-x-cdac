
import React, { useState, useEffect } from "react";

const quizData = [
  {
    question: "Which language is used for web development?",
    options: ["Python", "HTML", "C++", "Java"],
    answer: "HTML",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which is a JavaScript framework?",
    options: ["Laravel", "React", "Django", "Spring"],
    answer: "React",
  },
];

const QuizPage = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === quizData[currentQ].answer) {
      setScore(score + 1);
    }
    if (currentQ < quizData.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption("");
      setTimer(10);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelectedOption("");
    setScore(0);
    setShowResult(false);
    setTimer(10);
  };

  useEffect(() => {
    if (timer > 0 && !showResult) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      handleNext();
    }
  }, [timer, showResult]);

  return (
    <>
    <div className="p-2 max-w-5xl mx-auto min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Quiz Time!</h2>
      {!showResult ? (
        <div className="bg-white p-10 rounded-lg shadow-md border text-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-2xl">
              Q{currentQ + 1}. {quizData[currentQ].question}
            </h3>
            <span className="text-red-500 text-xl font-bold">⏱ {timer}s</span>
          </div>
          <div className="space-y-4 mt-6">
            {quizData[currentQ].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className={`w-full text-left px-6 py-3 rounded border text-lg font-medium transition duration-200
                  ${selectedOption === option ? "bg-blue-100 border-blue-500" : "bg-gray-100 hover:bg-gray-200"}`}
              >
                <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleNext}
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded hover:bg-blue-700 text-lg"
            disabled={!selectedOption}
          >
            {currentQ === quizData.length - 1 ? "Finish Quiz" : "Next"}
          </button>
        </div>
      ) : (
        <div className="bg-white p-10 rounded-lg shadow-md border text-center">
          <h3 className="text-2xl font-semibold text-green-600 mb-4">Quiz Completed!</h3>
          <p className="text-xl mb-6">Your Score: {score} / {quizData.length}</p>
          <button
            onClick={handleRestart}
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 text-lg"
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
    </>
  );
};

export default QuizPage;
