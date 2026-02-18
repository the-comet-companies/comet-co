export interface HeroContent {
    headline: string[];
    rotatingWords: string[];
    subtext: string;
}

export const heroContent: HeroContent = {
    headline: ["WE", "BUILD", "{-----}", "BUSINESSES."],
    rotatingWords: ["AUTOMATED", "AI POWERED", "FOCUSED", "SCALABLE", "MINDFUL", "SUSTAINABLE"],
    subtext: "Operator-led · Long-term · Deliberate",
};

export interface PortfolioItem {
    slug: string;
    name: string;
    tagline: string;
    industry: string;
    location?: string;
    mission: string;
    services: string[];
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
        tagline: "Premium Custom Merch Production",
        industry: "Custom Apparel Manufacturing",
        location: "Vernon / DTLA, California",
        mission: "The most trusted, systemized, premium custom merch partner in the United States.",
        services: ["Screen Printing", "DTG Printing", "Embroidery", "Custom Patches", "Fulfillment", "Brand Integrations"],
        whatItDoes:
            "Premium B2B merch production — screen printing, DTG, embroidery, patches, fulfillment, and brand integrations for businesses and marketing teams.",
        problemItSolves:
            "Businesses need a reliable, high-quality merch partner that handles everything from production to fulfillment — without the headaches.",
        cometRole:
            "Full operator. Comet manages production, client relationships, fulfillment, and AI-integrated operations end-to-end.",
        image: "/portfolio/dtlaprint.png",
        screenshot: "/portfolio/dtlaprint.png",
        url: "https://dtlaprint.com",
    },
    {
        slug: "kases",
        name: "KASES",
        tagline: "Elevated Faith Apparel",
        industry: "Faith-Based Apparel",
        mission: "Make faith wearable — modern, elevated, and confident. Not preachy. Not cringe.",
        services: ["Apparel Design", "DTC E-Commerce", "Community Building", "Email Flows", "Drop Collections"],
        whatItDoes:
            "Designs and sells modern, elevated Christian apparel for young adults — clean, tasteful faith wear that doesn't feel preachy.",
        problemItSolves:
            "Young Christians want faith-based apparel that feels modern and confident, not generic or cringe.",
        cometRole:
            "Brand builder and operator. Comet manages creative direction, community growth, and DTC operations.",
        image: "/portfolio/kases.png",
        screenshot: "/portfolio/kases.png",
        url: "https://kases.com",
    },
    {
        slug: "merch-karma",
        name: "Merch Karma",
        tagline: "Gamified Sweepstakes Commerce",
        industry: "Sweepstakes + Commerce",
        mission: "A gamified commerce ecosystem that merges retail and sweepstakes — legally and sustainably.",
        services: ["Prize Drawings", "Multi-Entry Pathways", "Legal Compliance", "Social Engagement"],
        whatItDoes:
            "An e-commerce platform where purchases earn entries into prize drawings for gold, cash, crypto, and electronics.",
        problemItSolves:
            "Traditional e-commerce lacks excitement — Merch Karma merges retail with sweepstakes to drive engagement and repeat purchases.",
        cometRole:
            "Full-stack operator. Comet handles legal compliance, platform development, and customer acquisition strategy.",
        image: "/portfolio/merchkarma.png",
        screenshot: "/portfolio/merchkarma.png",
        url: "https://merchkarma.com",
    },
    {
        slug: "shop-titan",
        name: "Shop Titan",
        tagline: "Vertical SaaS for Decorators",
        industry: "Vertical SaaS",
        mission: "The ServiceTitan of the print and embroidery industry.",
        services: ["Quoting", "Order Management", "Production Scheduling", "Inventory", "Pricing Matrices", "Workflow Automation"],
        whatItDoes:
            "The most advanced operational platform built for print shops and decorators — quotes, orders, production scheduling, inventory, pricing matrices, and workflow automation.",
        problemItSolves:
            "Print shops and decorators run on disconnected tools and spreadsheets. Shop Titan replaces that chaos with one command center.",
        cometRole:
            "Internal product. Built on FileMaker, designed for licensing to hundreds of shops as a SaaS product.",
        image: "/portfolio/shoptitan.png",
        screenshot: "/portfolio/shoptitan.png",
        url: "https://shoptitan.app",
    },
    {
        slug: "mika-jaymes",
        name: "Mika Jaymes",
        tagline: "Premium Elevated Basics",
        industry: "Premium Basics Apparel",
        location: "Los Angeles, California",
        mission: "A luxury basics brand that feels intentional, mature, and inevitable.",
        services: ["Elevated Basics", "Refined Tailoring", "Premium Fabrics", "Minimal Branding", "DTC Experience"],
        whatItDoes:
            "A quiet luxury men's apparel brand focused on elevated basics — refined tailoring, high-quality fabrics, and minimal branding. Made in LA.",
        problemItSolves:
            "Men want premium basics that feel intentional and mature — not logo-heavy streetwear or overpriced designer labels.",
        cometRole:
            "Brand builder and operator. Comet manages creative direction, sourcing, and premium DTC operations.",
        image: "/portfolio/mikajaymes.png",
        screenshot: "/portfolio/mikajaymes.png",
        url: "https://mikajaymes.com",
    },
    {
        slug: "bluestar-cp",
        name: "BlueStar CP",
        tagline: "Multifamily Real Estate Investments",
        industry: "Multifamily Real Estate",
        location: "Los Angeles, California",
        mission: "Build a strong real asset foundation through disciplined multifamily investments.",
        services: ["Acquisitions", "Financial Analysis", "Rent Optimization", "Property Management"],
        whatItDoes:
            "Acquires and manages cash-flowing multifamily apartment buildings in Los Angeles — with a focus on financial analysis, rent optimization, and long-term asset building.",
        problemItSolves:
            "Multifamily real estate requires disciplined financial oversight — tracking charges, planning rent increases, and building long-term asset value.",
        cometRole:
            "Active investment. Comet manages acquisitions, financial oversight, and property operations.",
        image: "/portfolio/bluestarcp.png",
        screenshot: "/portfolio/bluestarcp.png",
        url: "https://bluestarcp.com",
    },
];

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

