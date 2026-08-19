import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getQuestionBank } from "../data/questionGenerator";

import mathematicsClass1 from "../data/questions/class1/mathematics";
import scienceClass1 from "../data/questions/class1/science";
import englishClass1 from "../data/questions/class1/english";
import gkClass1 from "../data/questions/class1/gk";

import mathematicsClass2 from "../data/questions/class2/mathematics";
import scienceClass2 from "../data/questions/class2/science";
import englishClass2 from "../data/questions/class2/english";
import gkClass2 from "../data/questions/class2/gk";

import mathematicsClass3 from "../data/questions/class3/mathematics";
import scienceClass3 from "../data/questions/class3/science";
import englishClass3 from "../data/questions/class3/english";
import gkClass3 from "../data/questions/class3/gk";

import mathematicsClass4 from "../data/questions/class4/mathematics";
import scienceClass4 from "../data/questions/class4/science";
import englishClass4 from "../data/questions/class4/english";
import gkClass4 from "../data/questions/class4/gk";

import mathematicsClass5 from "../data/questions/class5/mathematics";
import scienceClass5 from "../data/questions/class5/science";
import englishClass5 from "../data/questions/class5/english";
import gkClass5 from "../data/questions/class5/gk";

import mathematicsClass6 from "../data/questions/class6/mathematics";
import scienceClass6 from "../data/questions/class6/science";
import englishClass6 from "../data/questions/class6/english";
import gkClass6 from "../data/questions/class6/gk";

import mathematicsClass7 from "../data/questions/class7/mathematics";
import scienceClass7 from "../data/questions/class7/science";
import englishClass7 from "../data/questions/class7/english";
import gkClass7 from "../data/questions/class7/gk";

import mathematicsClass8 from "../data/questions/class8/mathematics";
import scienceClass8 from "../data/questions/class8/science";
import englishClass8 from "../data/questions/class8/english";
import gkClass8 from "../data/questions/class8/gk";

import mathematicsClass9 from "../data/questions/class9/mathematics";
import scienceClass9 from "../data/questions/class9/science";
import englishClass9 from "../data/questions/class9/english";
import gkClass9 from "../data/questions/class9/gk";

import mathematicsClass10 from "../data/questions/class10/mathematics";
import scienceClass10 from "../data/questions/class10/science";
import englishClass10 from "../data/questions/class10/english";
import gkClass10 from "../data/questions/class10/gk";

const questionBanks = {
  1: {
    Mathematics: mathematicsClass1,
    Science: scienceClass1,
    English: englishClass1,
    "General Knowledge": gkClass1,
  },

  2: {
    Mathematics: mathematicsClass2,
    Science: scienceClass2,
    English: englishClass2,
    "General Knowledge": gkClass2,
  },

  3: {
    Mathematics: mathematicsClass3,
    Science: scienceClass3,
    English: englishClass3,
    "General Knowledge": gkClass3,
  },

  4: {
    Mathematics: mathematicsClass4,
    Science: scienceClass4,
    English: englishClass4,
    "General Knowledge": gkClass4,
  },

  5: {
    Mathematics: mathematicsClass5,
    Science: scienceClass5,
    English: englishClass5,
    "General Knowledge": gkClass5,
  },

  6: {
    Mathematics: mathematicsClass6,
    Science: scienceClass6,
    English: englishClass6,
    "General Knowledge": gkClass6,
  },

  7: {
    Mathematics: mathematicsClass7,
    Science: scienceClass7,
    English: englishClass7,
    "General Knowledge": gkClass7,
  },

  8: {
    Mathematics: mathematicsClass8,
    Science: scienceClass8,
    English: englishClass8,
    "General Knowledge": gkClass8,
  },

  9: {
    Mathematics: mathematicsClass9,
    Science: scienceClass9,
    English: englishClass9,
    "General Knowledge": gkClass9,
  },

  10: {
    Mathematics: mathematicsClass10,
    Science: scienceClass10,
    English: englishClass10,
    "General Knowledge": gkClass10,
  },
};

function Quiz() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const classNumber = searchParams.get("class") || "1";
  const subject = searchParams.get("subject") || "Mathematics";
  const chapter = searchParams.get("chapter") || "1";

  const classBank = questionBanks[classNumber]?.[subject];

  const chapterQuestions = Array.isArray(classBank)
    ? classBank[chapter]
    : null;

  const generatedQuestions =
    getQuestionBank(classNumber)?.[subject] || [];

  const questions =
    Array.isArray(chapterQuestions) && chapterQuestions.length > 0
      ? chapterQuestions
      : generatedQuestions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  if (questions.length === 0) {
    return (
      <div className="container py-5">
        <button
          type="button"
          className="btn btn-outline-secondary mb-4"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="alert alert-warning text-center">
          <h4>📚 Questions Coming Soon</h4>

          <p>
            Questions for {subject}, Chapter {chapter} are not available yet.
          </p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    if (index === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    const isLastQuestion =
      currentQuestion === questions.length - 1;

    if (isLastQuestion) {
      const finalScore =
        score + (selectedAnswer === question.answer ? 1 : 0);

      const total = questions.length;

      const percentage =
        total > 0
          ? Math.round((finalScore / total) * 100)
          : 0;

      const oldProgress = JSON.parse(
        localStorage.getItem("olympiadProgress") || "[]"
      );

      const newResult = {
        id: Date.now(),

        classNumber,
        subject,
        chapter,

        score: finalScore,
        total,

        correct: finalScore,
        wrong: total - finalScore,

        percentage,

        date: new Date().toLocaleDateString(),
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem(
        "olympiadProgress",
        JSON.stringify([
          ...oldProgress,
          newResult,
        ])
      );

      navigate("/result", {
        state: {
          score: finalScore,
          total,

          classNumber,
          subject,
          chapter,

          percentage,

          retryPath: `/quiz?class=${classNumber}&subject=${encodeURIComponent(
            subject
          )}&chapter=${chapter}`,
        },
      });

      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer(null);
  };

  return (
    <div className="container py-5">

      {/* Back Button */}
      <button
        type="button"
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">
          🏆 Olympiad Quiz
        </h1>

        <p className="text-muted">
          Class {classNumber} • {subject} • Chapter {chapter}
        </p>
      </div>

      {/* Quiz Card */}
      <div className="card shadow border-0 p-4">

        {/* Question Info */}
        <div className="d-flex justify-content-between mb-4">
          <strong>
            Question {currentQuestion + 1} / {questions.length}
          </strong>

          <strong className="text-success">
            Score: {score}
          </strong>
        </div>

        {/* Question */}
        <h3 className="fw-bold mb-4">
          {question.question}
        </h3>

        {/* Options */}
        <div className="d-grid gap-3">

          {question.options.map((option, index) => {
            let buttonClass =
              "btn btn-outline-primary text-start";

            if (selectedAnswer !== null) {
              if (index === question.answer) {
                buttonClass =
                  "btn btn-success text-start";
              } else if (index === selectedAnswer) {
                buttonClass =
                  "btn btn-danger text-start";
              }
            }

            return (
              <button
                key={index}
                type="button"
                className={buttonClass}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            );
          })}

        </div>

        {/* Next / Finish */}
        {selectedAnswer !== null && (
          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={nextQuestion}
          >
            {currentQuestion === questions.length - 1
              ? "🏁 Finish Quiz"
              : "➡️ Next Question"}
          </button>
        )}

      </div>
    </div>
  );
}

export default Quiz;