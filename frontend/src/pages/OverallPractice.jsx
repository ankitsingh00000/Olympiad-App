import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function prepareQuestions(questions) {
  const selectedQuestions = shuffleArray(questions).slice(0, 20);

  return selectedQuestions.map((question) => {
    const options = question.options || [];

    const correctAnswer = options[question.answer];

    const shuffledOptions = shuffleArray(options);

    return {
      ...question,
      options: shuffledOptions,
      answer: shuffledOptions.indexOf(correctAnswer),
    };
  });
}

function OverallPractice({ questions = [], classNumber }) {
  const navigate = useNavigate();

  const getRandomQuestions = () => {
    return prepareQuestions(questions);
  };

  const [practiceQuestions, setPracticeQuestions] = useState(() =>
    getRandomQuestions()
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // 20 minutes
  const [timeLeft, setTimeLeft] = useState(10 * 60);

  // -----------------------------
  // TIMER
  // -----------------------------

  useEffect(() => {
    if (finished) return;

    if (timeLeft <= 0) {
      finishPractice();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, finished]);

  // -----------------------------
  // FORMAT TIMER
  // -----------------------------

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  // -----------------------------
  // FINISH PRACTICE
  // -----------------------------

  const finishPractice = () => {
    if (finished) return;

    const currentQuestionData =
      practiceQuestions[currentQuestion];

    const finalScore =
      score +
      (selectedAnswer !== null &&
      currentQuestionData &&
      selectedAnswer === currentQuestionData.answer
        ? 1
        : 0);

    const totalQuestions = practiceQuestions.length;

    const wrongAnswers =
      totalQuestions - finalScore;

    const percentage =
      totalQuestions > 0
        ? Math.round(
            (finalScore / totalQuestions) * 100
          )
        : 0;

    const oldProgress = JSON.parse(
      localStorage.getItem("olympiadProgress") || "[]"
    );

    const newResult = {
      id: Date.now(),

      classNumber,

      subject: "Overall Practice",

      chapter: "Mixed",

      score: finalScore,

      total: totalQuestions,

      correct: finalScore,

      wrong: wrongAnswers,

      percentage,

      type: "overall-practice",

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

    setScore(finalScore);
    setFinished(true);
  };

  // -----------------------------
  // ANSWER
  // -----------------------------

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);

    const question =
      practiceQuestions[currentQuestion];

    if (index === question.answer) {
      setScore((prev) => prev + 1);
    }
  };

  // -----------------------------
  // NEXT
  // -----------------------------

  const nextQuestion = () => {
    if (
      currentQuestion ===
      practiceQuestions.length - 1
    ) {
      finishPractice();
      return;
    }

    setCurrentQuestion((prev) => prev + 1);
    setSelectedAnswer(null);
  };

  // -----------------------------
  // RESTART
  // -----------------------------

  const restartPractice = () => {
    setPracticeQuestions(
      getRandomQuestions()
    );

    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setFinished(false);
    setTimeLeft(20 * 60);
  };

  // -----------------------------
  // NO QUESTIONS
  // -----------------------------

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
              There are no practice questions available
              for this class.
            </p>

            <button
              type="button"
              className="btn btn-primary mt-3"
              onClick={() =>
                navigate(
                  `/subjects/${classNumber}`
                )
              }
            >
              ← Back to Subjects
            </button>

          </div>

        </div>

      </div>
    );
  }

  // -----------------------------
  // RESULT
  // -----------------------------

  if (finished) {
    const totalQuestions =
      practiceQuestions.length;

    const wrongAnswers =
      totalQuestions - score;

    const percentage =
      totalQuestions > 0
        ? Math.round(
            (score / totalQuestions) * 100
          )
        : 0;

    let performanceMessage =
      "Keep practicing! You will improve next time.";

    let performanceIcon = "💪";

    if (percentage >= 90) {
      performanceIcon = "🏆";
      performanceMessage =
        "Excellent! Outstanding performance!";
    } else if (percentage >= 75) {
      performanceIcon = "🌟";
      performanceMessage =
        "Great job! Keep up the good work!";
    } else if (percentage >= 50) {
      performanceIcon = "👍";
      performanceMessage =
        "Good effort! You can improve even more!";
    }

    return (
      <div className="container py-5">

        <div className="text-center mb-4">

          <h1 className="fw-bold">
            🎯 Class {classNumber} Practice Test
          </h1>

          <p className="text-muted">
            Mixed Mathematics + Science + English + GK
          </p>

        </div>

        <div className="card shadow border-0">

          <div className="card-body p-4 p-md-5 text-center">

            <div className="display-1 mb-3">
              {performanceIcon}
            </div>

            <h1 className="fw-bold">
              Test Completed!
            </h1>

            <h2 className="mt-4 fw-bold">
              {score} / {totalQuestions}
            </h2>

            <h4 className="text-primary fw-bold mt-2">
              {percentage}%
            </h4>

            <p className="text-muted mt-3">
              {performanceMessage}
            </p>

            <div
              className="progress mt-4"
              style={{ height: "12px" }}
            >

              <div
                className="progress-bar bg-success"
                style={{
                  width: `${percentage}%`,
                }}
              />

            </div>

            <div className="row g-3 mt-4">

              <div className="col-md-4">

                <div className="card bg-light border-0 h-100">

                  <div className="card-body">

                    <div className="fs-2">
                      📝
                    </div>

                    <h6 className="fw-bold mt-2">
                      Total
                    </h6>

                    <h3 className="fw-bold">
                      {totalQuestions}
                    </h3>

                  </div>

                </div>

              </div>

              <div className="col-md-4">

                <div className="card bg-light border-0 h-100">

                  <div className="card-body">

                    <div className="fs-2">
                      ✅
                    </div>

                    <h6 className="fw-bold mt-2">
                      Correct
                    </h6>

                    <h3 className="fw-bold text-success">
                      {score}
                    </h3>

                  </div>

                </div>

              </div>

              <div className="col-md-4">

                <div className="card bg-light border-0 h-100">

                  <div className="card-body">

                    <div className="fs-2">
                      ❌
                    </div>

                    <h6 className="fw-bold mt-2">
                      Wrong
                    </h6>

                    <h3 className="fw-bold text-danger">
                      {wrongAnswers}
                    </h3>

                  </div>

                </div>

              </div>

            </div>

            <div className="mt-5">

              <button
                type="button"
                className="btn btn-success btn-lg me-2 mb-2"
                onClick={restartPractice}
              >
                🔄 Practice Again
              </button>

              <button
                type="button"
                className="btn btn-primary btn-lg me-2 mb-2"
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                📈 My Progress
              </button>

              <button
                type="button"
                className="btn btn-outline-primary btn-lg mb-2"
                onClick={() =>
                  navigate(
                    `/subjects/${classNumber}`
                  )
                }
              >
                📚 Back to Subjects
              </button>

            </div>

          </div>

        </div>

      </div>
    );
  }

  // -----------------------------
  // CURRENT QUESTION
  // -----------------------------

  const question =
    practiceQuestions[currentQuestion];

  const progressPercentage =
    ((currentQuestion + 1) /
      practiceQuestions.length) *
    100;

  return (
    <div className="container py-5">

      {/* HEADER */}

      <div className="text-center mb-4">

        <h1 className="fw-bold">
          🎯 Class {classNumber} Practice Test
        </h1>

        <p className="text-muted">
          Mathematics + Science + English + General Knowledge
        </p>

      </div>

      <div className="card shadow border-0">

        <div className="card-body p-4 p-md-5">

          {/* TOP INFO */}

          <div className="d-flex justify-content-between align-items-center mb-3">

            <span className="fw-bold">
              Question {currentQuestion + 1} /{" "}
              {practiceQuestions.length}
            </span>

            <span className="badge bg-primary fs-6">
              Score: {score}
            </span>

            <span
              className={`badge fs-6 ${
                timeLeft <= 60
                  ? "bg-danger"
                  : "bg-dark"
              }`}
            >
              ⏱️ {formatTime()}
            </span>

          </div>

          {/* PROGRESS */}

          <div
            className="progress mb-4"
            style={{ height: "8px" }}
          >

            <div
              className="progress-bar"
              style={{
                width: `${progressPercentage}%`,
              }}
            />

          </div>

          {/* QUESTION */}

          <h4 className="fw-bold mb-4">
            {question.question}
          </h4>

          {/* OPTIONS */}

          <div className="d-grid gap-3">

            {question.options.map(
              (option, index) => {

                let buttonClass =
                  "btn btn-outline-primary text-start";

                if (
                  selectedAnswer !== null
                ) {

                  if (
                    index === question.answer
                  ) {
                    buttonClass =
                      "btn btn-success text-start";
                  } else if (
                    index === selectedAnswer
                  ) {
                    buttonClass =
                      "btn btn-danger text-start";
                  }

                }

                return (
                  <button
                    key={index}
                    type="button"
                    className={buttonClass}
                    onClick={() =>
                      handleAnswer(index)
                    }
                    disabled={
                      selectedAnswer !== null
                    }
                  >
                    {String.fromCharCode(
                      65 + index
                    )}
                    . {option}
                  </button>
                );
              }
            )}

          </div>

          {/* NEXT */}

          {selectedAnswer !== null && (

            <div className="text-center mt-4">

              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={nextQuestion}
              >
                {currentQuestion ===
                practiceQuestions.length - 1
                  ? "🏁 Finish Test"
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