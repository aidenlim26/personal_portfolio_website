export const site = {
  name: "Aiden Lim",
  url: "https://aidenlim.vercel.app",
  email: "aidenlim26w@gmail.com",
  github: "https://github.com/aidenlim26",
  githubHandle: "github.com/aidenlim26",
  linkedin: "https://linkedin.com/in/aidenlim26w",
  linkedinHandle: "linkedin.com/in/aidenlim26w",
} as const;

export const nav = [
  { id: "about", label: "about" },
  { id: "ai-club", label: "work" },
  { id: "contact", label: "contact" },
] as const;

export const hero = {
  lines: ["I work on three surfaces.", "Ice, canvas, and a text editor."],
  panels: {
    ice: "ice",
    canvas: "canvas",
    code: "code",
  },
} as const;

export const about = {
  heading: "Who I am",
  paragraph:
    "I'm sixteen, I live in Hong Kong, and I go to Singapore International School. I finished my IGCSEs with nine distinctions and start the IB Diploma next August, taking maths, computer science and economics at higher level. Outside school I run a startup and a club, paint in oils, and play forward for Singapore's youth national ice hockey team.",
  rail: [
    "Singapore International School Hong Kong",
    "IB Diploma from August 2026",
    "Higher level: mathematics (analysis and approaches), computer science, economics",
    "English, Cantonese and Mandarin; working Spanish",
  ],
} as const;

/** The page's only count-up. */
export const stats = [
  { value: 32000, suffix: "", label: "HKD raised for Timelit" },
  { value: 81, suffix: "", label: "AI Club members" },
  { value: 15, suffix: "", label: "trading bots running" },
  { value: 1550, suffix: "+", label: "applicants beaten in London" },
] as const;

export const aiClub = {
  heading: "AI Club",
  lead: "I founded the AI Club at my school in February 2026 and it now has eighty-one members. Most of what it does happens off campus.",
  rail: [
    "Feb 2026 —",
    "Founder and president",
    "Singapore International School Hong Kong",
  ],
  items: [
    {
      title: "Screening for scoliosis with AI",
      body: "I am directing a screening programme across primary and secondary students using mskalign Wukong, a radiation-free 4D spine alignment system, in collaboration with HKU AIMed. It is the club's first project where getting it wrong would matter to someone.",
    },
    {
      title: "Building the club to eighty-one members",
      body: "I secured dedicated institutional funding, ran internal workshops, and worked with school leadership on campus-wide AI literacy. The technical pipelines we set up are now used by adjacent student organisations.",
    },
    {
      title: "Bringing in people from outside school",
      body: "Guest speakers from Silicon Valley and the Shenzhen tech hubs, founders and C-suite executives. The point is that members hear from people who are doing the work rather than from me.",
    },
  ],
} as const;

export const eServices = {
  heading: "E-Services Group",
  paragraphs: [
    "I spent the summer of 2025 in Shenzhen building an enterprise chatbot for E-Services Group, trained on the company's own financial records, promotional material and internal documentation, and deployed onto WeCom where staff already worked.",
    "It answered most queries in under three seconds. That turned out to matter more than accuracy alone — people only use an internal tool if it is faster than asking the colleague next to them.",
  ],
  rail: ["Jul – Aug 2025", "Management intern", "Shenzhen"],
} as const;

export const timelit = {
  heading: "Timelit",
  paragraphs: [
    "Timelit is an AI scheduling assistant. Its agent, Aura, learns when you actually get things done and rearranges the day around that, rather than around the calendar you wrote in a moment of optimism.",
    "I co-founded it in June 2025, raised HKD 32,000 in early seed funding, and recruited the advisory board. I now run the user-testing programme that decides what we change next.",
  ],
  rail: ["Jun 2025 —", "Co-founder and chief strategy officer"],
  url: "https://timelit.base44.app",
  urlLabel: "timelit.base44.app",
} as const;

export const simulator = {
  heading: "HFT trading simulator",
  paragraphs: [
    "Fifteen bots, each running a different quantitative strategy with its own entry and exit logic, trade only against each other through a matching engine I wrote. Nothing enters the market from outside.",
    "Prices come from a hybrid engine: eighty per cent real market data, twenty per cent the bots' own transaction volume. The market moves because they move it, which is the part I wanted to watch.",
  ],
  todo: "TODO(aiden): replace this with why you built it and what surprised you. One or two sentences. This is the paragraph an admissions reader will remember, and it has to be yours.",
  rail: ["Python", "Order book, matching engine, fifteen strategy bots"],
  repo: "https://github.com/aidenlim26/hft_trading_simulator",
  repoLabel: "github.com/aidenlim26/hft_trading_simulator",
} as const;

export const paintings = {
  heading: "Painting",
  todo: "TODO(aiden): if you want to say anything about the paintings beyond the awards — how long they took, what you were trying to get right — write it here. Leave it out if you would rather the paintings spoke for themselves.",
  works: [
    {
      title: "A riot of blossoms",
      award: "Gold award, London Youth Art Competition finals 2025",
      image: "/images/painting-london-riot-of-blossoms.jpg",
      width: 2351,
      height: 2950,
      alt: "Oil painting of purple blossoms spilling from a gold vase set on a weathered window sill, against a yellow and blue wall.",
      rail: [
        "British Art and Education Group",
        "Exhibited at Iconic Images Gallery, London",
        "1,550+ applicants",
      ],
    },
    {
      title: "Peaceful homeland",
      award: "Gold award, United Nations World Youth Painting Competition 2026",
      image: "/images/painting-peaceful-homeland.jpg",
      width: 2360,
      height: 2870,
      alt: "Oil painting of a tall ship moored at a wooden pier beneath green coastal mountains.",
      rail: ["UNESCO"],
    },
  ],
} as const;

export const hockey = {
  heading: "Ice hockey",
  paragraph:
    "I play forward for Singapore's youth national team. Most of what I know about working with people who are better than me, I learned on a rink at six in the morning.",
  rail: ["Jul 2023 —", "Forward", "Singapore youth national team"],
  image: {
    src: "/images/hockey-celebration.jpg",
    width: 1368,
    height: 1213,
    alt: "Two players in red embrace on the ice after a goal while a third skates in behind them.",
  },
} as const;

export const credentials = {
  heading: "Credentials",
  issuer: "DeepLearning.AI",
  items: [
    {
      title: "Mathematics for Machine Learning and Data Science Specialization",
      href: "https://coursera.org/verify/specialization/7N0SW774QVSQ",
    },
    {
      title: "Probability & Statistics for Machine Learning & Data Science",
      href: "https://coursera.org/verify/ZMF9YUR4IWAX",
    },
    {
      title: "Calculus for Machine Learning and Data Science",
      href: "https://coursera.org/verify/AVAS1CG3TPBT",
    },
    {
      title: "Linear Algebra for Machine Learning and Data Science",
      href: "https://coursera.org/verify/6UPYEQFYGZX9",
    },
  ],
} as const;