export interface OperatingPrinciple {
    number: string;
    title: string;
    description: string;
}

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

export interface AboutContent {
    story: string;
    mission: string;
    operatingModel: string;
    stats: { label: string; value: string }[];
}

export const aboutContent: AboutContent = {
    story: "We are an operator-led holding company that builds and operates focused businesses for the long term. We don't chase trends or buzzwords—we build what's real.",
    mission: "To create durable, valuable businesses that compound over time by combining operational excellence with clear strategic thinking.",
    operatingModel: "We acquire, build, and operate businesses end-to-end. Every company in our portfolio receives hands-on operational support, strategic direction, and the resources needed to scale sustainably.",
    stats: [
        { label: "Years Operating", value: "10+" },
        { label: "Portfolio Companies", value: "6" },
        { label: "Industries", value: "5" },
    ],
};

export interface TeamMember {
    name: string;
    role: string;
    fullRole: string;
}

export const teamMembers: TeamMember[] = [
    {
        name: "Michael Monfared",
        role: "CEO",
        fullRole: "Chief Executive Officer",
    },
    {
        name: "Diego Aldana",
        role: "CTO",
        fullRole: "Chief Technology Officer",
    },
    {
        name: "Trisha Nicole",
        role: "COO",
        fullRole: "Chief Operating Officer",
    },
];

export interface FounderContent {
    name: string;
    title: string;
    blurb: string;
    traits: { label: string; description: string }[];
}

export const founderContent: FounderContent = {
    name: "Michael Monfared",
    title: "CEO",
    blurb: "A vertically integrated entrepreneur building durable businesses across apparel, commerce, SaaS, and automation — with a builder's mentality and a long-term operator's discipline.",
    traits: [
        { label: "Systems Over Chaos", description: "Every business runs on repeatable, scalable systems — not heroics." },
        { label: "Automation-First", description: "If a process can be automated, it should be. Human time is for strategy." },
        { label: "Leverage Over Labor", description: "Build once, compound forever. Long-term leverage thinking drives every decision." },
        { label: "Structured Execution", description: "No vague advice, no surface-level answers. Every move is deliberate and documented." },
    ],
};

export interface Insight {
    title: string;
    date: string;
}

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
