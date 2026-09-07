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

export type OvertureBlock = { title?: string; text: string };
export type OvertureLink = { href: string; label: string; external?: boolean };

export const overture = {
  label: "An exploded automatic watch movement",
  skip: "Skip the scene",
  skipHref: "#recognition",
  stops: [
    {
      part: "Rotor",
      section: "AI Club",
      blocks: [
        {
          title: "Program Leadership & Scale",
          text: "Spearheading global AI educational programs, scaling membership to 80+ members and securing dedicated institutional funding.",
        },
        {
          title: "Campus & Ecosystem Integration",
          text: "Partnered directly with school leadership to advance campus-wide AI literacy, hosting internal workshops and cross-school initiatives.",
        },
        {
          title: "Technical Pipelines",
          text: "Formulated scalable technical architecture and workflows to empower adjacent student organizations and campus communities.",
        },
        {
          title: "Strategic Partnerships",
          text: "Executed high-impact industry outreach, securing guest speakers across Silicon Valley, Shenzhen tech hubs, tech founders, and C-suite executives.",
        },
        {
          title: "Special Projects",
          text: "Currently directing the deployment of an AI-driven scoliosis screening initiative across primary and secondary student populations using mskalign\u2122 Wukong\u2014a non-invasive, radiation-free 4D spine alignment system in collaboration with HKU AIMed.",
        },
      ],
    },
    {
      part: "Balance wheel",
      section: "Timelit",
      link: { href: "https://timelit.base44.app", label: "timelit.base44.app", external: true },
      blocks: [
        {
          text: "Built an AI-powered scheduling and productivity application integrating machine learning models and AI agents to optimise focus blocks and daily user workflows.",
        },
        {
          text: "Raised HKD 32,000 in early seed funding and recruited a high-profile advisory board to guide strategic growth and product development.",
        },
        {
          text: "Developed and executed early user testing programs, driving continuous feature iteration and algorithmic refinement toward public launch.",
        },
        {
          text: "Engineered core AI capabilities to analyse individual work habits, eliminate friction and procrastination, and generate adaptive smart schedules.",
        },
      ],
    },
    {
      part: "Gear train",
      section: "HFT Trading Simulator",
      link: {
        href: "https://github.com/aidenlim26/hft_trading_simulator",
        label: "github.com/aidenlim26/hft_trading_simulator",
        external: true,
      },
      blocks: [
        {
          text: "Programmed 15 autonomous bots executing distinct quantitative strategies with custom entry/exit logic.",
        },
        {
          text: "Engineered a matching engine where bots trade exclusively with each other.",
        },
        {
          text: "Built a hybrid pricing engine blending 80% real market data with 20% bot transaction volume to simulate real-time price impact.",
        },
      ],
    },
    {
      part: "Mainspring barrel",
      section: "E-Services Group",
      blocks: [
        {
          title: "Custom AI Chatbot Deployment",
          text: "Independently designed and deployed an enterprise-grade AI chatbot onto enterprise WeCom, trained on internal data\u2014including financial records, promotional materials, and company documentation\u2014under engineering supervision.",
        },
        {
          title: "Security & Performance Optimisation",
          text: "Consistently delivering high-accuracy responses with average query response times under 3 seconds.",
        },
        {
          title: "Workflow Acceleration",
          text: "Enhanced cross-departmental operations by accelerating new hire onboarding and streamlining daily internal data retrieval workflows.",
        },
      ],
    },
  ],
} as const;

export const contact = {
  heading: "Contact",
} as const;
