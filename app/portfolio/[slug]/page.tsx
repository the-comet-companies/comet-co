import { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolioItems } from "@/lib/data";
import PortfolioClient from "../../../components/PortfolioClient";

// Server Component for Metadata and Data Fetching
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const item = portfolioItems.find((p) => p.slug === slug);

    if (!item) {
        return {
            title: "Project Not Found | The Comet Companies",
        };
    }

    return {
        title: `${item.name} | The Comet Companies`,
        description: item.tagline,
    };
}

export default async function PortfolioItemPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const item = portfolioItems.find((p) => p.slug === slug);

    if (!item) {
        notFound();
    }

    return <PortfolioClient item={item} />;
}
