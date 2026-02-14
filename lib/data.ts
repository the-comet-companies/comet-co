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
