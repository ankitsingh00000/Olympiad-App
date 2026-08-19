import { Link } from "react-router-dom";

const classes = Array.from({ length: 10 }, (_, index) => index + 1);

function Classes() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">
          🎓 Select Your Class
        </h1>

        <p className="text-muted">
          Choose your class to start Olympiad practice.
        </p>
      </div>

      <div className="row g-4">
        {classes.map((classNumber) => (
          <div
            className="col-6 col-md-4 col-lg-3"
            key={classNumber}
          >
            <div className="card shadow-sm border-0 p-4 text-center h-100">
              
              <div className="fs-1">
                🎓
              </div>

              <h3 className="fw-bold mt-2">
                Class {classNumber}
              </h3>

              <p className="text-muted">
                Start Practice →
              </p>

              <Link
                to={`/subjects/${classNumber}`}
                className="btn btn-primary mb-2"
              >
                📚 Subjects
              </Link>

              <Link
                to="/dashboard"
                className="btn btn-outline-primary"
              >
                📊 My Progress
              </Link>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Classes;