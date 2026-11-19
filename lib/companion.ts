export type CompanionPrompt = {
  id: string;
  question: string;
  answer: string;
};

export const COMPANION_PROMPTS: CompanionPrompt[] = [
  {
    id: "checkpoint",
    question: "What should I review before the evidence checkpoint?",
    answer:
      "You are in Evidence Before Charts. Read “Spotting a biased comparison” and “Write the caveat first” before the 20 November checkpoint. The quiz asks about denominators, recent baselines and where a caveat belongs. Your writing course can wait until after that.",
  },
  {
    id: "behind",
    question: "How do I catch up if I am behind in a module?",
    answer:
      "Finish the next lesson in Evidence Before Charts before opening another course. You are halfway through that course and have not started Writing That Survives Review. One next lesson is a better plan than three partial courses in the same evening.",
  },
  {
    id: "rate",
    question: "What does completion rate mean in this demo?",
    answer:
      "Completion rate is completed enrollments divided by all enrollments. A person in three courses is counted three times. It is not a headcount of learners, and it is calculated from the records in this browser.",
  },
];

export function answerCompanion(question: string) {
  const text = question.trim().toLowerCase();
  const match = COMPANION_PROMPTS.find((prompt) => {
    const words = prompt.question.toLowerCase().split(/\W+/).filter((word) => word.length > 4);
    return words.some((word) => text.includes(word));
  });
  if (match) return match.answer;
  return "I only have a few prepared answers in this prototype. Try one of the suggested questions about the checkpoint, catching up, or completion rate.";
}
