import type { BlogPost } from "../types";

export const repeticaoEspacada_en: BlogPost = {
  locale: "en",
  translationOf: "repeticao-espacada-aprendizado-vocabulario",
  // IMPORTANT: EN post reuses the PT slug (see analise-tarefa-1 precedent).
  // hreflang/alternates and hasEnglishBlogPost() key off this exact slug.
  slug: "repeticao-espacada-aprendizado-vocabulario",
  title: "Spaced Repetition in Learning Portuguese: What the Science Says",
  subtitle:
    "Why reviewing a word at the right moment beats reviewing it ten times in one day.",
  seoTitle: "Spaced repetition for Portuguese: what the science says (SRS)",
  seoDescription:
    "How spaced repetition (SRS) works for learning Portuguese vocabulary: the forgetting curve, what neuroscience shows, and why translation flashcards aren't enough.",
  eyebrow: "Blog / Methodology",
  category: "How to study",
  readTime: "9–11 min",
  featured: false,
  publishedAt: "2026-06-22",
  tags: [
    "spaced repetition",
    "SRS",
    "vocabulary",
    "memory",
    "methodology",
    "Celpe-Bras",
    "collocations",
  ],
  faq: [
    {
      question: "What is spaced repetition (SRS)?",
      answer:
        "Spaced repetition is a review system that schedules each word to be reviewed right before you're about to forget it. If you recall it easily, the interval until the next review grows; if you forget, the interval resets. The goal is to lock the word into long-term memory with the least total effort.",
    },
    {
      question: "How many times do I need to review a word to retain it?",
      answer:
        "Research suggests around 8 to 10 exposures for reliable receptive acquisition of a single word, and 10 to 15 (or more) for collocations — fixed combinations like 'take into account' or 'make a point of'. Productive use (writing the word yourself) usually requires even more encounters.",
    },
    {
      question: "Why aren't translation flashcards enough?",
      answer:
        "A translation flashcard triggers a low level of cognitive involvement. According to the Involvement Load Hypothesis, depth of processing depends on need, search and evaluation. Writing your own sentence with the word activates all three components and beats simple flashcards for long-term retention.",
    },
    {
      question: "Does spaced repetition help with Celpe-Bras prep?",
      answer:
        "Yes. Celpe-Bras rewards natural use of the language, which depends on active vocabulary and well-fixed collocations. A spaced-repetition system that treats collocations as units and prioritizes words you used incorrectly in writing speeds up consolidation of exactly the vocabulary the exam demands.",
    },
  ],
  sidebar: {
    summary:
      "Spaced repetition (SRS) schedules each word to be reviewed just before you forget it. The science shows consistent retention gains — and that writing your own sentences beats translation flashcards. Here's how we apply it.",
    audienceHeading: "Who this article is for",
    audience: [
      "Learners who study Portuguese and forget vocabulary soon after learning it",
      "Celpe-Bras candidates who want active vocabulary, not last-minute cramming",
      "PFL teachers interested in the scientific basis of the method",
    ],
    links: [
      {
        label: "Celpe-Bras guide",
        href: "/en/celpe-bras",
        hint: "Format, parts, criteria and levels of the exam",
      },
      {
        label: "Past exams",
        href: "/en/past-exams/2026-1",
        hint: "Practice vocabulary in context with real exams",
      },
    ],
  },
  blocks: [
    {
      type: "p",
      lead: true,
      content:
        "Have you ever studied a list of Portuguese words the night before a test, passed the test — and forgotten everything within a week? This phenomenon has a name: Ebbinghaus's forgetting curve, first documented in 1885 and confirmed by countless studies since. Memory isn't a static file: it's an active process, and the moment you review information determines whether it consolidates for the long term.",
    },
    {
      type: "p",
      content:
        "Spaced repetition (the Spaced Repetition System, SRS) is the scientific answer to this problem. In this article we explain what it is, what neuroscience shows, and why it sits at the heart of our preparation method.",
    },
    { type: "h2", content: "What spaced repetition is" },
    {
      type: "p",
      content:
        "Spaced repetition is a review system that schedules each word to be reviewed at the exact moment you're about to forget it — not before, not after. If you recall the word easily, the next interval grows (3 days, then 7, then 14, then 30...). If you forget, the interval resets to zero.",
    },
    {
      type: "p",
      content: "The mechanism exploits two fundamental cognitive principles:",
    },
    {
      type: "ul",
      items: [
        "The spacing effect: spreading reviews over time is more effective than massing them together (massed practice). Reviewing \"saudade\" today, then in 3 days, then in 7 fixes it far better than reviewing it 10 times today.",
        "The testing effect: simply trying to recall a word — before seeing the answer — activates memory mechanisms that passive reading does not. Each retrieval attempt strengthens the neural trace.",
      ],
    },
    { type: "h2", content: "What neuroscience says about spacing" },
    {
      type: "p",
      content:
        "The advantage of spacing isn't only behavioral — it has a neurophysiological basis. A study by Sisti, Glass and Shors (Rutgers), published in Learning & Memory, investigated the impact of spacing on the hippocampus and showed that subjects trained with spaced sessions not only learned better, but retained the memory far longer than those trained in a massed way. The mechanism: spaced learning favors the survival of newly generated neurons in the dentate gyrus of the hippocampus, creating a more durable physical representation of the memory.",
    },
    {
      type: "p",
      content:
        "In cognitive psychology, the phenomenon is explained by the theory of desirable difficulty: spacing forces the brain to work harder to retrieve information, and that effort is precisely what consolidates long-term memory. Massed sessions (cramming) boost short-term recall but reduce long-term encoding.",
    },
    {
      type: "callout",
      title: "In one sentence",
      content:
        "Little retrieval effort, lots of passive repetition → forgetting. Retrieval effort at the right moment, spaced over time → memory that lasts.",
    },
    { type: "h2", content: "What the research quantifies in language learning" },
    {
      type: "p",
      content:
        "For second-language vocabulary, the data are consistent. A study evaluating spaced repetition as a structural method for vocabulary teaching found roughly 25% higher word retention compared with traditional methods — and, notably, the gain was independent of the learner's starting level (advanced and beginner learners benefited similarly).",
    },
    {
      type: "p",
      content:
        "The meta-analysis by Kim and Webb (2022), published in Language Learning, confirms that spaced practice has a medium-to-large effect on L2 learning, with the advantage especially clear on delayed post-tests — that is, exactly on long-term retention. In parallel, studies of computer-based SRS have shown marked gains in long-term vocabulary retention over massed repetition.",
    },
    { type: "h3", content: "Collocations demand even more" },
    {
      type: "p",
      content:
        "For collocations — fixed combinations like dar uma olhada (to take a look), levar em conta (to take into account), fazer questão de (to make a point of) — the threshold is higher: research suggests 10 to 15 exposures for reliable acquisition, versus 8 to 10 for single words. In practice this means the system must treat collocations as separate learning units, with their own exposure counters — not dilute them among isolated words.",
    },
    {
      type: "scale",
      title: "Accumulated exposures → expected result",
      content:
        "2–3: fragile, non-persistent recognition · 4–5: onset of receptive recognition · 8–10: reliable receptive acquisition · 14–18: productive (active) use · 15+: collocations — reliable acquisition",
    },
    { type: "h2", content: "Why simple translation flashcards aren't enough" },
    {
      type: "p",
      content:
        "A translation flashcard (front = Portuguese word / back = translation) triggers a relatively low level of cognitive involvement. The Involvement Load Hypothesis (Laufer & Hulstijn, 2001) proposes that the depth of processing of a word depends on three components:",
    },
    {
      type: "ul",
      items: [
        "Need: does the learner need the word to complete the task?",
        "Search: does the learner need to look up the meaning or the form?",
        "Evaluation: does the learner need to judge whether the word is used correctly in context?",
      ],
    },
    {
      type: "p",
      content:
        "A translation flashcard activates need and, partly, search — but not evaluation. Writing your own sentence with the word, on the other hand, activates all three components at the maximum level, and consistently beats simple flashcards for long-term retention. Studies comparing mechanical output tasks with creative ones (essays and compositions) showed substantial vocabulary gains in both — validating the use of writing as a consolidation tool, not just as assessment.",
    },
    {
      type: "p",
      content:
        "That's why we use three card types, in increasing order of processing depth:",
    },
    {
      type: "ul",
      items: [
        "Form → meaning: the Portuguese word; you respond with the translation or definition.",
        "Context → word: a sentence with a blank taken from the original text; you fill it in.",
        "Portuguese definition → word: the definition in the target language; you produce the word.",
      ],
    },
    {
      type: "p",
      content:
        "Type 3 is the most demanding — and the most effective for intermediate and advanced levels. It forces the learner to think in the target language instead of translating mentally, which brings processing closer to real-life use of the language.",
    },
    {
      type: "callout",
      title: "Caution: copying isn't learning",
      content:
        "Forcing a learner to write a word repeatedly without understanding its meaning (mechanical copying) can actually harm learning by draining the cognitive resources needed to encode the form. Productive writing only works when paired with semantic processing — not as an isolated copying task.",
    },
    { type: "h2", content: "The role of sleep in consolidation" },
    {
      type: "p",
      content:
        "Neuroscience has confirmed that sleep is not just rest — it's an active phase of memory consolidation. During sleep, the hippocampus replays recent memories and transfers them to the cortex for long-term storage. The relationship between sleep and spacing is synergistic: part of why spacing works is that the intervals between sessions often include periods of sleep, when consolidation happens.",
    },
    {
      type: "callout",
      title: "Practical tip",
      content:
        "Don't try to cram as many new words as possible before bed — that saturates the system. Review old words (SRS) throughout the day and save new-word study for the evening, when sleep consolidation works in your favor.",
    },
    { type: "h2", content: "How we apply spaced repetition" },
    {
      type: "p",
      content:
        "In our method, the system tracks each word and each collocation individually for every learner, recording:",
    },
    {
      type: "ul",
      items: [
        "The total number of exposures across every mode: reading, audio, flashcard, exercise and writing.",
        "The history of hits and misses by card type.",
        "The date of the last and the next review, according to the SRS algorithm.",
      ],
    },
    {
      type: "p",
      content:
        "The learner sees progress toward the acquisition threshold for each word (an exposure bar for the receptive level and a higher one for the productive level). Words used incorrectly in writing get priority: the interval shrinks and they re-enter the recycling queue in new texts. The evolution of SRS algorithms — from the fixed-interval Leitner system to modern approaches — lets us calibrate the ideal interval for each learner-and-word combination, accounting for the individual error history rather than a generic forgetting curve.",
    },
    {
      type: "p",
      content:
        "This ties directly into the heart of our method: we don't memorize isolated words — we hunt for expressions. In every text we highlight the collocations that speakers actually use; they enter the spaced-repetition system as their own units and keep coming back until you use them naturally in your own writing. That's the method we apply across the whole platform: read, listen, re-read and apply — with the right expressions fixed at the right time.",
    },
    {
      type: "internalLinks",
      links: [
        { label: "Celpe-Bras exam guide", href: "/en/celpe-bras" },
        { label: "Practice with past exams (2026/1)", href: "/en/past-exams/2026-1" },
      ],
    },
    {
      type: "geoBox",
      variant: "summary",
      title: "Summary (for citation)",
      items: [
        "Spaced repetition (SRS) schedules each review just before forgetting; it beats massed review for long-term retention.",
        "The advantage has a neurophysiological basis: spacing favors the survival of new neurons in the hippocampal dentate gyrus (Sisti, Glass & Shors, Learning & Memory).",
        "In L2, spaced practice has a medium-to-large effect, especially on delayed post-tests (Kim & Webb, 2022, Language Learning); studies report ~25% higher vocabulary retention vs. traditional methods.",
        "Collocations need 10–15 exposures (vs. 8–10 for single words) and should be treated as their own learning units.",
        "Translation flashcards trigger low cognitive involvement; writing your own sentences activates need, search and evaluation and retains more (Involvement Load Hypothesis, Laufer & Hulstijn, 2001).",
      ],
    },
    { type: "h2", content: "References" },
    {
      type: "ul",
      items: [
        "Sisti, H. M., Glass, A. L., & Shors, T. J. (2007). Neurogenesis and the spacing effect: learning over time enhances memory and the survival of new neurons. Learning & Memory, 14(5), 368–375. https://citeseerx.ist.psu.edu/document?repid=rep1&type=pdf&doi=d33e51cd7e0c676d60247d45686f6a4b190c7870",
        "Kim, S. K., & Webb, S. (2022). The Effects of Spaced Practice on Second Language Learning: A Meta-Analysis. Language Learning, 72(1). https://onlinelibrary.wiley.com/doi/abs/10.1111/lang.12479",
        "Laufer, B., & Hulstijn, J. (2001). Incidental Vocabulary Acquisition in a Second Language: The Construct of Task-Induced Involvement. Applied Linguistics, 22(1), 1–26. (Involvement Load Hypothesis)",
        "Empirical support for the Involvement Load Hypothesis (review, 2022), Behavioral Sciences. https://pmc.ncbi.nlm.nih.gov/articles/PMC9598591/",
        "Spaced repetition as a basic structural method for organizing vocabulary learning (~25% gain, independent of level). https://dialnet.unirioja.es/descarga/articulo/10258998.pdf",
        "The effectiveness of computer-based spaced repetition in foreign language vocabulary instruction: a double-blind study. CALICO Journal. https://files.eric.ed.gov/fulltext/EJ1143520.pdf",
        "The effect of frequency of exposure on the processing and learning of collocations (eye-tracking; exposures needed for collocations).",
        "The Neuroscience Behind the Spacing Effect. BrainFacts.org (2021). https://www.brainfacts.org/thinking-sensing-and-behaving/learning-and-memory/2021/the-neuroscience-behind-the-spacing-effect-030421",
      ],
    },
  ],
};
