export interface HeroContent {
    headline: string[];
    rotatingWords: string[];
    subtext: string;
}

export const heroContent: HeroContent = {
    headline: ["WE", "BUILD", "DYNAMIC", "BUSINESSES."],
    rotatingWords: ["AUTOMATED", "AI POWERED", "FOCUSED", "SCALABLE", "MINDFUL", "SUSTAINABLE"],
    subtext: "Operator-led · Long-term · Deliberate",
};

export interface PhilosophyItem {
    statement: string;
    rotatingWords: string[];
    outcome: string;
    description: string;
    color: string;
}

export const philosophyContent: PhilosophyItem[] = [
    {
        statement: "We build.",
        rotatingWords: ["INFRASTRUCTURE", "RELATIONSHIPS", "SYSTEMS", "VALUE"],
        outcome: "Foundations that last decades, not quarters",
        description: "We build the foundations that outlast quarters. Not temporary solutions—permanent pillars.",
        color: "#3b82f6",
    },
    {
        statement: "We operate.",
        rotatingWords: ["WITH INTENT", "AT SCALE", "FOR IMPACT", "WITH PRECISION"],
        outcome: "Efficient execution across all business verticals",
        description: "Operations that scale without friction. Systems that grow stronger under pressure.",
        color: "#8b5cf6",
    },
    {
        statement: "We focus.",
        rotatingWords: ["ON WHAT MATTERS", "ON GROWTH", "ON SUSTAINABILITY", "ON OUTCOMES"],
        outcome: "Laser-sharp prioritization drives results",
        description: "Laser-sharp prioritization drives results. We remove everything that doesn't matter.",
        color: "#ec4899",
    },
    {
        statement: "We compound.",
        rotatingWords: ["EFFORTS", "KNOWLEDGE", "NETWORKS", "CAPITAL"],
        outcome: "Small consistent wins become transformative outcomes",
        description: "Small wins accumulate into transformation. We play infinite games with finite urgency.",
        color: "#f59e0b",
    },
];

export interface ContactContent {
    heading: string;
    description: string;
    emailDescription: string;
    email: string;
    note: string;
}

export const contactContent: ContactContent = {
    heading: "Get in Touch",
    description: "Let's build something\ntogether.",
    emailDescription: "Direct Inquiries",
    email: "hello@thecometcompanies.com",
    note: "Serious inquiries only.",
};

export interface AboutContent {
    story: string;
    mission: string;
    operatingModel: string;
    stats: { label: string; value: string }[];
}

export interface OperatingPrinciple {
    number: string;
    title: string;
    description: string;
}

export interface TeamMember {
    name: string;
    role: string;
}

export interface Insight {
    title: string;
    date: string;
}

export const aboutContent: AboutContent = {
    story: "We are an operator-led holding company that builds and operates focused businesses for the long term. We don't chase trends or buzzwords—we build what's real.",
    mission: "To create durable, valuable businesses that compound over time by combining operational excellence with clear strategic thinking.",
    operatingModel: "We acquire, build, and operate businesses end-to-end. Every company in our portfolio receives hands-on operational support, strategic direction, and the resources needed to scale sustainably.",
    stats: [
        { label: "Years Operating", value: "10+" },
        { label: "Portfolio Companies", value: "6" },
        { label: "Industries", value: "4" },
    ],
};

export interface PortfolioItem {
    slug: string;
    name: string;
    tagline: string;
    whatItDoes: string;
    problemItSolves: string;
    cometRole: string;
    image: string;
    screenshot: string;
    url: string;
}

