import { useNavigate } from "react-router-dom";

function PracticeTests() {
  const navigate = useNavigate();

  const classes = [
    1, 2, 3, 4, 5,
    6, 7, 8, 9, 10
  ];

  return (
    <div className="min-vh-100 bg-light">

      {/* Navbar */}
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <span className="navbar-brand fw-bold">
            🎯 Olympiad Practice Tests
          </span>

          <button
            className="btn btn-light"
            onClick={() => navigate("/")}
          >
            🏠 Home
          </button>
        </div>
      </nav>

      {/* Main */}
      <div className="container py-5">

        <div className="text-center mb-5">

          <h1 className="fw-bold">
            🎯 Practice Tests
          </h1>

          <p className="text-muted">
            Select your class and start your overall practice test.
          </p>

        </div>

        <div className="row g-4">

          {classes.map((classNumber) => (

            <div
              className="col-6 col-md-4 col-lg-3"
              key={classNumber}
            >

              <div className="card shadow-sm border-0 h-100 text-center">

                <div className="card-body p-4">

                  <div className="fs-1 mb-2">
                    🏫
                  </div>

                  <h4 className="fw-bold">
                    Class {classNumber}
                  </h4>

                  <p className="text-muted">
                    Math + Science + English + GK
                  </p>

                  <button
                    className="btn btn-primary w-100"
                    onClick={() =>
                      navigate(`/overall-practice/${classNumber}`)
                    }
                  >
                    🚀 Start Test
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default PracticeTests;