import { useLocation, useNavigate } from "react-router-dom";

function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state || {};

  const score = Number(result.score || 0);
  const total = Number(result.total || 0);

  const correct = score;
  const wrong = Math.max(total - score, 0);

  const percentage =
    total > 0 ? Math.round((score / total) * 100) : 0;

  let performanceIcon = "💪";
  let performanceTitle = "Keep Practicing!";
  let performanceMessage =
    "Don't worry. Practice more and you will improve!";

  if (percentage >= 90) {
    performanceIcon = "🏆";
    performanceTitle = "Excellent!";
    performanceMessage =
      "Outstanding performance! Keep it up!";
  } else if (percentage >= 75) {
    performanceIcon = "🌟";
    performanceTitle = "Great Job!";
    performanceMessage =
      "Very good performance! Keep practicing!";
  } else if (percentage >= 50) {
    performanceIcon = "👍";
    performanceTitle = "Good Effort!";
    performanceMessage =
      "You are doing well. A little more practice will make you even better!";
  }

  const handleRetry = () => {
    if (result.retryPath) {
      navigate(result.retryPath);
    } else {
      navigate(-1);
    }
  };

  const handleBack = () => {
    if (result.classNumber) {
      navigate(`/subjects/${result.classNumber}`);
    } else {
      navigate("/classes");
    }
  };

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="text-center mb-4">

        <h1 className="fw-bold">
          📊 Quiz Result
        </h1>

        {result.classNumber && (
          <p className="text-muted">
            Class {result.classNumber}
            {result.subject ? ` • ${result.subject}` : ""}
          </p>
        )}

      </div>

      {/* Result Card */}
      <div className="card shadow border-0">

        <div className="card-body p-4 p-md-5 text-center">

          {/* Performance Icon */}
          <div className="display-1 mb-3">
            {performanceIcon}
          </div>

          {/* Title */}
          <h1 className="fw-bold">
            {performanceTitle}
          </h1>

          <p className="text-muted mt-2">
            {performanceMessage}
          </p>

          {/* Score */}
          <div className="mt-4">

            <h2 className="fw-bold">
              {score} / {total}
            </h2>

            <h4 className="text-primary fw-bold">
              {percentage}%
            </h4>

          </div>

          {/* Progress */}
          <div
            className="progress mt-4"
            style={{ height: "12px" }}
          >
            <div
              className="progress-bar bg-success"
              role="progressbar"
              style={{ width: `${percentage}%` }}
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>

          {/* Statistics */}
          <div className="row g-3 mt-4">

            {/* Total */}
            <div className="col-md-4">

              <div className="card bg-light border-0 h-100">

                <div className="card-body">

                  <div className="fs-2">
                    📝
                  </div>

                  <h6 className="fw-bold mt-2">
                    Total Questions
                  </h6>

                  <h3 className="fw-bold">
                    {total}
                  </h3>

                </div>

              </div>

            </div>

            {/* Correct */}
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
                    {correct}
                  </h3>

                </div>

              </div>

            </div>

            {/* Wrong */}
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
                    {wrong}
                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* Buttons */}
          <div className="mt-5">

            <button
              type="button"
              className="btn btn-success btn-lg me-2 mb-2"
              onClick={handleRetry}
            >
              🔄 Try Again
            </button>

            <button
              type="button"
              className="btn btn-primary btn-lg mb-2"
              onClick={handleBack}
            >
              📚 Back to Subjects
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Result;