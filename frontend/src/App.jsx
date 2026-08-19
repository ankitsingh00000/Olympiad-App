import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Classes from "./pages/Classes.jsx";
import Subjects from "./pages/Subjects.jsx";
import Chapters from "./pages/Chapters.jsx";
import Quiz from "./pages/Quiz.jsx";
import Result from "./pages/Result.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import OverallPractice from "./pages/OverallPractice.jsx";
import PracticeTests from "./pages/PracticeTests.jsx";

// Overall Practice Question Banks
import class1OverallPractice from "./data/questions/class1/class1overallpractice.js";
import class2OverallPractice from "./data/questions/class2/class2overallpractice.js";
import class3OverallPractice from "./data/questions/class3/class3overallpractice.js";
import class4OverallPractice from "./data/questions/class4/class4overallpractice.js";
import class5OverallPractice from "./data/questions/class5/class5overallpractice.js";
import class6OverallPractice from "./data/questions/class6/class6overallpractice.js";
import class7OverallPractice from "./data/questions/class7/class7overallpractice.js";
import class8OverallPractice from "./data/questions/class8/class8overallpractice.js";
import class9OverallPractice from "./data/questions/class9/class9overallpractice.js";
import class10OverallPractice from "./data/questions/class10/class10overallpractice.js";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Classes */}
        <Route
          path="/classes"
          element={<Classes />}
        />

        {/* Subjects */}
        <Route
          path="/subjects/:classNumber"
          element={<Subjects />}
        />

        {/* Chapters */}
        <Route
          path="/chapters/:classNumber/:subjectName"
          element={<Chapters />}
        />

        {/* Quiz */}
        <Route
          path="/quiz"
          element={<Quiz />}
        />

        {/* Result */}
        <Route
          path="/result"
          element={<Result />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Practice Tests */}
        <Route
          path="/practice-tests"
          element={<PracticeTests />}
        />

        {/* ============================= */}
        {/*       OVERALL PRACTICE         */}
        {/* ============================= */}

        {/* Class 1 */}
        <Route
          path="/overall-practice/1"
          element={
            <OverallPractice
              questions={class1OverallPractice[1]}
              classNumber={1}
            />
          }
        />

        {/* Class 2 */}
        <Route
          path="/overall-practice/2"
          element={
            <OverallPractice
              questions={class2OverallPractice[2]}
              classNumber={2}
            />
          }
        />

        {/* Class 3 */}
        <Route
          path="/overall-practice/3"
          element={
            <OverallPractice
              questions={class3OverallPractice[3]}
              classNumber={3}
            />
          }
        />

        {/* Class 4 */}
        <Route
          path="/overall-practice/4"
          element={
            <OverallPractice
              questions={class4OverallPractice[4]}
              classNumber={4}
            />
          }
        />

        {/* Class 5 */}
        <Route
          path="/overall-practice/5"
          element={
            <OverallPractice
              questions={class5OverallPractice[5]}
              classNumber={5}
            />
          }
        />

        {/* Class 6 */}
        <Route
          path="/overall-practice/6"
          element={
            <OverallPractice
              questions={class6OverallPractice[6]}
              classNumber={6}
            />
          }
        />

        {/* Class 7 */}
        <Route
          path="/overall-practice/7"
          element={
            <OverallPractice
              questions={class7OverallPractice[7]}
              classNumber={7}
            />
          }
        />

        {/* Class 8 */}
        <Route
          path="/overall-practice/8"
          element={
            <OverallPractice
              questions={class8OverallPractice[8]}
              classNumber={8}
            />
          }
        />

        {/* Class 9 */}
        <Route
          path="/overall-practice/9"
          element={
            <OverallPractice
              questions={class9OverallPractice[9]}
              classNumber={9}
            />
          }
        />

        {/* Class 10 */}
        <Route
          path="/overall-practice/10"
          element={
            <OverallPractice
              questions={class10OverallPractice[10]}
              classNumber={10}
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;