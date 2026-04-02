"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, ArrowUpRight, ExternalLink, ChevronRight, Search, Mail } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { useState } from "react";
import { motion } from "framer-motion";

const PixelBlast = dynamic(() => import("@/components/pixel-blast"), { ssr: false });

/* ─── Data ─── */

const researchAreas = [
    {
        title: "Optimizing Model Training",
        description:
            "Optimizing Model Training in Decentralized AI Systems with Scalable Frameworks and Algorithms for Efficient and Collaborative Global Learning.",
        link: "#optimization",
    },
    {
        title: "Model Alignment",
        description:
            "Addressing ethical risks in LLMs including bias and harmful content generation through enhanced learning algorithms, self-regulation, and decentralized debating.",
        link: "#alignment",
    },
    {
        title: "Multi-Agent Technology",
        description:
            "Exploring blockchain applications including smart contract management, anomaly detection systems, and decentralized coordination protocols.",
        link: "#multi-agent",
    },
    {
        title: "Decentralized Infrastructure",
        description:
            "Building the foundational infrastructure for Healthcare AI & Robotics with decentralized storage, AI compute networks, and research collaboration.",
        link: "#infrastructure",
    },
];

const featuredArticles = [
    {
        image: "/689532a44347fbbe2dd10ac5_Tech Breakthrough_100B Paremeter model.avif",
        date: "Aug 2025",
        category: "Research Milestone",
        title: "World's First Distributed 100B-Parameter AI",
        description:
            "A groundbreaking achievement in distributed AI training, demonstrating the feasibility of training massive models across decentralized infrastructure.",
        link: "#",
    },
    {
        image: "/68b51ba864a8844c966548a2_image 278.avif",
        date: "Sep 2025",
        category: "Partnership",
        title: "0G Partners with NTU Singapore",
        description:
            "Nanyang Technological University joins forces with 0G to advance research in decentralized AI systems and federated learning.",
        link: "#",
    },
    {
        image: "/68af9015e08318c6f04fb780_3.avif",
        date: "Jul 2025",
        category: "Research",
        title: "Communication Optimization in Federated Learning",
        description:
            "Addressing communication overhead through gradient compression and quantization techniques for efficient edge-to-cloud coordination.",
        link: "#",
    },
    {
        image: "/68b51b8f0e4aed768973fc8e_ChatGPT Image Sep 1, 2025, 09_33_11 AM.avif",
        date: "Sep 2025",
        category: "Research",
        title: "Decentralized Debating for Model Alignment",
        description:
            "A novel approach to AI alignment using decentralized debating mechanisms to ensure ethical behavior in distributed LLM systems.",
        link: "#",
    },
];

const publications = [
    {
        date: "2025",
        venue: "FSE 2025",
        title: "dl²: Detecting Communication Deadlocks in Deep Learning Jobs",
        image: "/papers/venue-1.png",
        link: "#",
    },
    {
        date: "2025",
        venue: "FSE 2025",
        title: "Reduction Fusion for Optimized Distributed Data-Parallel Computations via Inverse Recomputation",
        image: "/papers/venue-2.png",
        link: "#",
    },
    {
        date: "2025",
        venue: "ArXiv 2025",
        title: "DiLoCoX: A Low-Communication Large-Scale Training Framework for Decentralized Cluster",
        image: "/papers/venue-3.png",
        link: "#",
    },
    {
        date: "2025",
        venue: "ICCV 2025",
        title: "Mind the Cost of Scaffold: Benign Clients May Even Become Malicious",
        image: "/papers/venue-4.png",
        link: "#",
    },
    {
        date: "2025",
        venue: "ACM 2025",
        title: "Efficient Federated Learning with Adaptive Communication",
        image: "/papers/venue-5.png",
        link: "#",
    },
];