export const portfolioItems: PortfolioItem[] = [
    {
        slug: "dtla-print",
        name: "DTLA Print",
        tagline: "Custom embroidery & screen printing",
        whatItDoes:
            "Operates a high-quality custom embroidery and screen printing service for businesses and individuals in Downtown LA and beyond.",
        problemItSolves:
            "Businesses need reliable, high-quality custom apparel and branding solutions with fast turnaround times.",
        cometRole:
            "Full operator. Comet manages production, fulfillment, and client relationships end-to-end.",
        image: "/portfolio/dtlaprint.png",
        screenshot: "/portfolio/dtlaprint.png",
        url: "https://dtlaprint.com",
    },
    {
        slug: "kases",
        name: "Kases",
        tagline: "Premium phone cases & accessories",
        whatItDoes:
            "Designs and sells premium phone cases and tech accessories through a direct-to-consumer storefront.",
        problemItSolves:
            "Consumers want stylish, durable phone protection that stands out from generic mass-market options.",
        cometRole:
            "Built and operated from scratch. Comet handles product design, sourcing, and e-commerce operations.",
        image: "/portfolio/kases.png",
        screenshot: "/portfolio/kases.png",
        url: "https://kases.com",
    },
    {
        slug: "merch-karma",
        name: "Merch Karma",
        tagline: "Branded merchandise solutions",
        whatItDoes:
            "Provides end-to-end branded merchandise services — from design to production to fulfillment — for companies of all sizes.",
        problemItSolves:
            "Companies struggle to source consistent, high-quality branded merchandise without managing multiple vendors.",
        cometRole:
            "Full-stack operator. Comet manages the entire merchandise pipeline in-house.",
        image: "/portfolio/merchkarma.png",
        screenshot: "/portfolio/merchkarma.png",
        url: "https://merchkarma.com",
    },
    {
        slug: "shop-titan",
        name: "Shop Titan",
        tagline: "E-commerce platform & tools",
        whatItDoes:
            "Powers online storefronts with integrated inventory, order management, and analytics tools for growing brands.",
        problemItSolves:
            "Growing e-commerce brands need scalable infrastructure without the complexity of enterprise platforms.",
        cometRole:
            "Internal product team. Comet builds and maintains the platform to serve portfolio brands.",
        image: "/portfolio/shoptitan.png",
        screenshot: "/portfolio/shoptitan.png",
        url: "https://shoptitan.app",
    },
    {
        slug: "mika-jaymes",
        name: "Mika Jaymes",
        tagline: "Luxury fashion brand",
        whatItDoes:
            "Curates and sells luxury fashion collections through a premium direct-to-consumer experience.",
        problemItSolves:
            "Fashion-forward consumers want access to curated luxury pieces without traditional retail markups.",
        cometRole:
            "Brand builder and operator. Comet manages creative direction, sourcing, and DTC operations.",
        image: "/portfolio/mikajaymes.png",
        screenshot: "/portfolio/mikajaymes.png",
        url: "https://mikajaymes.com",
    },
    {
        slug: "bluestar-cp",
        name: "BlueStar CP",
        tagline: "Multifamily property management",
        whatItDoes:
            "Manages multifamily residential properties with a focus on tenant experience and operational efficiency.",
        problemItSolves:
            "Multifamily property owners need professional management that maximizes occupancy while maintaining quality standards.",
        cometRole:
            "Upcoming project. Comet will build and operate the full property management platform.",
        image: "/portfolio/bluestarcp.png",
        screenshot: "/portfolio/bluestarcp.png",
        url: "https://bluestarcp.com",
    },
];

export const operatingPrinciples: OperatingPrinciple[] = [
    {
        number: "01",
        title: "We don't chase trends",
        description: "We build what's real. Not what's trending.",
    },
    {
        number: "02",
        title: "We hire operators",
        description: "Not consultants. People who build and ship.",
    },
    {
        number: "03",
        title: "We optimize for durability",
        description: "Not speed. Businesses that last decades.",
    },
    {
        number: "04",
        title: "We remove noise",
        description: "To find signal. Clarity through elimination.",
    },
];

export const teamMembers: TeamMember[] = [
    {
        name: "Michael Monfared",
        role: "Founder | CEO",
    },
    {
        name: "Diego Aldana",
        role: "Website Manager",
    },
    {
        name: "Trisha Nicole",
        role: "VA SEO",
    },
];

export const insights: Insight[] = [
    {
        title: "The Case Against Growth at All Costs",
        date: "2025",
    },
    {
        title: "Building for the Next Decade, Not the Next Round",
        date: "2025",
    },
    {
        title: "Why We Don't Do Vanity Metrics",
        date: "2024",
    },
];
