export const site = {
  name: "Aiden Lim",
  role: "Student founder · ML self-study · Competitive athlete",
  location: "Hong Kong",
  email: "aidenlim26w@gmail.com",
  github: "https://github.com/aidenlim26",
  githubHandle: "github.com/aidenlim26",
  linkedin: "https://linkedin.com/in/aidenlim26w",
  linkedinHandle: "linkedin.com/in/aidenlim26w",
} as const;

export const nav = [
  { id: "about", label: "About" },
  { id: "projects", label: "Timelit" },
  { id: "simulator", label: "Simulator" },
  { id: "ai-club", label: "AI Club" },
  { id: "experience", label: "Experience" },
  { id: "credentials", label: "Credentials" },
  { id: "beyond", label: "Beyond" },
] as const;

export const hero = {
  headline: "I build things — from AI products to award-winning paintings.",
  subhead:
    "Aiden Lim — student founder, ML self-study, and competitive athlete based in Hong Kong.",
} as const;

export const about = {
  paragraph:
    "Aiden is an IGCSE student (9 distinctions, Academic Excellence Award) at Singapore International School Hong Kong, moving into the IBDP in August 2026 with Higher Level Math (Analysis & Approaches), Computer Science, and Economics. Outside the classroom he founded an AI scheduling startup, leads a 65-student AI education club, and is a nationally competitive ice hockey forward. Fluent in English, Cantonese, and Mandarin, with working Spanish.",
  facts: [
    { label: "School", value: "Singapore International School Hong Kong" },
    { label: "Next", value: "IBDP · Aug 2026" },
    { label: "Higher Level", value: "Math AA · Computer Science · Economics" },
    { label: "Languages", value: "English · Cantonese · Mandarin · Spanish (working)" },
  ],
} as const;

// Title used everywhere Timelit is credited. Swap this single value to
// change it site-wide.
export const TIMELIT_ROLE = "Founder & Chief Strategy Officer";

export const timelit = {
  name: "Timelit",
  role: TIMELIT_ROLE,
  period: "Jun 2025 – Present",
  url: "https://timelit.base44.app",
  urlLabel: "timelit.base44.app",
  tagline:
    "Timelit is an AI-powered scheduling assistant. Its AI agent, Aura, learns your habits to proactively suggest optimal times, manage conflicts, and streamline your day.",
  details: [
    "Built an ML/agent-driven scheduling app integrating machine learning models and AI agents to optimize focus blocks and daily workflows",
    "Raised HKD 32,000 in early seed funding and recruited a high-profile advisory board",
    "Ran early user testing programs driving continuous feature and algorithmic refinement",
    "Product includes Calendar, AI Assistant, Preferences, Statistics, and Google Calendar OAuth integration",
  ],
} as const;

export const simulator = {
  name: "HFT Trading Simulator",
  stack: "Python3 · Data Structures & Algorithms · OOP",
  repo: "https://github.com/aidenlim26/hft_trading_simulator",
  details: [
    {
      title: "Autonomous strategy bots",
      body: "Programmed 15 autonomous bots executing distinct quantitative strategies with custom entry/exit logic.",
    },
    {
      title: "Matching engine",
      body: "Engineered a matching engine where bots trade exclusively with each other.",
    },
    {
      title: "Hybrid pricing engine",
      body: "Built a hybrid pricing engine blending 80% real market data with 20% bot transaction volume to simulate real-time price impact.",
    },
  ],
} as const;

export const aiClub = {
  title: "AI Club",
  role: "Founder & President · Singapore International School Hong Kong",
  period: "Feb 2026 – Present",
  pillars: [
    {
      title: "Program Leadership & Scale",
      body: "Spearheading global AI educational programs, scaling membership to 65+ students, and securing dedicated institutional funding.",
    },
    {
      title: "Campus & Ecosystem Integration",
      body: "Partnered directly with school leadership to advance campus-wide AI literacy; hosted internal workshops and cross-school initiatives.",
    },
    {
      title: "Technical Pipelines",
      body: "Formulated scalable technical architecture and workflows to empower adjacent student organizations.",
    },
    {
      title: "Strategic Partnerships",
      body: "Secured guest speakers across Silicon Valley, Shenzhen tech hubs, tech founders, and C-suite executives.",
    },
    {
      title: "Special Projects",
      body: "Currently directing deployment of an AI-driven scoliosis screening initiative across primary and secondary student populations, using mskalign™ Wukong (a non-invasive, radiation-free 4D spine alignment system) in collaboration with HKU AIMed.",
    },
  ],
} as const;

export const experience = {
  company: "E-Services Group",
  role: "Management Intern",
  location: "Shenzhen",
  period: "Jul – Aug 2025",
  details: [
    "Independently designed and deployed an enterprise-grade AI chatbot onto enterprise WeCom, trained on internal data (financial records, promotional materials, company documentation) under engineering supervision",
    "Delivered high-accuracy responses with average query response times under 3 seconds",
    "Accelerated new-hire onboarding and streamlined daily internal data-retrieval workflows",
  ],
} as const;

export const credentials = {
  issuer: "DeepLearning.AI via Coursera",
  issued: "Aug 2026",
  items: [
    {
      title: "Mathematics for Machine Learning and Data Science Specialization",
      short: "Specialization",
      image: "/images/math-ml-specialization.png",
      href: "https://coursera.org/verify/specialization/7N0SW774QVSQ",
    },
    {
      title: "Probability & Statistics for Machine Learning & Data Science",
      short: "Course Certificate",
      image: "/images/probability-stats-cert.png",
      href: "https://coursera.org/verify/ZMF9YUR4IWAX",
    },
    {
      title: "Calculus for Machine Learning and Data Science",
      short: "Course Certificate",
      image: "/images/calculus-cert.png",
      href: "https://coursera.org/verify/AVAS1CG3TPBT",
    },
    {
      title: "Linear Algebra for Machine Learning and Data Science",
      short: "Course Certificate",
      image: "/images/linear-algebra-cert.png",
      href: "https://coursera.org/verify/6UPYEQFYGZX9",
    },
  ],
  skills: [
    "Python",
    "Machine Learning",
    "Data Structures & Algorithms",
    "SQL",
    "Strategic Planning",
    "Leadership",
  ],
} as const;

export const beyond = {
  athletics: {
    title: "Singapore Youth National Ice Hockey Team",
    role: "Forward",
    period: "Jul 2023 – Present",
  },
  paintings: [
    {
      title: "Gold Award, United Nations World Youth Painting Competition 2026",
      issuer: "UNESCO",
      theme: "Peaceful Homeland",
      note: null,
      image: "/images/painting-unesco-peaceful-homeland.jpg",
      width: 2628,
      height: 3201,
      alt: "Oil painting of a tall ship moored beside a wooden pier below green coastal mountains, titled for the theme Peaceful Homeland.",
    },
    {
      title: "Gold Award, London Youth Art Competition Finals 2025",
      issuer: "British Art and Education Group",
      theme: "A riot of blossoms",
      note: "Exhibited at Iconic Images Gallery, London, among 1,550+ applicants.",
      image: "/images/painting-london-riot-of-blossoms.jpg",
      width: 2351,
      height: 2950,
      alt: "Oil painting of purple blossoms in a golden vase set in a rustic wooden window frame, titled for the theme A riot of blossoms.",
    },
  ],
} as const;
