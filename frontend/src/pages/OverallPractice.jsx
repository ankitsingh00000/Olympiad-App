import { useState } from "react";
import { useNavigate } from "react-router-dom";

function shuffleQuestions(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function OverallPractice({ questions = [], classNumber }) {
  const navigate = useNavigate();

  const getRandomQuestions = () => {
    return shuffleQuestions(questions).slice(0, 20);
  };

  const [practiceQuestions, setPracticeQuestions] = useState(() =>
    getRandomQuestions()
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="container py-5 text-center">
        <div className="card shadow border-0">
          <div className="card-body p-5">

            <div className="display-1 mb-3">
              😕
            </div>

            <h2 className="fw-bold">
              No Questions Available
            </h2>

            <p className="text-muted mt-3">
              There are no practice questions available for this class.
            </p>

            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={() => navigate(`/subjects/${classNumber}`)}
            >
              ← Back to Subjects
            </button>

          </div>
        </div>
      </div>
    );
  }

  const question = practiceQuestions[currentQuestion];

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    if (index === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion === practiceQuestions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer(null);
  };

  const restartPractice = () => {
    setPracticeQuestions(getRandomQuestions());
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    const totalQuestions = practiceQuestions.length;
    const wrongAnswers = totalQuestions - score;
    const percentage = Math.round((score / totalQuestions) * 100);

    let performanceMessage = "";
    let performanceIcon = "";

    if (percentage >= 90) {
      performanceIcon = "🏆";
      performanceMessage = "Excellent! Outstanding performance!";
    } else if (percentage >= 75) {
      performanceIcon = "🌟";
      performanceMessage = "Great job! Keep up the good work!";
    } else if (percentage >= 50) {
      performanceIcon = "👍";
      performanceMessage = "Good effort! You can improve even more!";
    } else {
      performanceIcon = "💪";
      performanceMessage = "Keep practicing! You will do better next time!";
    }

    return (
      <div className="container py-5">

        <div className="text-center mb-4">
          <h1 className="fw-bold">
            🎯 Class {classNumber} Overall Practice
          </h1>

          <p className="text-muted">
            Practice Result
          </p>
        </div>

        <div className="card shadow border-0">
          <div className="card-body p-4 p-md-5 text-center">

            <div className="display-1 mb-3">
              {performanceIcon}
            </div>

            <h1 className="fw-bold">
              Practice Completed!
            </h1>

            <h2 className="mt-4 fw-bold">
              {score} / {totalQuestions}
            </h2>

            <h4 className="mt-2">
              {percentage}%
            </h4>

            <p className="text-muted mt-3">
              {performanceMessage}
            </p>

            <div className="progress mt-4" style={{ height: "12px" }}>
              <div
                className="progress-bar bg-success"
                role="progressbar"
                style={{ width: `${percentage}%` }}
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
              </div>
            </div>

            <div className="row g-3 mt-4">

              <div className="col-md-4">
                <div className="card border-0 bg-light h-100">
                  <div className="card-body">
                    <div className="fs-2">
                      📝
                    </div>

                    <h5 className="fw-bold mt-2">
                      Total
                    </h5>

                    <h3 className="fw-bold">
                      {totalQuestions}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card border-0 bg-light h-100">
                  <div className="card-body">
                    <div className="fs-2">
                      ✅
                    </div>

                    <h5 className="fw-bold mt-2">
                      Correct
                    </h5>

                    <h3 className="fw-bold text-success">
                      {score}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="card border-0 bg-light h-100">
                  <div className="card-body">
                    <div className="fs-2">
                      ❌
                    </div>

                    <h5 className="fw-bold mt-2">
                      Wrong
                    </h5>

                    <h3 className="fw-bold text-danger">
                      {wrongAnswers}
                    </h3>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-4">

              <button
                type="button"
                className="btn btn-success btn-lg me-2 mb-2"
                onClick={restartPractice}
              >
                🔄 Practice Again
              </button>

              <button
                type="button"
                className="btn btn-primary btn-lg mb-2"
                onClick={() => navigate(`/subjects/${classNumber}`)}
              >
                📚 Back to Subjects
              </button>

            </div>

          </div>
        </div>

      </div>
    );
  }

  const progressPercentage =
    ((currentQuestion + 1) / practiceQuestions.length) * 100;

  return (
    <div className="container py-5">

      <div className="text-center mb-4">

        <h1 className="fw-bold">
          🎯 Class {classNumber} Overall Practice
        </h1>

        <p className="text-muted">
          Mathematics + Science + English + General Knowledge
        </p>

      </div>

      <div className="card shadow border-0">
        <div className="card-body p-4 p-md-5">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <span className="fw-bold">
              Question {currentQuestion + 1} / {practiceQuestions.length}
            </span>

            <span className="badge bg-primary fs-6">
              Score: {score}
            </span>

          </div>

          <div className="progress mb-4" style={{ height: "8px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${progressPercentage}%` }}
              aria-valuenow={progressPercentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
            </div>
          </div>

          <h4 className="fw-bold mb-4">
            {question.question}
          </h4>

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

          {selectedAnswer !== null && (
            <div className="text-center mt-4">

              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={nextQuestion}
              >
                {currentQuestion === practiceQuestions.length - 1
                  ? "Finish Practice"
                  : "Next Question →"}
              </button>

            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default OverallPractice;