const partners = [
    { name: "Google Cloud", logo: "/google-cloud.png" },
    { name: "Stanford", logo: "/stanford.png" },
    { name: "IC3", logo: "/ic3.png" },
    { name: "NTU Singapore", logo: "/ntu.svg" },
    { name: "ETH Zürich", logo: "/eth-zurich.png" },
    { name: "Peking University", logo: "/pku.png" },
    { name: "NUS", logo: "/nus.png" },
];

const optimizationAreas = [
    {
        title: "Communication Optimization",
        description: "Addresses overhead through gradient compression and quantization",
    },
    {
        title: "Local Computation Optimization",
        description: "Reduces edge device loads via efficient pipelines and pruning",
    },
    {
        title: "Performance with Heterogeneous Data",
        description: "Adapts learning rates and implements smart round selection",
    },
    {
        title: "Performance with Dynamic Environment",
        description: "Uses asynchronous protocols for unpredictable node behavior",
    },
];

const navLinks = [
    { label: "Research", href: "#" },
    { label: "Learn", href: "#" },
    { label: "Build", href: "#" },
    { label: "Ecosystem", href: "#" },
    { label: "Docs", href: "#" },
];

const footerLinks = {
    develop: [
        { label: "Testnet", href: "#" },
        { label: "Faucet", href: "#" },
        { label: "Docs", href: "#" },
        { label: "Scanners", href: "#" },
        { label: "Explorer", href: "#" },
    ],
    learn: [
        { label: "Blog", href: "#" },
        { label: "AMAs", href: "#" },
        { label: "FAQs", href: "#" },
        { label: "Whitepaper", href: "#" },
    ],
    ecosystem: [
        { label: "Accelerator", href: "#" },
        { label: "Press", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Brand Kit", href: "#" },
        { label: "Growth Fund", href: "#" },
    ],
};

/* ─── Fade-in animation wrapper ─── */
const FadeIn = ({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
    >
        {children}
    </motion.div>
);

/* ─── Page ─── */

export const HomeScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPublications = publications.filter(
        (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.venue.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="min-h-dvh">
            {/* ── Navigation ── */}
            <nav className="sticky top-0 z-50 border-b border-secondary bg-primary/80 backdrop-blur-xl">
                <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 lg:px-8">
                    <a href="/" className="flex items-center gap-2">
                        <div className="flex size-8 items-center justify-center rounded-lg bg-[#0A0D12]">
                            <span className="text-sm font-bold text-white">0G</span>
                        </div>
                        <span className="text-lg font-medium text-primary">Research</span>
                    </a>

                    <div className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm text-tertiary transition-colors duration-200 hover:text-primary"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <Button size="sm" color="primary" href="#">
                        Apply for Partnership
                    </Button>
                </div>
            </nav>

            {/* ── Hero (Two-Column like Anthropic) ── */}
            <section className="relative z-10 border-b border-secondary bg-primary">
                <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                        <FadeIn>
                            <p className="text-secondary-mono text-xs text-tertiary">Welcome to</p>
                            <h1 className="mt-3 text-display-lg font-semibold text-primary lg:text-display-xl">
                                0G Research
                            </h1>
                            <p className="mt-6 max-w-lg text-lg leading-relaxed text-tertiary">
                                At 0G, we connect advanced AI with Web3, driving innovation in decentralized AI through
                                cutting-edge research and collaboration across blockchain ecosystems.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.15} className="flex flex-col justify-end">
                            <p className="text-secondary-mono text-xs text-tertiary">Research areas</p>
                            <div className="mt-4 flex flex-col gap-3">
                                {researchAreas.map((area) => (
                                    <a
                                        key={area.title}
                                        href={area.link}
                                        className="group flex items-center justify-between text-primary transition-colors duration-200 hover:text-brand-700"
                                    >
                                        <span className="text-md font-medium">{area.title}</span>
                                        <ArrowRight className="size-4 text-quaternary transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-700" />
                                    </a>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── Research Areas Grid (4-column like Anthropic link grid) ── */}
            <section className="relative z-10 border-b border-secondary bg-primary">
                <div className="mx-auto max-w-[1280px]">
                    <div className="grid divide-y divide-secondary md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4">
                        {researchAreas.map((area, i) => (
                            <FadeIn key={area.title} delay={i * 0.08} className="p-6 lg:p-8">
                                <h3 className="text-md font-semibold text-primary">{area.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-tertiary">{area.description}</p>
                                <a
                                    href={area.link}
                                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700 transition-colors duration-200 hover:text-brand-800"
                                >
                                    Learn more <ChevronRight className="size-3.5" />
                                </a>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── WHO WE ARE — Optimization Areas ── */}
            <section className="relative z-10 border-b border-secondary bg-secondary">
                <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
                    <FadeIn>
                        <p className="text-secondary-mono text-xs text-tertiary">Who we are</p>
                        <h2 className="mt-3 max-w-2xl text-display-sm font-semibold text-primary">
                            Optimizing Model Training in Decentralized AI Systems
                        </h2>
                        <p className="mt-4 max-w-2xl text-md leading-relaxed text-tertiary">
                            Scalable frameworks and algorithms for efficient and collaborative global learning.
                        </p>
                    </FadeIn>

                    <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {optimizationAreas.map((area, i) => (
                            <FadeIn key={area.title} delay={i * 0.08}>
                                <div className="rounded-xl border border-primary bg-primary p-6 transition-shadow duration-300 hover:shadow-lg">
                                    <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50">
                                        <span className="text-lg font-bold text-brand-700">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                    </div>
                                    <h3 className="mt-4 text-md font-semibold text-primary">{area.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-tertiary">{area.description}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Featured Articles (Large hero + cards like Anthropic) ── */}
            <section className="relative z-10 border-b border-secondary bg-primary">
                <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
                    <FadeIn>
                        <p className="text-secondary-mono text-xs text-tertiary">Latest</p>
                        <h2 className="mt-3 text-display-sm font-semibold text-primary">
                            Technical Breakthroughs from the 0G Research Lab
                        </h2>
                    </FadeIn>

                    <div className="mt-14 grid gap-8 lg:grid-cols-2">
                        {/* Large featured card */}
                        <FadeIn className="group">
                            <a href={featuredArticles[0].link} className="block">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-secondary">
                                    <Image
                                        src={featuredArticles[0].image}
                                        alt={featuredArticles[0].title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="mt-5">
                                    <div className="flex items-center gap-3">
                                        <span className="text-secondary-mono text-xs text-tertiary">
                                            {featuredArticles[0].date}
                                        </span>
                                        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                                            {featuredArticles[0].category}
                                        </span>
                                    </div>
                                    <h3 className="mt-2 text-display-xs font-semibold text-primary transition-colors duration-200 group-hover:text-brand-700">
                                        {featuredArticles[0].title}
                                    </h3>
                                    <p className="mt-2 text-md leading-relaxed text-tertiary">
                                        {featuredArticles[0].description}
                                    </p>
                                </div>
                            </a>
                        </FadeIn>

                        {/* Stacked cards */}
                        <div className="flex flex-col gap-8">
                            {featuredArticles.slice(1).map((article, i) => (
                                <FadeIn key={article.title} delay={i * 0.1}>
                                    <a
                                        href={article.link}
                                        className="group flex gap-5 border-b border-secondary pb-8 last:border-0 last:pb-0"
                                    >
                                        <div className="relative aspect-[4/3] w-40 shrink-0 overflow-hidden rounded-xl bg-secondary">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <div className="flex items-center gap-3">
                                                <span className="text-secondary-mono text-xs text-tertiary">
                                                    {article.date}
                                                </span>
                                                <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                                                    {article.category}
                                                </span>
                                            </div>
                                            <h3 className="mt-1.5 text-md font-semibold text-primary transition-colors duration-200 group-hover:text-brand-700">
                                                {article.title}
                                            </h3>
                                            <p className="mt-1 text-sm text-tertiary line-clamp-2">
                                                {article.description}
                                            </p>
                                        </div>
                                    </a>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Papers Section (Custom Figma Design with SoftAurora BG) ── */}
            <section className="relative z-10 overflow-hidden">
                {/* PixelBlast Background */}
                <div className="absolute inset-0 z-0 bg-black">
                    <PixelBlast
                        variant="circle"
                        patternScale={4.75}
                        pixelSizeJitter={0.8}
                        speed={1.75}
                        edgeFade={0.25}
                        color="#806fb8"
                        patternDensity={0.75}
                        liquid={false}
                        enableRipples={false}
                        pixelSize={3}
                    />
                </div>

                <div className="relative z-10 px-6 py-[168px] lg:px-8">
                    {/* Section heading */}
                    <FadeIn className="mx-auto max-w-[1152px] text-center">
                        <h2 className="px-12 text-display-md font-[300] tracking-[-2.04px] text-[#fefefe] lg:text-[68px] lg:leading-[1.1]">
                            Technical Breakthroughs<br />from the 0G Research Lab
                        </h2>
                    </FadeIn>

                    {/* Paper cards — 3 per row, bottom row left-aligned */}
                    <div className="mx-auto mt-[72px] flex max-w-[1044px] flex-wrap gap-[48px] px-6 lg:px-0">
                        {publications.map((pub, i) => (
                            <FadeIn key={pub.title} delay={i * 0.1}>
                                <a
                                    href={pub.link}
                                    className="group relative inline-grid h-[469px] w-[300px] transition-transform duration-300 hover:scale-[1.03]"
                                    style={{ gridTemplateColumns: "max-content", gridTemplateRows: "max-content" }}
                                >
                                    {/* Card backdrop blur + shape — isolated so blur doesn't affect content */}
                                    <div
                                        className="col-start-1 row-start-1 z-0 h-[469px] w-[300px]"
                                        style={{
                                            clipPath: "path('M 211 62.48 C 211 77.94 223.54 90.48 239 90.48 L 268 90.48 C 285.67 90.48 300 104.8 300 122.48 L 300 437 C 300 454.67 285.67 469 268 469 L 32 469 C 14.33 469 0 454.67 0 437 L 0 32 C 0 14.33 14.33 0 32 0 L 179 0 C 196.68 0 211 14.33 211 32 Z')",
                                            backdropFilter: "blur(12px)",
                                            WebkitBackdropFilter: "blur(12px)",
                                        }}
                                    >
                                        <div
                                            className="h-full w-full"
                                            style={{
                                                backgroundImage: "url(/papers/card-shape.svg)",
                                                backgroundSize: "100% 100%",
                                            }}
                                        />
                                    </div>

                                    {/* Arrow button (top-right notch) */}
                                    <div className="col-start-1 row-start-1 z-10 ml-[228px] mt-[0.48px] flex h-[74px] w-[72px] items-center justify-center rounded-[28px] bg-[#f3e6fe]/20 backdrop-blur-md transition-colors duration-300 group-hover:bg-[#f3e6fe]/35">
                                        <ArrowUpRight className="size-6 text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                    </div>

                                    {/* Venue logo/thumbnail — 146x100, 32px from top and left */}
                                    <div className="col-start-1 row-start-1 z-10 ml-[32px] mt-[32px] h-[100px] w-[146px] overflow-hidden rounded-[24px]">
                                        <Image
                                            src={pub.image}
                                            alt={pub.venue}
                                            fill
                                            className="!relative !h-full !w-full object-cover"
                                        />
                                    </div>

                                    {/* Title + Venue tag — 32px below thumbnail (32+100+32=164) */}
                                    <div className="col-start-1 row-start-1 z-10 ml-[34px] mt-[164px] w-[247px]">
                                        <h3 className="text-[24px] font-[300] leading-[1.4] tracking-[-0.72px] text-[#fefefe]">
                                            {pub.title}
                                        </h3>
                                        <p className="mt-[12px] font-mono text-sm font-medium uppercase text-white/40">
                                            {pub.venue}
                                        </p>
                                    </div>

                                    {/* Download button — always at bottom, 32px from edges */}
                                    <div className="col-start-1 row-start-1 z-10 ml-[32px] mt-[393px]">
                                        <Button
                                            size="md"
                                            color="primary"
                                            iconLeading={
                                                <svg data-icon width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                                    <polyline points="7 10 12 15 17 10" />
                                                    <line x1="12" y1="15" x2="12" y2="3" />
                                                </svg>
                                            }
                                            className="w-fit rounded-[16px]!"
                                        >
                                            Download
                                        </Button>
                                    </div>
                                </a>
                            </FadeIn>
                        ))}
                    </div>

                    {/* CTA below papers */}
                    <FadeIn delay={0.3} className="mt-[72px] flex flex-col items-center gap-6 text-center">
                        <div className="flex flex-col gap-2">
                            <h3 className="text-[32px] font-[300] tracking-[-0.96px] text-white leading-[1.1]">
                                Have an innovative idea you&apos;d like us to consider?
                            </h3>
                            <p className="text-md text-white/80">
                                We&apos;re open to fresh perspectives — share your concept or proposal with us.
                            </p>
                        </div>
                        <Button
                            size="lg"
                            color="secondary"
                            href="#"
                            className="rounded-[16px]! border-none! bg-[#fefefe]! px-5! py-4! text-md! font-medium! text-[#0A0D12]! hover:bg-white/90!"
                        >
                            Apply for Research Partnership
                        </Button>
                    </FadeIn>
                </div>
            </section>

            {/* ── BACKUP: Publications Table (original Anthropic-style list) ── */}
            {/* To restore, uncomment this section and comment out the Papers section above */}
            {/* <section className="border-b border-secondary">
                <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
                    <FadeIn>
                        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="text-secondary-mono text-xs text-tertiary">Publications</p>
                                <h2 className="mt-3 text-display-xs font-semibold text-primary">Research Papers</h2>
                            </div>
                            <div className="relative w-full max-w-xs">
                                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-quaternary" />
                                <input type="text" placeholder="Search publications..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-xl border border-secondary bg-primary py-2.5 pl-9 pr-4 text-sm text-primary placeholder:text-quaternary focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100" />
                            </div>
                        </div>
                    </FadeIn>
                    <div className="mt-10">
                        {filteredPublications.map((pub, i) => (
                            <FadeIn key={pub.title} delay={i * 0.05}>
                                <a href={pub.link} className="group flex items-center justify-between border-b border-secondary py-5 transition-colors duration-200 hover:bg-secondary/50 first:border-t">
                                    <div className="flex items-center gap-6">
                                        <span className="text-secondary-mono w-10 shrink-0 text-xs text-quaternary">{pub.date}</span>
                                        <span className="rounded-full border border-secondary bg-secondary px-3 py-0.5 text-xs font-medium text-secondary">{pub.venue}</span>
                                        <span className="text-md font-medium text-primary transition-colors duration-200 group-hover:text-brand-700">{pub.title}</span>
                                    </div>
                                    <ArrowUpRight className="size-4 shrink-0 text-quaternary transition-all duration-200 group-hover:text-brand-700" />
                                </a>
                            </FadeIn>
                        ))}
                    </div>
                    {filteredPublications.length === 0 && (<p className="py-12 text-center text-sm text-tertiary">No publications match your search.</p>)}
                </div>
            </section> */}

            {/* ── Research Partners ── */}
            <section className="relative z-10 border-b border-secondary bg-secondary">
                <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
                    <FadeIn className="text-center">
                        <p className="text-secondary-mono text-xs text-tertiary">Collaborations</p>
                        <h2 className="mt-3 text-display-xs font-semibold text-primary">Research Partners</h2>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="mt-14 flex flex-wrap items-center justify-center gap-10 lg:gap-16">
                            {partners.map((partner) => (
                                <div
                                    key={partner.name}
                                    className="relative h-10 w-28 grayscale transition-all duration-300 hover:grayscale-0"
                                >
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── Build on 0G — CTA Section ── */}
            <section className="relative z-10 border-b border-secondary bg-primary">
                <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
                    <FadeIn>
                        <div className="relative overflow-hidden rounded-3xl bg-[#0A0D12] p-10 lg:p-16">
                            {/* Subtle purple gradient glow */}
                            <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-brand-700/20 blur-3xl" />
                            <div className="pointer-events-none absolute -bottom-20 -left-20 size-60 rounded-full bg-brand-700/10 blur-3xl" />

                            <div className="relative grid gap-12 lg:grid-cols-2">
                                <div>
                                    <p className="font-mono text-xs uppercase tracking-widest text-brand-400">
                                        Build on 0G
                                    </p>
                                    <h2 className="mt-4 text-display-sm font-semibold text-white">
                                        Infrastructure for Healthcare AI & Robotics
                                    </h2>
                                    <p className="mt-4 max-w-md text-md leading-relaxed text-neutral-400">
                                        From decentralized data storage to GPU compute networks and research funding —
                                        everything you need to build the future of AI.
                                    </p>
                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <Button size="lg" color="primary" href="#" iconTrailing={ArrowRight}>
                                            Apply for Research Partnership
                                        </Button>
                                        <Button
                                            size="lg"
                                            color="secondary"
                                            href="#"
                                        >
                                            Read the Whitepaper
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
                                    {[
                                        {
                                            title: "Decentralized Data Storage",
                                            desc: "0G Storage with encryption and compliance features",
                                        },
                                        {
                                            title: "AI Compute Network",
                                            desc: "GPU access with TEE verification",
                                        },
                                        {
                                            title: "Research Collaboration & Funding",
                                            desc: "Direct team access and investment support",
                                        },
                                    ].map((item) => (
                                        <div
                                            key={item.title}
                                            className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
                                        >
                                            <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                                            <p className="mt-1 text-sm text-neutral-400">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="relative z-10 bg-primary">
                <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-8">
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
                        {/* Brand + Newsletter */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-2">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-[#0A0D12]">
                                    <span className="text-sm font-bold text-white">0G</span>
                                </div>
                                <span className="text-md font-medium text-primary">
                                    Zero <span className="text-quaternary">(Gravity)</span>
                                </span>
                            </div>
                            <p className="mt-4 max-w-xs text-sm leading-relaxed text-tertiary">
                                Connecting advanced AI with Web3 through cutting-edge research.
                            </p>

                            <div className="mt-6">
                                <p className="text-secondary-mono text-xs text-tertiary">Newsletter</p>
                                <div className="mt-2 flex gap-2">
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-quaternary" />
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            className="w-full rounded-xl border border-secondary bg-primary py-2.5 pl-9 pr-4 text-sm text-primary placeholder:text-quaternary focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-100"
                                        />
                                    </div>
                                    <Button size="md" color="primary">
                                        Subscribe
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Footer link columns */}
                        {Object.entries(footerLinks).map(([category, links]) => (
                            <div key={category}>
                                <h4 className="text-secondary-mono text-xs text-tertiary">{category}</h4>
                                <ul className="mt-4 flex flex-col gap-3">
                                    {links.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                className="text-sm text-tertiary transition-colors duration-200 hover:text-primary"
                                            >
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-secondary pt-8 md:flex-row">
                        <p className="text-sm text-quaternary">&copy; 2026 0G. All rights reserved.</p>
                        <div className="flex items-center gap-5">
                            {["Discord", "LinkedIn", "X"].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="text-sm text-quaternary transition-colors duration-200 hover:text-primary"
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
