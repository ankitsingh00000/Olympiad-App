import { useParams, useNavigate } from "react-router-dom";

function Chapters() {
  const { classNumber, subjectName } = useParams();
  const navigate = useNavigate();

  const subject = decodeURIComponent(subjectName || "Mathematics");
  const classNum = Number(classNumber);

  // Normalize subject name
  const normalizedSubject = subject.trim().toLowerCase();

  let subjectKey = subject;

  if (
    normalizedSubject === "gk" ||
    normalizedSubject === "general knowledge" ||
    normalizedSubject === "general-knowledge"
  ) {
    subjectKey = "GK";
  } else if (
    normalizedSubject === "math" ||
    normalizedSubject === "mathematics"
  ) {
    subjectKey = "Mathematics";
  } else if (normalizedSubject === "science") {
    subjectKey = "Science";
  } else if (normalizedSubject === "english") {
    subjectKey = "English";
  }

  // Chapter counts according to Class + Subject
  const chapterCounts = {
    // CLASS 1
    1: {
      Mathematics: 10,
      Science: 10,
      English: 10,
      GK: 10,
    },

    // CLASS 2
    2: {
      Mathematics: 10,
      Science: 10,
      English: 10,
      GK: 10,
    },

    // CLASS 3
    3: {
      Mathematics: 10,
      Science: 10,
      English: 10,
      GK: 10,
    },

    // CLASS 4
    4: {
      Mathematics: 10,
      Science: 10,
      English: 10,
      GK: 10,
    },

    // CLASS 5
    5: {
      Mathematics: 10,
      Science: 10,
      English: 10,
      GK: 10,
    },

    // CLASS 6
    6: {
      Mathematics: 10,
      Science: 10,
      English: 10,
      GK: 10,
    },

    // CLASS 7
    7: {
      Mathematics: 15,
      Science: 18,
      English: 20,
      GK: 15,
    },

    // CLASS 8
    8: {
      Mathematics: 16,
      Science: 17,
      English: 18,
      GK: 15,
    },

    // CLASS 9
    9: {
      Mathematics: 13,
      Science: 15,
      English: 17,
      GK: 15,
    },

    // CLASS 10
    10: {
      Mathematics: 14,
      Science: 13,
      English: 17,
      GK: 15,
    },
  };

  // Get chapter count for selected class + subject
  const count =
    chapterCounts[classNum]?.[subjectKey] || 10;

  // Automatically create chapters
  const chapters = Array.from(
    { length: count },
    (_, index) => ({
      id: index + 1,
      name: `Chapter ${index + 1}`,
      description:
        index + 1 <= 10
          ? "Important concepts and practice"
          : "Advanced concepts and Olympiad practice",
    })
  );

  // Start chapter quiz
  const startQuiz = (chapterId) => {
    navigate(
      `/quiz?class=${classNumber}&subject=${encodeURIComponent(
        subject
      )}&chapter=${chapterId}`
    );
  };

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">
          📚 {subject}
        </h1>

        <p className="text-muted">
          Class {classNumber} • Select a chapter
        </p>
      </div>

      {/* Chapters */}
      <div className="row g-4">

        {chapters.map((chapter) => (
          <div
            className="col-md-6 col-lg-4"
            key={chapter.id}
          >
            <div className="card shadow-sm border-0 h-100">

              <div className="card-body p-4">

                <h3 className="fw-bold">
                  📖 {chapter.name}
                </h3>

                <p className="text-muted">
                  {chapter.description}
                </p>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    startQuiz(chapter.id)
                  }
                >
                  🏆 Start Quiz →
                </button>

              </div>

            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Chapters;