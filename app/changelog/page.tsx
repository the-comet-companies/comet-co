"use client"
import {
    heroContent,
    aboutContent,
    philosophyContent,
    portfolioItems,
    contactContent,
    operatingPrinciples,
    teamMembers,
    insights,
} from "@/lib/data";
import { useEffect, useState } from "react";

const SECTIONS = [
    { id: "hero", label: "Hero Section" },
    { id: "portfolio", label: "Portfolio" },
    { id: "philosophy", label: "Philosophy" },
    { id: "principles", label: "Operating Principles" },
    { id: "about", label: "About Section" },
    { id: "leadership", label: "Leadership" },
    { id: "insights", label: "Insights" },
    { id: "contact", label: "Contact Section" },
];

export default function ChangelogPage() {
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200; // Offset for header

            for (const section of SECTIONS) {
                const element = document.getElementById(section.id);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(section.id);
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Header height + padding
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <main className="min-h-screen bg-white text-neutral-900 p-8 pt-32 font-sans">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_250px] gap-12">
                {/* Main Content */}
                <div className="max-w-4xl">
                    <h1 className="text-4xl font-bold mb-4">Content Inventory</h1>
                    <p className="text-neutral-500 mb-12 border-b border-neutral-200 pb-8">
                        This page displays all textual content currently used on the website.
                        Use this as a reference when requesting text changes.
                    </p>

                    <Section title="Hero Section" id="hero">
                        <ContentItem label="Headline" value={heroContent.headline.join(" ")} />
                        <ContentItem label="Rotating Words" value={heroContent.rotatingWords.join(", ")} />
                        <ContentItem label="Subtext" value={heroContent.subtext} />
                    </Section>

                    <Section title="Portfolio" id="portfolio">
                        {portfolioItems.map((item) => (
                            <div key={item.slug} className="mb-8 border-b border-neutral-100 pb-6 last:border-0">
                                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                                <ContentItem label="Tagline" value={item.tagline} />
                                <ContentItem label="What It Does" value={item.whatItDoes} />
                                <ContentItem label="Problem It Solves" value={item.problemItSolves} />
                                <ContentItem label="Comet Role" value={item.cometRole} />
                                <ContentItem label="URL" value={item.url} />
                            </div>
                        ))}
                    </Section>

                    <Section title="Philosophy Section" id="philosophy">
                        {philosophyContent.map((item, i) => (
                            <div key={i} className="mb-6 p-4 bg-neutral-50 rounded-lg">
                                <ContentItem label={`Statement ${i + 1}`} value={item.statement} />
                                <ContentItem label="Rotating Words" value={item.rotatingWords.join(", ")} />
                                <ContentItem label="Outcome" value={item.outcome} />
                                <ContentItem label="Description" value={item.description} />
                                <ContentItem label="Color" value={item.color} />
                            </div>
                        ))}
                    </Section>

                    <Section title="Operating Principles" id="principles">
                        {operatingPrinciples.map((p) => (
                            <div key={p.number} className="mb-4">
                                <span className="font-mono text-neutral-400 mr-2">{p.number}</span>
                                <span className="font-bold">{p.title}:</span>{" "}
                                <span className="text-neutral-600">{p.description}</span>
                            </div>
                        ))}
                    </Section>

                    <Section title="About Section" id="about">
                        <ContentItem label="Mission" value={aboutContent.mission} />
                        <ContentItem label="Story" value={aboutContent.story} />
                        <ContentItem label="Operating Model" value={aboutContent.operatingModel} />
                        <div className="mt-4">
                            <h4 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-2">Stats</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {aboutContent.stats.map((stat) => (
                                    <div key={stat.label} className="bg-neutral-50 p-3 rounded">
                                        <span className="block font-bold">{stat.value}</span>
                                        <span className="text-xs text-neutral-500 uppercase">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Section>

                    <Section title="Leadership" id="leadership">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {teamMembers.map((member) => (
                                <div key={member.name} className="bg-neutral-50 p-4 rounded-lg">
                                    <div className="font-bold">{member.name}</div>
                                    <div className="text-sm text-neutral-500">{member.role}</div>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section title="Insights" id="insights">
                        {insights.map((insight, i) => (
                            <div key={i} className="mb-2">
                                <span className="font-bold">{insight.title}</span>{" "}
                                <span className="text-neutral-400 text-sm">({insight.date})</span>
                            </div>
                        ))}
                    </Section>

                    <Section title="Contact Section" id="contact">
                        <ContentItem label="Heading" value={contactContent.heading} />
                        <ContentItem label="Description" value={contactContent.description} />
                        <ContentItem label="Email Title" value={contactContent.emailDescription} />
                        <ContentItem label="Email" value={contactContent.email} />
                        <ContentItem label="Note" value={contactContent.note} />
                    </Section>
                </div>

                {/* Sidebar Navigation */}
                <aside className="hidden lg:block sticky top-32 h-fit">
                    <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-4">
                        Contents
                    </h2>
                    <nav className="flex flex-col gap-2 border-l border-neutral-200 pl-4">
                        {SECTIONS.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => scrollToSection(section.id)}
                                className={`cursor-pointer text-left text-sm transition-colors duration-200 relative -ml-[17px] pl-4 border-l-2 ${activeSection === section.id
                                    ? "border-neutral-900 text-neutral-900 font-medium"
                                    : "border-transparent text-neutral-500 hover:text-neutral-700"
                                    }`}
                            >
                                {section.label}
                            </button>
                        ))}
                    </nav>
                </aside>
            </div>
        </main>
    );
}

function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
    return (
        <section id={id} className="mb-16">
            <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-neutral-800">{title}</h2>
            {children}
        </section>
    );
}

function ContentItem({ label, value }: { label: string; value: string }) {
    const isColor = label.toLowerCase() === "color";
    return (
        <div className="mb-4">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">{label}</h4>
            {isColor ? (
                <div className="flex items-center gap-3">
                    <div
                        className="w-6 h-6 rounded-full border border-neutral-200"
                        style={{ backgroundColor: value }}
                    />
                    <p className="text-neutral-800 whitespace-pre-wrap">{value}</p>
                </div>
            ) : (
                <p className="text-neutral-800 whitespace-pre-wrap">{value}</p>
            )}
        </div>
    );
}
