export interface PortfolioItem {
    slug: string;
    name: string;
    tagline: string;
    whatItDoes: string;
    problemItSolves: string;
    cometRole: string;
    image: string;
}

export const portfolioItems: PortfolioItem[] = [
    {
        slug: "comet-logistics",
        name: "Comet Logistics",
        tagline: "Last-mile delivery infrastructure",
        whatItDoes:
            "Operates a network of regional last-mile delivery hubs for mid-market e-commerce.",
        problemItSolves:
            "Mid-market sellers lack reliable, cost-effective last-mile logistics outside major metros.",
        cometRole:
            "Built from scratch. Comet owns and operates the full logistics stack.",
        image: "/placeholder.svg",
    },
    {
        slug: "comet-capital",
        name: "Comet Capital",
        tagline: "Permanent capital allocation",
        whatItDoes:
            "Deploys patient capital into operating businesses with durable cash flows.",
        problemItSolves:
            "Most capital sources impose short time horizons on long-duration businesses.",
        cometRole:
            "Sole capital allocator. Comet manages the fund and portfolio directly.",
        image: "/placeholder.svg",
    },
    {
        slug: "comet-industrial",
        name: "Comet Industrial",
        tagline: "Niche industrial services",
        whatItDoes:
            "Acquires and consolidates fragmented industrial service providers.",
        problemItSolves:
            "Fragmented markets produce inconsistent service quality and limited scale.",
        cometRole: "Acquirer and operator. Comet integrates and manages each platform.",
        image: "/placeholder.svg",
    },
    {
        slug: "comet-digital",
        name: "Comet Digital",
        tagline: "Internal tooling and infrastructure",
        whatItDoes: "Builds software tools used across Comet portfolio companies.",
        problemItSolves:
            "Portfolio companies share common operational needs that off-the-shelf tools don't solve well.",
        cometRole:
            "Internal product team. Comet builds and maintains all tools in-house.",
        image: "/placeholder.svg",
    },
];
