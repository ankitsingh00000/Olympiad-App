import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-vh-100 bg-light">

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand fw-bold">
            🏆 Olympiad Learning
          </span>

          <Link
            to="/classes"
            className="btn btn-light"
          >
            Start Learning
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="container py-5">

        <div className="row align-items-center">

          <div className="col-md-7">

            <h1 className="display-4 fw-bold">
              Learn. Practice. Win. 🏆
            </h1>

            <p className="lead text-muted mt-3">
              Practice Olympiad questions chapter-wise
              and improve your knowledge step by step.
            </p>

            <Link
              to="/classes"
              className="btn btn-primary btn-lg mt-3"
            >
              🚀 Start Practice
            </Link>

          </div>

          <div className="col-md-5 text-center mt-4 mt-md-0">

            <div className="card shadow border-0 p-5">

              <div className="display-1">
                🧠
              </div>

              <h3 className="fw-bold mt-3">
                Smart Learning
              </h3>

              <p className="text-muted mb-0">
                Classes 1–10
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Features */}
      <div className="container pb-5">

        <h2 className="text-center fw-bold mb-4">
          Why Practice With Us?
        </h2>

        <div className="text-center mb-5">
          <Link
            to="/dashboard"
            className="btn btn-primary btn-lg"
          >
            📊 View My Progress
          </Link>
        </div>

        <div className="row g-4">

          {/* Chapter-wise Questions */}
          <div className="col-md-4">
            <Link
              to="/classes"
              className="text-decoration-none text-dark"
            >
              <div className="card shadow-sm border-0 p-4 text-center h-100">

                <div className="fs-1">
                  📚
                </div>

                <h5 className="fw-bold mt-3">
                  Chapter-wise Questions
                </h5>

                <p className="text-muted">
                  Practice questions topic by topic.
                </p>

                <span className="btn btn-primary">
                  📚 Start Chapters →
                </span>

              </div>
            </Link>
          </div>

          {/* Practice Tests */}
          <div className="col-md-4">
            <Link
              to="/practice-tests"
              className="text-decoration-none text-dark"
            >
              <div className="card shadow-sm border-0 p-4 text-center h-100">

                <div className="fs-1">
                  🎯
                </div>

                <h5 className="fw-bold mt-3">
                  Practice Tests
                </h5>

                <p className="text-muted">
                  Test your knowledge with quizzes.
                </p>

                <span className="btn btn-primary">
                  🎯 Choose Class →
                </span>

              </div>
            </Link>
          </div>

          {/* Track Progress */}
          <div className="col-md-4">
            <Link
              to="/dashboard"
              className="text-decoration-none text-dark"
            >
              <div className="card shadow-sm border-0 p-4 text-center h-100">

                <div className="fs-1">
                  📊
                </div>

                <h5 className="fw-bold mt-3">
                  Track Progress
                </h5>

                <p className="text-muted">
                  See your scores and improvement.
                </p>

                <span className="btn btn-primary">
                  📊 View Progress →
                </span>

              </div>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Home;