const templates = {
  Mathematics: [
    {
      question: "What is 5 + 7?",
      options: ["10", "11", "12", "13"],
      answer: 2,
    },
    {
      question: "What is 9 × 6?",
      options: ["45", "54", "63", "72"],
      answer: 1,
    },
    {
      question: "What is 100 ÷ 4?",
      options: ["20", "25", "30", "40"],
      answer: 1,
    },
    {
      question: "What is 15 − 8?",
      options: ["5", "6", "7", "8"],
      answer: 2,
    },
    {
      question: "What is 12 + 18?",
      options: ["20", "25", "30", "35"],
      answer: 2,
    },
  ],

  Science: [
    {
      question: "Which gas do humans need for respiration?",
      options: ["Nitrogen", "Oxygen", "Hydrogen", "Helium"],
      answer: 1,
    },
    {
      question: "What is the basic unit of life?",
      options: ["Atom", "Cell", "Tissue", "Organ"],
      answer: 1,
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      answer: 1,
    },
    {
      question: "What force pulls objects towards Earth?",
      options: ["Friction", "Gravity", "Magnetism", "Electricity"],
      answer: 1,
    },
    {
      question: "Which organ pumps blood?",
      options: ["Lungs", "Brain", "Heart", "Kidney"],
      answer: 2,
    },
  ],

  English: [
    {
      question: "Which word is a noun?",
      options: ["Run", "Beautiful", "Teacher", "Quickly"],
      answer: 2,
    },
    {
      question: "What is the opposite of 'hot'?",
      options: ["Warm", "Cold", "Heat", "Fire"],
      answer: 1,
    },
    {
      question: "What is the plural of 'child'?",
      options: ["Childs", "Children", "Childes", "Child"],
      answer: 1,
    },
    {
      question: "Which word is an adjective?",
      options: ["Beautiful", "Quickly", "Running", "Teacher"],
      answer: 0,
    },
    {
      question: "What is the past tense of 'go'?",
      options: ["Goed", "Going", "Went", "Gone"],
      answer: 2,
    },
  ],

  "General Knowledge": [
    {
      question: "What is the capital of India?",
      options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
      answer: 1,
    },
    {
      question: "Which is the largest planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: 2,
    },
    {
      question: "How many days are there in a week?",
      options: ["5", "6", "7", "8"],
      answer: 2,
    },
    {
      question: "Which is the national animal of India?",
      options: ["Lion", "Tiger", "Elephant", "Deer"],
      answer: 1,
    },
    {
      question: "Which ocean is the largest?",
      options: ["Indian", "Atlantic", "Pacific", "Arctic"],
      answer: 2,
    },
  ],
};

function createQuestions(subject, classNumber, count = 125) {
  const baseQuestions = templates[subject] || [];

  const questions = [];

  for (let i = 0; i < count; i++) {
    const base = baseQuestions[i % baseQuestions.length];

    questions.push({
      id: `${classNumber}-${subject}-${i + 1}`,
      question: base.question,
      options: [...base.options],
      answer: base.answer,
    });
  }

  return questions;
}

export function getQuestionBank(classNumber) {
  return {
    Mathematics: createQuestions(
      "Mathematics",
      classNumber,
      125
    ),

    Science: createQuestions(
      "Science",
      classNumber,
      125
    ),

    English: createQuestions(
      "English",
      classNumber,
      125
    ),

    "General Knowledge": createQuestions(
      "General Knowledge",
      classNumber,
      125
    ),
  };
}