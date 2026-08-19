import { useParams, useNavigate } from "react-router-dom";

function Subjects() {
  const { classNumber } = useParams();
  const navigate = useNavigate();

  const subjects = [
    {
      name: "Mathematics",
      icon: "🔢",
    },
    {
      name: "Science",
      icon: "🔬",
    },
    {
      name: "English",
      icon: "📖",
    },
    {
      name: "General Knowledge",
      icon: "🌎",
    },
  ];

  const openChapters = (subject) => {
    navigate(
      `/chapters/${classNumber}/${encodeURIComponent(subject)}`
    );
  };

  const openOverallPractice = () => {
    navigate(`/overall-practice/${classNumber}`);
  };

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">
          📚 Class {classNumber} Subjects
        </h1>

        <p className="text-muted">
          Select a subject to continue.
        </p>
      </div>

      {/* Subjects */}
      <div className="row g-4">

        {subjects.map((subject) => (
          <div
            className="col-md-6"
            key={subject.name}
          >
            <div className="card shadow-sm border-0 h-100">

              <div className="card-body text-center p-5">

                <div className="display-4 mb-3">
                  {subject.icon}
                </div>

                <h3 className="fw-bold">
                  {subject.name}
                </h3>

                <p className="text-muted">
                  Practice chapter-wise questions
                </p>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openChapters(subject.name)}
                >
                  📚 View Chapters →
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

      {/* Overall Practice */}
      <div className="card shadow-sm border-0 mt-4">

        <div className="card-body text-center p-5">

          <div className="display-4 mb-3">
            📝
          </div>

          <h3 className="fw-bold">
            Overall Practice
          </h3>

          <p className="text-muted">
            Math + Science + English + GK
          </p>

          <button
            type="button"
            className="btn btn-success"
            onClick={openOverallPractice}
          >
            🚀 Start Practice →
          </button>

        </div>

      </div>

    </div>
  );
}

export default Subjects;