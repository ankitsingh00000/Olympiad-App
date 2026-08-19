import { useEffect, useState } from "react";

function Dashboard() {
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    const savedProgress = JSON.parse(
      localStorage.getItem("olympiadProgress") || "[]"
    );

    setProgress(savedProgress);
  }, []);

  const totalQuizzes = progress.length;

  const questionsAttempted = progress.reduce(
    (total, quiz) => total + quiz.total,
    0
  );

  const bestScore =
    progress.length > 0
      ? Math.max(...progress.map((quiz) => quiz.percentage))
      : 0;

  const averageScore =
    progress.length > 0
      ? Math.round(
          progress.reduce(
            (total, quiz) => total + quiz.percentage,
            0
          ) / progress.length
        )
      : 0;

  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h1 className="fw-bold">
          📊 My Progress
        </h1>

        <p className="text-muted">
          Track your Olympiad preparation
        </p>
      </div>

      <div className="row g-4">

        <div className="col-md-3">
          <div className="card shadow border-0 p-4 text-center h-100">
            <h2>📝</h2>
            <h3>{totalQuizzes}</h3>
            <p className="text-muted mb-0">
              Total Quizzes
            </p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 p-4 text-center h-100">
            <h2>❓</h2>
            <h3>{questionsAttempted}</h3>
            <p className="text-muted mb-0">
              Questions Attempted
            </p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 p-4 text-center h-100">
            <h2>🏆</h2>
            <h3 className="text-success">
              {bestScore}%
            </h3>
            <p className="text-muted mb-0">
              Best Score
            </p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card shadow border-0 p-4 text-center h-100">
            <h2>📈</h2>
            <h3 className="text-primary">
              {averageScore}%
            </h3>
            <p className="text-muted mb-0">
              Average Score
            </p>
          </div>
        </div>

      </div>

      <div className="card shadow border-0 mt-5 p-4">

        <h3 className="fw-bold mb-4">
          📚 Recent Quiz Results
        </h3>

        {progress.length === 0 ? (
          <div className="alert alert-info">
            No quizzes attempted yet.
          </div>
        ) : (
          <div className="table-responsive">

            <table className="table table-hover align-middle">

              <thead>
                <tr>
                  <th>Class</th>
                  <th>Subject</th>
                  <th>Chapter</th>
                  <th>Score</th>
                  <th>Percentage</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {progress
                  .slice()
                  .reverse()
                  .map((quiz, index) => (
                    <tr key={index}>
                      <td>{quiz.classNumber}</td>
                      <td>{quiz.subject}</td>
                      <td>{quiz.chapter}</td>
                      <td>
                        {quiz.score} / {quiz.total}
                      </td>
                      <td>
                        <strong
                          className={
                            quiz.percentage >= 60
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {quiz.percentage}%
                        </strong>
                      </td>
                      <td>{quiz.date}</td>
                    </tr>
                  ))}
              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;