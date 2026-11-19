import type { Course, Lesson, LessonType, Module } from "../types";

type LessonInput = {
  title: string;
  type: LessonType;
  minutes: number;
  summary: string;
  body: string;
  resourceName?: string;
  quizId?: string;
};

const cover = (id: string, tint: string) => ({
  cover: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&h=788&q=80`,
  coverTint: tint,
});

function buildCourse(
  input: Omit<Course, "modules" | "cover" | "coverTint"> & {
    photo: string;
    tint: string;
    modules: Array<{ title: string; summary: string; lessons: LessonInput[] }>;
  },
): Course {
  const { photo, tint, modules, ...rest } = input;
  return {
    ...rest,
    ...cover(photo, tint),
    modules: modules.map((module, moduleIndex): Module => ({
      id: `${input.id}-m${moduleIndex + 1}`,
      title: module.title,
      summary: module.summary,
      lessons: module.lessons.map(
        (lesson, lessonIndex): Lesson => ({
          id: `${input.id}-m${moduleIndex + 1}-l${lessonIndex + 1}`,
          ...lesson,
        }),
      ),
    })),
  };
}

export const courses: Course[] = [
  buildCourse({
    id: "c-evidence",
    title: "Evidence Before Charts",
    category: "Data & Analytics",
    level: "Intermediate",
    status: "published",
    summary: "Make a comparison you can defend before you open a charting tool.",
    overview:
      "Most weekly reviews fail because the chart is asked to do the thinking. This course walks through the decision, the comparison, and the caveat that has to sit next to the number. You will practice on operations examples: support volume, cohort size, and a chart that hides a drop.",
    outcomes: [
      "State the decision a number is meant to support.",
      "Choose a comparison that a skeptical reader can audit.",
      "Name the caveat in the same place as the claim.",
      "Reject a chart that hides a change in the mix.",
    ],
    instructorId: "jonah",
    tags: ["data", "decisions", "evidence"],
    publishedAt: "2026-06-02",
    updatedAt: "2026-11-12",
    assignment: {
      title: "Name the bias in this chart",
      prompt:
        "Take one chart from your own work. Write five to eight sentences: what decision it is for, what comparison it implies, and which caveat is missing. Do not redesign the chart yet.",
      due: "2026-11-20",
    },
    photo: "photo-1551288049-bebda4e38f71",
    tint: "#8C5A3C",
    modules: [
      {
        title: "Read the claim",
        summary: "Separate the decision from the picture.",
        lessons: [
          {
            title: "What a decision actually needs",
            type: "text",
            minutes: 16,
            summary: "A number is useful only if someone can act on it.",
            body: "Start by writing the decision in one line: continue, stop, or change a specific practice. If you cannot name the decision, you are not ready for a chart. In the support-volume example, “requests doubled” is not a decision. “Staff the Tuesday queue with one more person” is. Keep the decision next to you while you choose the comparison.",
          },
          {
            title: "A chart is an argument",
            type: "text",
            minutes: 14,
            summary: "Titles should state the claim, not the chart type.",
            body: "Replace titles like “Tickets by week” with the claim you are willing to say aloud. Then check whether the picture supports that sentence. If the title is more confident than the data, soften the title. A good test is to read the title to someone who has not seen the sheet and ask what they would do next.",
          },
          {
            title: "Reading a cohort chart",
            type: "video",
            minutes: 12,
            summary: "Watch a short walkthrough of a cohort that looks worse than it is.",
            body: "The placeholder walkthrough uses a six-week onboarding cohort. Week four dips because a public holiday removed two working days, not because the program failed. The useful move is to annotate the holiday on the chart and to show the rate per working day beside the raw count. No video file is attached in this demo.",
          },
        ],
      },
      {
        title: "Make the comparison honest",
        summary: "Find the missing denominator and write the caveat.",
        lessons: [
          {
            title: "Spotting a biased comparison",
            type: "text",
            minutes: 18,
            summary: "A doubled count can be a flat rate.",
            body: "Lay out the numerator and the pool of people who could have produced it. If the pool changed, show the rate. In the new-form example, requests rose from 40 to 80 while the eligible group grew from 100 to 220. The rate fell. The chart of counts alone would send a team to fix the wrong problem. Write both numbers before you choose a visual.",
          },
          {
            title: "Write the caveat first",
            type: "text",
            minutes: 15,
            summary: "Put the limit where the reader cannot miss it.",
            body: "Draft the caveat before the recommendation. One sentence is enough: what the number does not include, which week was unusual, or which group is too small to split. Place it in the same paragraph as the claim. A footnote is where caveats go to be ignored. If the caveat changes the decision, it is part of the decision.",
          },
          {
            title: "Evidence checkpoint",
            type: "quiz",
            minutes: 12,
            summary: "A short check on comparisons, axes and caveats.",
            body: "Answer four questions from the lessons in this course. The result and the prepared feedback stay in this browser. Nothing is sent to an instructor unless you also submit the written assignment.",
            quizId: "q-evidence",
          },
        ],
      },
    ],
  }),
  buildCourse({
    id: "c-hybrid",
    title: "Hybrid Session Craft",
    category: "Professional Practice",
    level: "Intermediate",
    status: "published",
    summary: "Plan a 45-minute session that treats the remote room as present.",
    overview:
      "Hybrid sessions usually fail in the first minute, when the people in the room forget there is anyone else. This course gives you a small arc: one outcome, one practice cycle, and a named person watching the remote room. You will leave with a session plan you can hand to a co-facilitator.",
    outcomes: [
      "Open a session so both rooms know how to participate.",
      "Keep a 45-minute arc to one outcome.",
      "Interrupt a room that talks over remote participants.",
      "Hand a co-facilitator a plan with timing and prompts.",
    ],
    instructorId: "lena",
    tags: ["facilitation", "collaboration"],
    publishedAt: "2026-06-02",
    updatedAt: "2026-11-10",
    assignment: {
      title: "Draft a 45-minute session plan",
      prompt:
        "Write a plan for a session you actually run. Include the outcome, the timing, the prompts, and who is watching the remote room. Cut any activity that does not serve the outcome.",
      due: "2026-11-24",
    },
    photo: "photo-1552664730-d307ca884978",
    tint: "#6E5344",
    modules: [
      {
        title: "The room you actually have",
        summary: "Design for the mixed room, not the ideal one.",
        lessons: [
          {
            title: "Name the room you actually have",
            type: "text",
            minutes: 12,
            summary: "Count the remote people before you design the activity.",
            body: "Write down who is in the room, who is remote, and which tool carries the remote voices. If eight people are remote and three are together, do not plan a whiteboard exercise that only the three can touch. Pick a shared document instead. The constraint is the design.",
          },
          {
            title: "A 45-minute arc",
            type: "text",
            minutes: 16,
            summary: "One outcome, one practice, a short close.",
            body: "Spend about eight minutes on the outcome and the participation rules, twenty-five on a single practice, and the rest on what people will do next. A second framework does not fit. If you love the second framework, it belongs in another session. Write the outcome as something you could observe before the hour ends.",
          },
          {
            title: "Opening a hybrid room",
            type: "video",
            minutes: 11,
            summary: "A placeholder example of the first three minutes.",
            body: "The example opens by telling the room how a remote person gets the floor: they speak, and the facilitator repeats the point on the shared notes before the room responds. There is no live video in this demo. Use the pattern in your own first minute.",
          },
        ],
      },
      {
        title: "Keep both rooms in the work",
        summary: "Repair the session when the room takes over.",
        lessons: [
          {
            title: "The quiet remote person",
            type: "text",
            minutes: 14,
            summary: "Silence on a call is often a design problem.",
            body: "Give remote participants the first pass on a prompt, and say that out loud. Ask for one concrete observation, not “any thoughts?”. If the room starts answering first, pause them. You are not being rude. You are keeping the agreement you made in minute one.",
          },
          {
            title: "Practice prompt: session plan",
            type: "resource",
            minutes: 18,
            summary: "A one-page plan with timing, prompts and roles.",
            body: "Copy the structure into your own notes: outcome, who is in each room, materials, minute-by-minute, and the sentence you will use if the room talks over the call. Fill it for a session you run in the next two weeks. The file itself is a placeholder in this demo.",
            resourceName: "session-plan-one-page.txt",
          },
          {
            title: "Facilitation scenario",
            type: "quiz",
            minutes: 10,
            summary: "Choose a move when the hybrid room slips.",
            body: "Four short scenarios. Pick the move that protects the outcome and the remote room. Prepared feedback appears after you submit. This stays in the browser demo.",
            quizId: "q-hybrid",
          },
        ],
      },
    ],
  }),
  buildCourse({
    id: "c-design",
    title: "Designing a Short Course",
    category: "Learning Design",
    level: "Beginner",
    status: "published",
    summary: "Build one module from a performance gap, not from a topic list.",
    overview:
      "A short course is a sequence of practice, not a tour of everything you know. You will name the performance you want, write outcomes you could observe, and specify a single module tightly enough that another instructor could teach it.",
    outcomes: [
      "Describe the performance gap in plain language.",
      "Write outcomes that name observable work.",
      "Order practice before extra explanation.",
      "Specify one module with activities and checks.",
    ],
    instructorId: "priya",
    tags: ["learning-design", "curriculum"],
    publishedAt: "2026-06-02",
    updatedAt: "2026-11-08",
    assignment: {
      title: "Outline a short module",
      prompt:
        "Specify one module: the outcome, three activities, and how you will know the practice landed. Keep it to a page.",
      due: "2026-11-18",
    },
    photo: "photo-1454165804606-c3d57bc86b40",
    tint: "#3E5C54",
    modules: [
      {
        title: "Start from the work",
        summary: "Topics are not outcomes.",
        lessons: [
          {
            title: "Start from the performance",
            type: "text",
            minutes: 14,
            summary: "Name what people should do differently on a real task.",
            body: "Write the task they already have: a status update, a handoff, a review meeting. Then write what goes wrong. The course exists to change that moment. If the only goal is “understand the topic,” you do not yet have a course. You have a reading list.",
          },
          {
            title: "Outcomes you can observe",
            type: "text",
            minutes: 15,
            summary: "Use verbs a reviewer could score.",
            body: "Prefer “revise a muddy paragraph so the decision is in the first four lines” over “appreciate clear writing.” An observer should be able to say whether it happened. Three outcomes are plenty for a short course. More than that and you are planning a program.",
          },
          {
            title: "Cutting a bloated outline",
            type: "video",
            minutes: 10,
            summary: "A placeholder edit of a twelve-item outline down to one module.",
            body: "The example outline listed every slide the instructor liked. The edit keeps the one outcome about writing a handoff and deletes the history of the department. No video file is connected in this demo. Try the same cut on your own outline.",
          },
        ],
      },
      {
        title: "Specify the module",
        summary: "Make it teachable by someone else.",
        lessons: [
          {
            title: "Sequence practice before theory",
            type: "text",
            minutes: 13,
            summary: "Let people try, then give the language for what happened.",
            body: "Open with a short flawed example and ask what they would change. Then name the principle they just used. People remember the principle because they needed it. A twenty-minute definition up front mostly produces notes nobody rereads.",
          },
          {
            title: "One module, fully specified",
            type: "text",
            minutes: 18,
            summary: "Activities, timing, materials and a check.",
            body: "For the module, write the outcome, the materials, the minutes, the facilitator moves, and the check. The check can be a written artifact or a conversation. If another instructor cannot tell what “good” looks like, the module is not specified yet.",
          },
          {
            title: "Module outline template",
            type: "resource",
            minutes: 12,
            summary: "A plain structure for a one-page module spec.",
            body: "Use the headings outcome, learner task, activities, check, and what you will cut if the session runs short. Download is simulated here. Copy the headings into the assignment if you are submitting the outline.",
            resourceName: "module-outline-template.txt",
          },
        ],
      },
    ],
  }),
  buildCourse({
    id: "c-writing",
    title: "Writing That Survives Review",
    category: "Professional Practice",
    level: "Beginner",
    status: "published",
    summary: "Put the decision in the first four lines and cut the warm-up.",
    overview:
      "Reviewers are impatient and usually right to be. This course is about status updates, recommendations and short memos that still make sense when the friendly context is gone. You will practice on muddy paragraphs, not on slogans about clarity.",
    outcomes: [
      "Lead with the decision or the result.",
      "Cut throat-clearing and empty verbs.",
      "Give a skeptical reader the evidence beside the ask.",
      "Edit a paragraph until each sentence has a job.",
    ],
    instructorId: "lena",
    tags: ["writing", "communication"],
    publishedAt: "2026-07-01",
    updatedAt: "2026-11-14",
    assignment: {
      title: "Rewrite a muddy paragraph",
      prompt:
        "Paste a paragraph from a real update. Rewrite it so a skeptical reader can see the result and the next step in the first four lines. Include the original underneath.",
      due: "2026-11-26",
    },
    photo: "photo-1455390582262-044cdead277a",
    tint: "#8A4E3A",
    modules: [
      {
        title: "The sentence that works",
        summary: "Find the line that carries the update.",
        lessons: [
          {
            title: "The sentence that does the work",
            type: "text",
            minutes: 12,
            summary: "Most updates bury the only sentence that matters.",
            body: "Highlight the sentence that would still be useful if everything else was deleted. If it says “we wanted to reach out,” you have not found it. A working sentence names a result or a request: “The pilot cut repeat calls by 12% in March. Keep it for the east queue.” Move that sentence up.",
          },
          {
            title: "Cut the warm-up",
            type: "text",
            minutes: 11,
            summary: "Hope-this-finds-you-well is not context.",
            body: "Delete the first paragraph if it only announces that an update is coming. Context is the constraint the reader needs, not a greeting. One clause of context is often enough: “For Tuesday’s staffing decision.” Then the result.",
          },
          {
            title: "Editing a status update",
            type: "video",
            minutes: 9,
            summary: "A placeholder pass over a bloated weekly note.",
            body: "The before-and-after in the walkthrough cuts 180 words to 70. The ask moves from the last line to the second. No video provider is connected. Try the same cut: result, evidence, ask, caveat.",
          },
        ],
      },
      {
        title: "For a skeptical reader",
        summary: "Make the update hold up without you in the room.",
        lessons: [
          {
            title: "Structure for a skeptical reader",
            type: "text",
            minutes: 14,
            summary: "Result, evidence, ask, caveat — in that order.",
            body: "A skeptical reader looks for what changed and what you want. Give them both before the backstory. If a number needs a limit, put the limit in the evidence sentence, not in a later apology. Read it aloud. If you run out of breath before the ask, it is still too long.",
          },
          {
            title: "Clarity checklist",
            type: "resource",
            minutes: 8,
            summary: "Five checks before you send an update.",
            body: "Check that the first four lines contain the point, that each sentence has a subject doing something, that the ask names a person and a time, and that you deleted “just,” “quickly,” and “circle back.” The file is a demo placeholder.",
            resourceName: "clarity-checklist.txt",
          },
          {
            title: "Clarity quiz",
            type: "quiz",
            minutes: 10,
            summary: "Choose the line that would survive a review.",
            body: "Four questions on leads, empty verbs and what a skeptical reader needs. Feedback is prepared for this demo and saved only in the browser.",
            quizId: "q-writing",
          },
        ],
      },
    ],
  }),
  buildCourse({
    id: "c-rubrics",
    title: "Rubrics That Change Behavior",
    category: "Learning Design",
    level: "Advanced",
    status: "published",
    summary: "Write levels that describe the work, then calibrate them with another reviewer.",
    overview:
      "A rubric is a teaching tool that happens to produce a score. This course is for people who already review work and want the levels to change the next attempt. You will separate description from judgment and run a small calibration.",
    outcomes: [
      "Describe the work at each level without labeling the person.",
      "Make adjacent levels visibly different.",
      "Use a rubric in a conversation, not only a spreadsheet.",
      "Calibrate with another reviewer on the same sample.",
    ],
    instructorId: "priya",
    tags: ["assessment", "learning-design"],
    publishedAt: "2026-08-04",
    updatedAt: "2026-11-06",
    assignment: {
      title: "Critique a rubric",
      prompt:
        "Take a rubric you use or inherit. Rewrite two levels so they describe observable work, and note one place where reviewers would still disagree.",
      due: "2026-12-04",
    },
    photo: "photo-1517245386807-bb43f82c33c4",
    tint: "#5C5270",
    modules: [
      {
        title: "Describe the work",
        summary: "Levels are pictures of the artifact.",
        lessons: [
          {
            title: "A rubric is a teaching tool",
            type: "text",
            minutes: 13,
            summary: "People should know what to try next, not only their score.",
            body: "If a learner cannot tell what to change after reading their level, the rubric is a filing system. Write the higher level as the next visible change in the work. “More professional” is not a change. “The recommendation is in the first four lines” is.",
          },
          {
            title: "Describe the work, not the person",
            type: "text",
            minutes: 12,
            summary: "Avoid traits. Point at the artifact.",
            body: "Replace “shows mastery” and “lacks effort” with what is on the page or in the session. Traits invite argument about identity. Descriptions of the work invite a revision. Read each line and ask: could two reviewers point at the same sentence?",
          },
          {
            title: "Levels that are actually different",
            type: "text",
            minutes: 16,
            summary: "If you remove the labels, the descriptions should still sort.",
            body: "Print the levels without the words excellent, adequate and poor. Ask a colleague to order them. If they cannot, the levels overlap. A common fix is to vary one dimension only: where the decision sits, how specific the evidence is, or whether the caveat is present.",
          },
        ],
      },
      {
        title: "Calibrate",
        summary: "A rubric is unfinished until two people use it.",
        lessons: [
          {
            title: "Calibration conversation",
            type: "video",
            minutes: 11,
            summary: "A placeholder of two reviewers scoring the same memo.",
            body: "They agree on the score and disagree on the reason. The useful part is the reason. They add one line to the rubric so the next review does not depend on memory. No live video is attached.",
          },
          {
            title: "Sample rubric",
            type: "resource",
            minutes: 14,
            summary: "A four-level rubric for a short recommendation.",
            body: "The sample scores only three things: the decision is visible, the evidence is beside it, and the caveat is explicit. Use it as a pattern, then replace the criteria with the work you actually review. Download is simulated.",
            resourceName: "recommendation-rubric.txt",
          },
          {
            title: "Try the rubric on a real piece",
            type: "text",
            minutes: 18,
            summary: "Score one artifact and write the feedback in the rubric’s language.",
            body: "Pick a paragraph, a plan or a chart note. Choose a level and quote the part of the work that put it there. Then write one sentence of feedback that uses the next level’s description. If you cannot quote the work, you are scoring a feeling.",
          },
        ],
      },
    ],
  }),
  buildCourse({
    id: "c-models",
    title: "Models for a Monday Decision",
    category: "Data & Analytics",
    level: "Beginner",
    status: "published",
    summary: "Build a one-sheet model that a colleague can audit without you.",
    overview:
      "This is not a tour of spreadsheet features. You will build a small model for a decision you actually have on Monday: a forecast, a capacity check, or a cost comparison. Assumptions live in named cells. The output is a sentence, not a dashboard.",
    outcomes: [
      "Frame one decision and the number that would change it.",
      "Put assumptions where another person can edit them.",
      "Show how the result moves when one assumption changes.",
      "Hand off the sheet with a short note.",
    ],
    instructorId: "jonah",
    tags: ["data", "spreadsheets", "decisions"],
    publishedAt: "2026-06-20",
    updatedAt: "2026-11-11",
    assignment: {
      title: "Quarterly forecast workbook",
      prompt:
        "Describe a one-sheet forecast: the decision, three assumptions with sources, the output sentence, and what happens if the main assumption is 10% worse. You do not need to attach a live file in this demo.",
      due: "2026-11-21",
    },
    photo: "photo-1460925895917-afdab827c52f",
    tint: "#3D5E72",
    modules: [
      {
        title: "One question, one sheet",
        summary: "Shrink the model until it fits the decision.",
        lessons: [
          {
            title: "One question, one sheet",
            type: "text",
            minutes: 13,
            summary: "If the model answers five questions, it will answer none on Monday.",
            body: "Write the question at the top of the sheet. Example: “Do we add a Tuesday shift in April?” Everything that does not change that answer comes out. A second tab for curiosity is how models become unread. Keep the history in a note if you must, not in the calculation path.",
          },
          {
            title: "Assumptions in a named cell",
            type: "text",
            minutes: 15,
            summary: "Inputs are not buried in formulas.",
            body: "List assumptions in a column: name, value, source, date. Formulas point at those cells. A colleague should change the growth rate without hunting through a formula. If you cannot point at the cell that holds “calls per hour,” the model is not ready to share.",
          },
          {
            title: "A forecast you can explain",
            type: "video",
            minutes: 12,
            summary: "A placeholder tour of a one-sheet capacity check.",
            body: "The sheet has six inputs and one sentence at the bottom: “At 18 calls an hour, Tuesday still clears. At 22, it does not.” The walkthrough is a placeholder. Build the sentence before you format anything.",
          },
        ],
      },
      {
        title: "Hand it to someone else",
        summary: "A model that only you can run is a private note.",
        lessons: [
          {
            title: "Sensitivities without theater",
            type: "text",
            minutes: 14,
            summary: "Move one assumption and say what happens.",
            body: "Pick the assumption the room will argue about. Show the result at the current value, a bit worse, and a bit better. Three rows are enough. A data table with fifty scenarios looks thorough and hides the decision. Label the row that would change your recommendation.",
          },
          {
            title: "Model checklist",
            type: "resource",
            minutes: 8,
            summary: "What to check before you send the sheet.",
            body: "The decision is written at the top. Inputs are separated from formulas. Each input has a source. The output is a sentence. One sensitivity is visible. The file in this demo is a placeholder, not a downloadable workbook.",
            resourceName: "model-checklist.txt",
          },
          {
            title: "Hand off the workbook",
            type: "text",
            minutes: 12,
            summary: "Write the note you would send with the file.",
            body: "Four lines: the decision, the output sentence, the assumption most likely to be wrong, and what you want the reader to do. Do not narrate how hard the formulas were. If they need a tour, the sheet is not finished.",
          },
        ],
      },
    ],
  }),
  buildCourse({
    id: "c-coaching",
    title: "Coaching a Stuck Learner",
    category: "Professional Practice",
    level: "Intermediate",
    status: "draft",
    summary: "A short draft on questions that help someone choose a next step.",
    overview:
      "This course is still in draft. It is about the conversation after someone stalls: what you ask, what you do not advise, and how you close with a commitment small enough to happen this week. It is not published to learners.",
    outcomes: [
      "Tell the difference between being stuck and being unwilling.",
      "Ask a question that returns the choice to the learner.",
      "End with one commitment and a time to check it.",
    ],
    instructorId: "lena",
    tags: ["coaching", "facilitation"],
    updatedAt: "2026-11-18",
    photo: "photo-1521737604893-d14cc237f11d",
    tint: "#7A5A3A",
    modules: [
      {
        title: "Notice the stall",
        summary: "Name what is stuck before you offer a plan.",
        lessons: [
          {
            title: "What stuck looks like",
            type: "text",
            minutes: 10,
            summary: "Missed drafts, repeated questions, and silence are different signals.",
            body: "A missed draft with a specific blocker is a work problem. The same question three times is often a confidence problem. Silence after enrollment may be access or priority. Write which one you are seeing before you book a conversation. This lesson is still a draft.",
          },
          {
            title: "A question that is not advice",
            type: "text",
            minutes: 12,
            summary: "Advice feels helpful and often ends the person’s thinking.",
            body: "Try “What have you already tried?” and “What would a smaller version of this look like this week?” Then wait. If you hear yourself explaining the whole module, you have left the coaching conversation. Draft note: add two transcribed examples before publish.",
          },
        ],
      },
      {
        title: "Close the loop",
        summary: "A commitment you can both remember.",
        lessons: [
          {
            title: "The next small commitment",
            type: "text",
            minutes: 9,
            summary: "One action, one time, no new framework.",
            body: "Agree on the next visible action: finish lesson four, send the paragraph, or book twenty minutes. Put a day on it. A commitment to “be more consistent” cannot be reviewed. This lesson needs a worked example before the course is published.",
          },
          {
            title: "Close the loop",
            type: "text",
            minutes: 8,
            summary: "Write the check-in while you are still in the conversation.",
            body: "Before you leave, send one line: the commitment and the day you will look at it. Then actually look. Coaching that never returns teaches people the conversation was theater. Draft status: examples still to be added.",
          },
        ],
      },
    ],
  }),
  buildCourse({
    id: "c-visual",
    title: "Show the Point Visually",
    category: "Data & Analytics",
    level: "Intermediate",
    status: "published",
    summary: "Turn one claim into a page someone can read without a tour.",
    overview:
      "Decoration is not explanation. This course is for people who already have a finding and need a single page: a chart, a few annotations, and a sentence. You will practice removing ink until the claim is the thing a tired reader sees first.",
    outcomes: [
      "Choose the sentence before the picture.",
      "Annotate the point instead of adding another series.",
      "Cut decoration that does not change the reading.",
      "Give a one-page critique another person can use.",
    ],
    instructorId: "jonah",
    tags: ["data", "visual", "communication"],
    publishedAt: "2026-11-03",
    updatedAt: "2026-11-16",
    assignment: {
      title: "One-page visual argument",
      prompt:
        "Describe one page: the claim as a title, the comparison, two annotations, and what you removed. A sketch in words is enough for this demo.",
      due: "2026-12-02",
    },
    photo: "photo-1531403009284-440f080d1e12",
    tint: "#3E5C48",
    modules: [
      {
        title: "Sentence, then picture",
        summary: "The visual is there to carry a line of text.",
        lessons: [
          {
            title: "Pick the sentence, then the picture",
            type: "text",
            minutes: 12,
            summary: "If the title is boring, the chart will be too.",
            body: "Write the sentence a reader should remember. Then ask which comparison makes that sentence visible. A line is for change over time. Bars are for a comparison of a few things. A pie is rarely the answer. If you cannot write the sentence, you are decorating a spreadsheet.",
          },
          {
            title: "Annotation beats decoration",
            type: "text",
            minutes: 13,
            summary: "Label the point on the chart. Do not make the reader hunt.",
            body: "Put a short note at the mark that matters: the holiday week, the policy change, the outlier team. Direct labels beat a legend when you have only a few series. Color is for the series the sentence is about. Everything else can be quiet.",
          },
          {
            title: "Redesigning a busy slide",
            type: "video",
            minutes: 10,
            summary: "A placeholder redesign that deletes half the ink.",
            body: "The before slide has six colors, a 3D column and a title that says “Overview.” The after slide has one line, two labels and the title “Repeat calls fell after the Tuesday shift.” No video file is connected. Use the after title as the standard.",
          },
        ],
      },
      {
        title: "One page",
        summary: "Enough for a decision, not a gallery.",
        lessons: [
          {
            title: "One page, one claim",
            type: "text",
            minutes: 14,
            summary: "A second chart needs a second meeting.",
            body: "The page has a title that is the claim, one visual, two annotations, and a line about what you want done. If you need a second chart, you have a second claim. Make another page. Crowding both claims onto one slide is how neither gets a decision.",
          },
          {
            title: "Critique checklist",
            type: "resource",
            minutes: 8,
            summary: "Questions to ask of any one-page argument.",
            body: "Can you read the claim from the title alone? Is the comparison labeled? Are there annotations at the point? Is color doing one job? What was removed? The checklist file is a placeholder in this demo.",
            resourceName: "visual-critique-checklist.txt",
          },
          {
            title: "Pair review",
            type: "text",
            minutes: 16,
            summary: "Trade pages and point at the first place you hesitated.",
            body: "Give a partner ten seconds and ask what they think the page is asking them to do. If they hesitate, the title or the annotation failed. Do not explain it. Fix the page until the ten-second reading matches your sentence.",
          },
        ],
      },
    ],
  }),
];
