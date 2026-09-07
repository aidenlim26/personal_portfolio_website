export const site = {
  name: "Aiden Lim",
  url: "https://aidenlim.vercel.app",
  email: "aidenlim26w@gmail.com",
  github: "https://github.com/aidenlim26",
  githubHandle: "github.com/aidenlim26",
  linkedin: "https://www.linkedin.com/in/aidenlim26w/",
  linkedinHandle: "linkedin.com/in/aidenlim26w",
  description:
    "Aiden Lim. Co-founder at Timelit and founder and president of the SISHK AI Club. Hong Kong.",
} as const;

export const hero = {
  name: "Aiden Lim",
  location: "Hong Kong",
  roles: ["Co-founder at Timelit", "Founder and president of the SISHK AI Club"],
} as const;

export const aiClub = {
  heading: "AI Club",
  logo: {
    src: "/images/ai-club-logo.jpeg",
    alt: "AI Club logo",
  },
  lead: "I founded the AI Club at Singapore International School Hong Kong in February 2026. It has 81 members.",
  items: [
    {
      title: "Scoliosis screening",
      body: "I direct a screening programme for primary and secondary students. It uses mskalign Wukong, a radiation-free 4D spine alignment system, and runs in collaboration with HKU AIMed.",
    },
    {
      title: "Running the club",
      body: "I secured dedicated funding from the school, ran internal workshops, and worked with school leadership on AI literacy across the campus. The technical pipelines we set up are now used by other student organisations.",
    },
    {
      title: "Speakers",
      body: "I bring in guest speakers from Silicon Valley and Shenzhen, including founders and senior executives. Members hear from people who do the work.",
    },
  ],
  rail: [
    "February 2026 to present",
    "Founder and president",
    "Singapore International School Hong Kong",
  ],
} as const;

export const timelit = {
  heading: "Timelit",
  logo: {
    src: "/images/timelit-logo.png",
    alt: "Timelit logo",
  },
  paragraphs: [
    "Timelit is an AI scheduling assistant. Its agent, Aura, learns when you actually get things done and rearranges the day around that.",
    "I co-founded Timelit in June 2025. I raised HKD 32,000 in early seed funding and recruited the advisory board. I now run the user-testing programme that decides what we change next.",
  ],
  rail: ["June 2025 to present", "Co-founder and chief strategy officer"],
  url: "https://timelit.base44.app",
  urlLabel: "timelit.base44.app",
} as const;

export const simulator = {
  heading: "HFT Trading Simulator",
  paragraphs: [
    "I built the HFT Trading Simulator to practise object-oriented programming, and because I was inspired by quants.",
    "Fifteen bots trade against each other through a matching engine I wrote. Each runs a different quantitative strategy with its own entry and exit logic. Nothing enters the market from outside.",
    "Prices come from a hybrid engine. Eighty per cent is real market data and twenty per cent is the bots' own transaction volume. The market moves because they move it.",
  ],
  rail: ["Python", "Order book, matching engine, fifteen strategy bots"],
  repo: "https://github.com/aidenlim26/hft_trading_simulator",
  repoLabel: "github.com/aidenlim26/hft_trading_simulator",
} as const;

export const eServices = {
  heading: "E-Services Group",
  paragraphs: [
    "I spent the summer of 2025 in Shenzhen as a management intern at E-Services Group.",
    "I built an internal chatbot trained on the company's financial records, promotional material and internal documentation. It was deployed on WeCom, where staff already worked.",
    "It answered most queries in under three seconds. People use an internal tool when it is faster than asking the colleague next to them.",
  ],
  rail: ["July to August 2025", "Management intern", "Shenzhen"],
} as const;

export const recognition = {
  heading: "Recognition",
  items: [
    {
      title: "Gold Award, United Nations World Youth Painting Competition 2026",
      details: ["UNESCO", "Theme: Peaceful Homeland"],
    },
    {
      title: "Gold Award, London Youth Art Competition Finals 2025",
      details: [
        "British Art and Education Group",
        "Theme: A riot of blossoms",
        "Exhibited at Iconic Images Gallery, London, among 1,550+ applicants",
      ],
    },
    {
      title: "Singapore Youth National Ice Hockey Team",
      details: ["Forward", "Since July 2023"],
    },
  ],
} as const;

export const credentials = {
  heading: "Credentials",
  issuer: "DeepLearning.AI",
  certificates: [
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
  education: [
    {
      title: "IGCSE",
      detail: "Nine distinctions, Singapore International School Hong Kong",
    },
    {
      title: "IB Diploma",
      detail:
        "Singapore International School Hong Kong. Higher level mathematics (analysis and approaches), computer science and economics.",
    },
    {
      title: "Languages",
      detail: "English, Cantonese and Mandarin. Working Spanish.",
    },
  ],
} as const;

export const overture = {
  label: "An exploded automatic watch movement",
  skip: "Skip the scene",
  stops: [
    {
      part: "Rotor",
      section: "AI Club",
      href: "#ai-club",
      sentence: "I founded the AI Club at my school in February 2026. It has 81 members.",
      link: "Read about the AI Club",
    },
    {
      part: "Balance wheel",
      section: "Timelit",
      href: "#timelit",
      sentence: "An AI scheduling assistant I co-founded in June 2025.",
      link: "Read about Timelit",
    },
    {
      part: "Gear train",
      section: "HFT Trading Simulator",
      href: "#simulator",
      sentence: "Fifteen bots trading against each other through a matching engine I wrote.",
      link: "Read about the simulator",
    },
    {
      part: "Mainspring barrel",
      section: "E-Services Group",
      href: "#e-services",
      sentence: "An internal chatbot I built in Shenzhen and deployed on WeCom in the summer of 2025.",
      link: "Read about E-Services Group",
    },
  ],
} as const;

export const contact = {
  heading: "Contact",
} as const;
