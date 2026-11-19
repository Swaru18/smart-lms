import type { Quiz } from "../types";

export const quizzes: Quiz[] = [
  {
    id: "q-evidence",
    courseId: "c-evidence",
    lessonId: "c-evidence-m2-l3",
    title: "Evidence checkpoint",
    minutes: 12,
    questions: [
      {
        id: "q-evidence-1",
        prompt:
          "A chart title claims support requests doubled after a new form. What should you ask first?",
        options: [
          "Whether the vertical axis starts at zero",
          "Whether the number of people who could submit stayed the same",
          "Which color is used for the bars",
          "Whether the chart is a pie",
        ],
        correctIndex: 1,
        feedback:
          "A doubled count is not a doubled rate if the pool of people changed. Check the denominator before you debate the axis.",
      },
      {
        id: "q-evidence-2",
        prompt: "Which comparison is the most honest for a weekly operations review?",
        options: [
          "This week versus the best week of last year, unlabeled",
          "This week versus the previous four weeks, with the holiday week noted",
          "A single number drawn as a 3D column",
          "Two charts with different scales placed side by side",
        ],
        correctIndex: 1,
        feedback:
          "A recent baseline plus a named exception is something a colleague can audit. An unlabeled best week is a sales poster.",
      },
      {
        id: "q-evidence-3",
        prompt: "Where should a caveat live in a short written update?",
        options: [
          "In a footnote",
          "In the same paragraph as the recommendation",
          "Only inside the spreadsheet",
          "In the color legend",
        ],
        correctIndex: 1,
        feedback:
          "If the caveat can change the decision, it belongs with the claim. Footnotes are easy to skip.",
      },
      {
        id: "q-evidence-4",
        prompt:
          "A stacked bar hides a drop in one category because another category grew. What do you do?",
        options: [
          "Add a gradient so the chart feels clearer",
          "Show the categories as separate lines or small multiples",
          "Delete the smaller category",
          "Start the axis at the smallest value",
        ],
        correctIndex: 1,
        feedback:
          "If the mix is the story, do not stack it into one bar. Separate the series so the drop is visible.",
      },
    ],
  },
  {
    id: "q-hybrid",
    courseId: "c-hybrid",
    lessonId: "c-hybrid-m2-l3",
    title: "Facilitation scenario",
    minutes: 10,
    questions: [
      {
        id: "q-hybrid-1",
        prompt: "The first minute of a hybrid session should primarily:",
        options: [
          "Recap the entire previous course",
          "Tell both rooms how they will participate",
          "Ask remote people to stay muted for the hour",
          "Share a forty-slide deck",
        ],
        correctIndex: 1,
        feedback:
          "People can only keep an agreement they have heard. Say how a remote participant gets the floor.",
      },
      {
        id: "q-hybrid-2",
        prompt: "Someone in the room is talking over the remote group. A useful move is to:",
        options: [
          "Ignore it so the energy stays high",
          "Pause and give the remote room the next question first",
          "Turn off the remote microphones",
          "Start another icebreaker",
        ],
        correctIndex: 1,
        feedback:
          "Name the pause and return the next prompt to the remote room. More icebreakers do not fix the imbalance.",
      },
      {
        id: "q-hybrid-3",
        prompt: "A 45-minute practice session has room for:",
        options: [
          "One outcome and one practice cycle",
          "Five new frameworks",
          "A full lecture plus two workshops",
          "Unstructured discussion only",
        ],
        correctIndex: 0,
        feedback:
          "One outcome, one practice, a short close. A second framework belongs in another session.",
      },
      {
        id: "q-hybrid-4",
        prompt: "The session plan you hand to a co-facilitator needs:",
        options: [
          "Timing, prompts, and who is watching the remote room",
          "Only a title slide",
          "A list of jokes",
          "The attendance policy and nothing else",
        ],
        correctIndex: 0,
        feedback:
          "A co-facilitator should be able to run the hour from the plan without guessing who watches the call.",
      },
    ],
  },
  {
    id: "q-writing",
    courseId: "c-writing",
    lessonId: "c-writing-m2-l3",
    title: "Clarity quiz",
    minutes: 10,
    questions: [
      {
        id: "q-writing-1",
        prompt: "Which sentence is doing the work?",
        options: [
          "We wanted to reach out and touch base regarding the update.",
          "The pilot cut repeat calls by 12% in March.",
          "This is just a quick note to circle back.",
          "Please find attached the information as discussed.",
        ],
        correctIndex: 1,
        feedback:
          "The working sentence names a result. The others announce that an update exists.",
      },
      {
        id: "q-writing-2",
        prompt: "A skeptical reader needs the recommendation to appear:",
        options: [
          "After three paragraphs of context",
          "In the first four lines, with the evidence next to it",
          "Only in the closing line",
          "In a separate document",
        ],
        correctIndex: 1,
        feedback:
          "Lead with the point. Context that delays the ask is usually warm-up.",
      },
      {
        id: "q-writing-3",
        prompt: "“Leverage synergies across stakeholders” fails because:",
        options: [
          "It is too short",
          "A reader cannot tell what to do or what changed",
          "It uses a period",
          "It does not name a software brand",
        ],
        correctIndex: 1,
        feedback:
          "If nobody can picture the work, the sentence is not ready to send.",
      },
      {
        id: "q-writing-4",
        prompt: "Before you send a status update, check that:",
        options: [
          "Every adjective sounds impressive",
          "Each sentence says who did what, and what happens next",
          "It is at least a page long",
          "It opens with a greeting about the weather",
        ],
        correctIndex: 1,
        feedback:
          "Subjects, actions and a next step survive review. Length and weather do not.",
      },
    ],
  },
];
