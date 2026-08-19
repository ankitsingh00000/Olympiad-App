import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const savedProgress = JSON.parse(
      localStorage.getItem("olympiadProgress") || "[]"
    );

    setProgress(savedProgress);
  }, []);

  const testsCompleted = progress.length;

  const questionsAttempted = progress.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0
  );

  const correctAnswers = progress.reduce(
    (sum, item) =>
      sum + Number(item.correct ?? item.score ?? 0),
    0
  );

  const overallAccuracy =
    questionsAttempted > 0
      ? Math.round(
          (correctAnswers / questionsAttempted) * 100
        )
      : 0;

  const bestScore =
    progress.length > 0
      ? Math.max(
          ...progress.map(
            (item) => Number(item.percentage || 0)
          )
        )
      : 0;

  // -----------------------------
  // SUBJECT PERFORMANCE
  // -----------------------------

  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "General Knowledge",
  ];

  const getSubjectAccuracy = (subject) => {
    const subjectResults = progress.filter(
      (item) => item.subject === subject
    );

    const total = subjectResults.reduce(
      (sum, item) => sum + Number(item.total || 0),
      0
    );

    const correct = subjectResults.reduce(
      (sum, item) =>
        sum + Number(item.correct ?? item.score ?? 0),
      0
    );

    if (total === 0) return 0;

    return Math.round((correct / total) * 100);
  };

  // -----------------------------
  // CHAPTER PERFORMANCE
  // -----------------------------

  const chapterMap = {};

  progress.forEach((item) => {
    const key = `${item.classNumber}-${item.subject}-${item.chapter}`;

    if (!chapterMap[key]) {
      chapterMap[key] = {
        classNumber: item.classNumber,
        subject: item.subject,
        chapter: item.chapter,
        totalQuestions: 0,
        correctAnswers: 0,
        attempts: 0,
      };
    }

    chapterMap[key].totalQuestions += Number(
      item.total || 0
    );

    chapterMap[key].correctAnswers += Number(
      item.correct ?? item.score ?? 0
    );

    chapterMap[key].attempts += 1;
  });

  const chapterProgress = Object.values(chapterMap).map(
    (item) => ({
      ...item,
      percentage:
        item.totalQuestions > 0
          ? Math.round(
              (item.correctAnswers /
                item.totalQuestions) *
                100
            )
          : 0,
    })
  );

  // -----------------------------
  // WEAK AREAS
  // -----------------------------

  const weakAreas = [...chapterProgress]
    .filter((item) => item.percentage < 70)
    .sort(
      (a, b) => a.percentage - b.percentage
    )
    .slice(0, 5);

  // -----------------------------
  // RECENT ATTEMPTS
  // -----------------------------

  const recentAttempts = [...progress]
    .reverse()
    .slice(0, 5);

  // -----------------------------
  // PRACTICE WEAK AREA
  // -----------------------------

  const practiceWeakArea = (item) => {
    navigate(
      `/quiz?class=${item.classNumber}&subject=${encodeURIComponent(
        item.subject
      )}&chapter=${item.chapter}`
    );
  };

  return (
    <div className="container py-5">

      {/* HEADER */}

      <div className="text-center mb-5">

        <h1 className="fw-bold">
          📊 My Progress
        </h1>

        <p className="text-muted">
          Track your Olympiad preparation and improve your weak areas.
        </p>

      </div>

      {/* ========================= */}
      {/* STATISTICS */}
      {/* ========================= */}

      <div className="row g-4 mb-5">

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center p-4">

              <div className="fs-1">
                📝
              </div>

              <h6 className="text-muted mt-2">
                Tests Completed
              </h6>

              <h2 className="fw-bold">
                {testsCompleted}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center p-4">

              <div className="fs-1">
                ❓
              </div>

              <h6 className="text-muted mt-2">
                Questions Attempted
              </h6>

              <h2 className="fw-bold">
                {questionsAttempted}
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center p-4">

              <div className="fs-1">
                🎯
              </div>

              <h6 className="text-muted mt-2">
                Overall Accuracy
              </h6>

              <h2 className="fw-bold text-success">
                {overallAccuracy}%
              </h2>

            </div>

          </div>

        </div>

        <div className="col-md-6 col-lg-3">

          <div className="card shadow-sm border-0 h-100">

            <div className="card-body text-center p-4">

              <div className="fs-1">
                🏆
              </div>

              <h6 className="text-muted mt-2">
                Best Score
              </h6>

              <h2 className="fw-bold text-primary">
                {bestScore}%
              </h2>

            </div>

          </div>

        </div>

      </div>

      {/* ========================= */}
      {/* SUBJECT PERFORMANCE */}
      {/* ========================= */}

      <div className="card shadow-sm border-0 mb-5">

        <div className="card-body p-4">

          <h3 className="fw-bold mb-4">
            📚 Subject Performance
          </h3>

          {subjects.map((subject) => {

            const accuracy =
              getSubjectAccuracy(subject);

            return (
              <div
                key={subject}
                className="mb-4"
              >

                <div className="d-flex justify-content-between mb-2">

                  <strong>
                    {subject}
                  </strong>

                  <strong>
                    {accuracy}%
                  </strong>

                </div>

                <div
                  className="progress"
                  style={{ height: "12px" }}
                >

                  <div
                    className="progress-bar bg-primary"
                    style={{
                      width: `${accuracy}%`,
                    }}
                  />

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* ========================= */}
      {/* CHAPTER PROGRESS */}
      {/* ========================= */}

      <div className="card shadow-sm border-0 mb-5">

        <div className="card-body p-4">

          <h3 className="fw-bold mb-4">
            📖 Chapter Progress
          </h3>

          {chapterProgress.length === 0 ? (

            <div className="text-center py-4">

              <div className="fs-1">
                📚
              </div>

              <p className="text-muted mt-3">
                Complete a chapter practice to see your progress here.
              </p>

            </div>

          ) : (

            chapterProgress.map((item, index) => (

              <div
                key={`${item.classNumber}-${item.subject}-${item.chapter}-${index}`}
                className="mb-4"
              >

                <div className="d-flex justify-content-between align-items-center mb-2">

                  <div>

                    <strong>
                      Chapter {item.chapter}
                    </strong>

                    <div className="small text-muted">
                      Class {item.classNumber} • {item.subject}
                    </div>

                  </div>

                  <strong>
                    {item.percentage}%
                  </strong>

                </div>

                <div
                  className="progress"
                  style={{ height: "12px" }}
                >

                  <div
                    className={`progress-bar ${
                      item.percentage >= 75
                        ? "bg-success"
                        : item.percentage >= 50
                        ? "bg-warning"
                        : "bg-danger"
                    }`}
                    style={{
                      width: `${item.percentage}%`,
                    }}
                  />

                </div>

                <div className="small text-muted mt-1">
                  {item.correctAnswers} correct out of{" "}
                  {item.totalQuestions} questions
                  {" • "}
                  {item.attempts} attempt
                  {item.attempts !== 1 ? "s" : ""}
                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {/* ========================= */}
      {/* WEAK AREAS */}
      {/* ========================= */}

      <div className="card shadow-sm border-0 mb-5">

        <div className="card-body p-4">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h3 className="fw-bold mb-0">
              ⚠️ Weak Areas
            </h3>

            <span className="badge bg-warning text-dark">
              Needs Practice
            </span>

          </div>

          {weakAreas.length === 0 ? (

            <div className="text-center py-4">

              {progress.length === 0 ? (

                <>
                  <div className="fs-1">
                    📚
                  </div>

                  <h5 className="fw-bold mt-3">
                    No weak areas yet
                  </h5>

                  <p className="text-muted">
                    Start practicing to identify chapters that need more attention.
                  </p>
                </>

              ) : (

                <>
                  <div className="fs-1">
                    🎉
                  </div>

                  <h5 className="fw-bold mt-3">
                    Great Work!
                  </h5>

                  <p className="text-muted">
                    Your current chapter scores are 70% or above.
                  </p>
                </>

              )}

            </div>

          ) : (

            <div className="row g-4">

              {weakAreas.map((item, index) => (

                <div
                  className="col-md-6"
                  key={`${item.classNumber}-${item.subject}-${item.chapter}-${index}`}
                >

                  <div className="card border-danger h-100">

                    <div className="card-body">

                      <div className="d-flex justify-content-between">

                        <div>

                          <h5 className="fw-bold">
                            Chapter {item.chapter}
                          </h5>

                          <p className="text-muted mb-2">
                            Class {item.classNumber} •{" "}
                            {item.subject}
                          </p>

                        </div>

                        <div className="text-danger fw-bold">
                          {item.percentage}%
                        </div>

                      </div>

                      <p className="small text-muted">
                        {item.correctAnswers} correct out of{" "}
                        {item.totalQuestions}
                      </p>

                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          practiceWeakArea(item)
                        }
                      >
                        🚀 Practice This Chapter
                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

      {/* ========================= */}
      {/* RECENT ATTEMPTS */}
      {/* ========================= */}

      <div className="card shadow-sm border-0 mb-5">

        <div className="card-body p-4">

          <h3 className="fw-bold mb-4">
            🕒 Recent Attempts
          </h3>

          {recentAttempts.length === 0 ? (

            <div className="text-center py-4">

              <div className="fs-1">
                📝
              </div>

              <h5 className="fw-bold mt-3">
                No attempts yet
              </h5>

              <p className="text-muted">
                Complete a practice test to see your history.
              </p>

            </div>

          ) : (

            <div className="table-responsive">

              <table className="table align-middle">

                <thead>

                  <tr>
                    <th>Class</th>
                    <th>Subject</th>
                    <th>Chapter</th>
                    <th>Score</th>
                    <th>Accuracy</th>
                    <th>Date</th>
                  </tr>

                </thead>

                <tbody>

                  {recentAttempts.map(
                    (item, index) => (

                      <tr key={item.id || index}>

                        <td>
                          Class {item.classNumber}
                        </td>

                        <td>
                          {item.subject}
                        </td>

                        <td>
                          Chapter {item.chapter}
                        </td>

                        <td>
                          <strong>
                            {item.score}/{item.total}
                          </strong>
                        </td>

                        <td>

                          <span
                            className={`badge ${
                              Number(item.percentage) >= 75
                                ? "bg-success"
                                : Number(item.percentage) >= 50
                                ? "bg-warning text-dark"
                                : "bg-danger"
                            }`}
                          >
                            {item.percentage}%
                          </span>

                        </td>

                        <td>
                          {item.date || "-"}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

      {/* ========================= */}
      {/* BUTTONS */}
      {/* ========================= */}

      <div className="text-center">

        <button
          type="button"
          className="btn btn-primary btn-lg me-2 mb-2"
          onClick={() => navigate("/classes")}
        >
          🚀 Practice More
        </button>

        <button
          type="button"
          className="btn btn-outline-secondary btn-lg mb-2"
          onClick={() => navigate("/")}
        >
          🏠 Home
        </button>

      </div>

    </div>
  );
}

export default Dashboard;