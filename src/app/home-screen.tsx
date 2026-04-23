"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, ArrowUpRight, ExternalLink, ChevronRight, Search, Mail } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const PixelBlast = dynamic(() => import("@/components/pixel-blast"), { ssr: false });
const LightRays = dynamic(() => import("@/components/light-rays"), { ssr: false });
import GradualBlur from "@/components/gradual-blur";
import BorderGlow from "@/components/border-glow";
import DecryptedText from "@/components/decrypted-text";

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
        title: "ØG Partners with NTU Singapore",
        description:
            "Nanyang Technological University joins forces with ØG to advance research in decentralized AI systems and federated learning.",
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
        description:
            "Decentralized learning requires frequent sharing of intermediate results, which becomes costly with large models and data. To reduce communication overhead, we will explore advanced techniques like lossless gradient compression and quantization.",
        icon: "/icon-comm.svg",
    },
    {
        title: "Local Computation Optimization",
        description:
            "Training at scale imposes heavy computation loads, especially on edge devices. We aim to ease this by integrating efficient training pipelines, parallelization methods, and model pruning to enable faster and lighter training.",
        icon: "/icon-local.svg",
    },
    {
        title: "Performance Optimization with Heterogeneous Data",
        description:
            "Variations in local data can cause model drift and reduce accuracy. We plan to develop algorithms that adapt learning rates per neuron and use smart round selection to improve training and aggregation under heterogeneous data conditions.",
        icon: "/icon-perf.svg",
    },
    {
        title: "Performance Optimization with Dynamic Environment",
        description:
            "In real-world decentralized systems, nodes join and leave unpredictably. We will design asynchronous protocols and schedulers to predict node behavior and prioritize high-quality updates, ensuring stable and accurate model training.",
        icon: "/icon-perf.svg",
    },
];

const navLinks = [
    { label: "Research", href: "/research" },
    { label: "Learn", href: "#" },
    { label: "Build", href: "#" },
    { label: "Ecosystem", href: "#" },
];

const footerLinks = {
    develop: [
        { label: "Testnet", href: "https://docs.0g.ai/developer-hub/testnet/testnet-overview" },
        { label: "Faucet", href: "https://faucet.0g.ai/" },
        { label: "Docs", href: "https://docs.0g.ai/" },
        { label: "Storage Scan", href: "https://storagescan.0g.ai/" },
        { label: "Chain Scan", href: "https://chainscan.0g.ai/" },
        { label: "Explorer", href: "https://explorer.0g.ai/" },
    ],
    learn: [
        { label: "Blog", href: "/blog" },
        { label: "AMAs", href: "/ama" },
        { label: "FAQs", href: "/faq" },
        { label: "Whitepaper", href: "https://cdn.jsdelivr.net/gh/0glabs/0g-doc/static/whitepaper.pdf" },
        { label: "Node Disclaimer", href: "/disclaimer" },
    ],
    ecosystem: [
        { label: "Accelerator", href: "/accelerator" },
        { label: "Press", href: "/press" },
        { label: "Contact Us", href: "/contact" },
        { label: "Brand Kit", href: "/brandkit" },
        { label: "Ecosystem Growth Fund", href: "https://0gfoundation.ai/" },
    ],
};

const socialLinks = [
    {
        label: "Discord",
        href: "https://discord.gg/0glabs",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/0g-labs/",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: "X",
        href: "https://x.com/0aboratory",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
];

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

/* ─── Card icons 48x48 stroke-2 ─── */
const cardIcons = [
    <svg key="0" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#b75fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="7.05" cy="7.05" r="1"/><circle cx="16.95" cy="16.95" r="1"/><circle cx="7.05" cy="16.95" r="1"/><circle cx="16.95" cy="7.05" r="1"/></svg>,
    <svg key="1" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#b75fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
    <svg key="2" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#b75fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>,
    <svg key="3" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#b75fff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
];

/* ─── WHO WE ARE with scroll-hijack horizontal cards ─── */
const ScrollCardsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [translateX, setTranslateX] = useState(0);
    const [dimensions, setDimensions] = useState({ vw: 1280, vh: 800 });

    useEffect(() => {
        const update = () => setDimensions({ vw: window.innerWidth, vh: window.innerHeight });
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const cardWidth = 406;
    const gap = 32;
    const totalTrackWidth = optimizationAreas.length * cardWidth + (optimizationAreas.length - 1) * gap;
    const leftPad = Math.max(24, (dimensions.vw - 1280) / 2 + 32);
    const rightPad = leftPad; // end with same padding as start
    const maxTranslate = Math.max(totalTrackWidth + leftPad + rightPad - dimensions.vw, 0);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        let currentX = 0;
        let targetX = 0;
        let rafId: number;

        const handleScroll = () => {
            const rect = section.getBoundingClientRect();
            const scrollableHeight = section.offsetHeight - dimensions.vh;
            if (scrollableHeight <= 0) return;
            const progress = Math.min(Math.max(-rect.top / scrollableHeight, 0), 1);
            targetX = progress * maxTranslate;
        };

        // Smooth lerp animation
        const animate = () => {
            currentX += (targetX - currentX) * 0.08;
            if (Math.abs(currentX - targetX) < 0.5) currentX = targetX;
            setTranslateX(currentX);
            rafId = requestAnimationFrame(animate);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        rafId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(rafId);
        };
    }, [dimensions, maxTranslate]);

    return (
        <section
            id="who-we-are"
            ref={sectionRef}
            className="relative z-10 border-b border-secondary bg-primary"
            style={{ height: `${maxTranslate + dimensions.vh}px` }}
        >
            <div className="sticky top-0 flex h-screen flex-col justify-center overflow-clip">
                {/* Badge + Heading */}
                <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(183,95,255,0.15)] px-4 py-1.5">
                        <span className="size-2 rounded-full bg-[#b75fff]" />
                        <span className="font-mono text-sm font-medium text-[#b75fff]">
                            WHO WE ARE
                        </span>
                    </div>
                    <h2 className="mt-6 max-w-[1152px] text-[48px] font-[300] leading-[1.1] tracking-[-1.44px] text-[#141413]">
                        Optimizing Model Training in{" "}
                        <span className="text-[#b75fff]">Decentralized AI Systems</span> with
                        Scalable Frameworks and Algorithms for Efficient and Collaborative{" "}
                        <span className="text-[#b75fff]">Global Learning</span>.
                    </h2>
                </div>

                {/* Cards — 48px gap from heading, left-aligned to heading */}
                <div
                    className="mt-12 flex gap-[32px]"
                    style={{
                        paddingLeft: `max(1.5rem, calc((100vw - 1280px) / 2 + 32px))`,
                        paddingRight: "1.5rem",
                        transform: `translateX(-${translateX}px)`,
                        willChange: "transform",
                    }}
                >
                    {optimizationAreas.map((area, i) => (
                        <div
                            key={area.title}
                            className="flex w-[406px] shrink-0 flex-col gap-[17px] rounded-[32px] bg-[#faf4fe] p-[40px]"
                        >
                            {cardIcons[i]}
                            <h3 className="text-[32px] font-[300] leading-[1.4] tracking-[-0.96px] text-[#141413]">
                                {area.title}
                            </h3>
                            <p className="text-[18px] font-[300] leading-[1.4] text-[#333]">
                                {area.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export const HomeScreen = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [navOnDark, setNavOnDark] = useState(false);

    useEffect(() => {
        const darkSections = document.querySelectorAll("[data-nav-dark]");
        if (!darkSections.length) return;

        const handleScroll = () => {
            const navY = 40; // approx vertical center of nav
            let onDark = false;
            darkSections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= navY && rect.bottom >= navY) {
                    onDark = true;
                }
            });
            setNavOnDark(onDark);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const filteredPublications = publications.filter(
        (p) =>
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.venue.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="min-h-dvh">
            {/* Gradual blur at top of page */}
            <GradualBlur position="top" strength={4} target="page" zIndex={0} divCount={10} />

            {/* ── Navigation — Floating glass pill, adaptive colors ── */}
            <nav className="fixed left-0 right-0 top-0 z-[200] flex items-center px-6 pt-4 transition-colors duration-300 lg:px-8">
                {/* Left spacer to balance the right CTA */}
                <div className="hidden w-[200px] lg:block" />

                {/* Nav pill — centered */}
                <div
                    className="mx-auto flex items-center gap-[60px] overflow-clip rounded-[20px] border py-3 pl-5 pr-3 transition-all duration-300"
                    style={{
                        background: navOnDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0)",
                        backdropFilter: "blur(25px)",
                        WebkitBackdropFilter: "blur(25px)",
                        borderColor: navOnDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                    }}
                >
                    {/* 0G Logo — always black on light, white on dark */}
                    <a href="/" className="shrink-0">
                        <Image
                            src="/0g-logo-nav.svg"
                            alt="0G"
                            width={64}
                            height={31}
                            className={`transition-all duration-300 ${navOnDark ? "" : "brightness-0"}`}
                        />
                    </a>

                    {/* Nav links */}
                    <div className="hidden items-center gap-6 md:flex">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className={`text-md capitalize transition-colors duration-300 hover:opacity-80 ${navOnDark ? "text-white" : "text-[#0A0D12]"}`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Docs button */}
                    <a
                        href="https://docs.0g.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center rounded-[16px] px-[18px] py-[14px] text-md font-bold capitalize transition-all duration-300 hover:bg-[#9200E1] hover:text-white ${navOnDark ? "bg-white text-black" : "bg-[#0A0D12] text-white"}`}
                    >
                        Docs
                    </a>
                </div>

                {/* Right side: Bell + Apply CTA */}
                <div className="hidden items-center gap-3 lg:flex">
                    {/* Bell icon — same glass style as nav pill */}
                    <button
                        className={`flex size-[48px] items-center justify-center rounded-[16px] border transition-all duration-300 hover:opacity-80 ${navOnDark ? "border-white/10 text-white" : "border-[rgba(0,0,0,0.08)] text-[#0A0D12]"}`}
                        style={{
                            background: navOnDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0)",
                            backdropFilter: "blur(25px)",
                            WebkitBackdropFilter: "blur(25px)",
                        }}
                        aria-label="Notifications"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                        </svg>
                    </button>

                    {/* Apply CTA — same height as Docs */}
                    <a
                        href="/apply"
                        className={`rounded-[16px] px-[18px] py-[14px] text-md font-medium transition-all duration-300 hover:bg-[#9200E1] hover:text-white ${navOnDark ? "bg-white text-[#0A0D12]" : "bg-[#0A0D12] text-white"}`}
                    >
                        Apply for Partnership
                    </a>
                </div>
            </nav>

            {/* ── Hero (Two-Column like Anthropic) ── */}
            <section className="relative z-10 border-b border-secondary bg-primary">
                <div className="mx-auto max-w-[1280px] px-6 pt-28 pb-20 lg:px-8 lg:pt-36 lg:pb-28">
                    <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
                        <FadeIn>
                            <p className="text-secondary-mono text-xs text-tertiary">
                                <DecryptedText text="Welcome to" speed={30} animateOn="view" />
                            </p>
                            <h1 className="mt-3 text-display-lg font-[400] text-primary lg:text-display-xl">
                                <DecryptedText text="ØG Research" speed={30} animateOn="view" encryptedClassName="text-tertiary/50" />
                            </h1>
                            <p className="mt-6 max-w-lg text-lg leading-relaxed text-tertiary">
                                At ØG, we connect advanced AI with Web3, driving innovation in decentralized AI through
                                cutting-edge research and collaboration across blockchain ecosystems.
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.15} className="flex flex-col justify-end">
                            <p className="text-secondary-mono text-xs text-tertiary">Research areas</p>
                            <div className="mt-4 flex flex-col gap-3">
                                {optimizationAreas.map((area) => (
                                    <a
                                        key={area.title}
                                        href="#who-we-are"
                                        className="group flex items-center justify-between text-primary transition-colors duration-200 hover:text-brand-700"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById("who-we-are")?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                    >
                                        <span className="text-md font-medium">{area.title}</span>
                                        <svg className="size-4 text-quaternary transition-transform duration-200 group-hover:translate-y-1 group-hover:text-brand-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 5v14M19 12l-7 7-7-7" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── WHO WE ARE — Full-width heading + horizontal scroll cards ── */}
            <ScrollCardsSection />

            {/* ── Model Alignment — Two-column layout ── */}
            <section className="relative z-10 border-b border-secondary bg-primary">
                <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
                    <div className="grid gap-16 lg:grid-cols-2">
                        {/* Left column — Heading + Image */}
                        <FadeIn className="lg:sticky lg:top-28 lg:self-start">
                            <h2 className="text-display-sm font-[300] text-primary lg:text-[48px] lg:leading-[1.15] lg:tracking-[-1.44px]">
                                Model Alignment in Decentralized AI Systems
                            </h2>
                            <div className="mt-16">
                                <Image
                                    src="/68ae8e98a89270bbcdc00f90_Group (3).avif"
                                    alt="Model Alignment diagram"
                                    width={600}
                                    height={400}
                                    className="h-auto w-full"
                                />
                            </div>
                        </FadeIn>

                        {/* Right column — Description + Numbered items */}
                        <div>
                            <FadeIn>
                                <p className="text-md leading-relaxed text-tertiary">
                                    Contemporary large language models demonstrate exceptional text interpretation and
                                    generation capabilities. However, they also raise ethical risks as they could
                                    inadvertently generate inappropriate, biased, harmful, or non-factual content. These
                                    risks are exacerbated in decentralized AI ecosystems, where each node&apos;s training
                                    data is neither controllable nor filtered. It is important to perform model alignment,
                                    ensuring the model output aligns with human values.
                                </p>
                            </FadeIn>

                            <div className="mt-10 flex flex-col gap-10">
                                <FadeIn delay={0.1}>
                                    <div className="flex gap-4">
                                        <span className="shrink-0 text-md font-bold text-brand-500">01.</span>
                                        <div>
                                            <h3 className="text-lg font-semibold text-primary">
                                                Enhanced Learning Algorithms with Human Preference
                                            </h3>
                                            <p className="mt-2 text-sm leading-relaxed text-tertiary">
                                                The most common solution for alignment is to integrate human preferences as
                                                human values in model optimization, e.g., Reinforcement Learning from Human
                                                Feedback (RLHF) and Direct Preference Optimization (DPO). We aim to apply
                                                these strategies to decentralized settings and make them more efficient.
                                            </p>
                                        </div>
                                    </div>
                                </FadeIn>

                                <FadeIn delay={0.2}>
                                    <div className="flex gap-4">
                                        <span className="shrink-0 text-md font-bold text-brand-500">02.</span>
                                        <div>
                                            <h3 className="text-lg font-semibold text-primary">
                                                Self-Regulation and Correction
                                            </h3>
                                            <p className="mt-2 text-sm leading-relaxed text-tertiary">
                                                In social psychology, perspective taking is an important emotional intelligence
                                                skill. Inspired by this principle, we will propose new alignment strategies,
                                                which guide the model to automatically inspect its output responses, identify
                                                any content misaligned with human values, and rectify it.
                                            </p>
                                        </div>
                                    </div>
                                </FadeIn>

                                <FadeIn delay={0.3}>
                                    <div className="flex gap-4">
                                        <span className="shrink-0 text-md font-bold text-brand-500">03.</span>
                                        <div>
                                            <h3 className="text-lg font-semibold text-primary">
                                                Decentralized Debating for Alignment
                                            </h3>
                                            <p className="mt-2 text-sm leading-relaxed text-tertiary">
                                                Debating is another popular alignment method, where multiple models (or agents)
                                                debate with each other to produce the most accurate and valuable content. This
                                                approach is a natural fit for decentralized AI, where there are multiple models
                                                from different nodes ready for debate.
                                            </p>
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Featured Articles (Large hero + cards like Anthropic) ── */}
            <section className="relative z-10 border-b border-secondary bg-primary">
                <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
                    <FadeIn>
                        <p className="text-secondary-mono text-xs text-tertiary">Latest</p>
                        <h2 className="mt-3 text-[48px] font-[300] leading-[1.1] tracking-[-1.44px] text-primary">
                            Latest from ØG Research
                        </h2>
                    </FadeIn>

                    <div className="mt-20 grid gap-16 lg:grid-cols-2">
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
                                <div className="mt-5 pr-[36px]">
                                    <span className="text-secondary-mono text-xs text-quaternary">
                                        {featuredArticles[0].date}
                                    </span>
                                    <h3 className="mt-3 text-[32px] font-[400] leading-[1.3] tracking-[-0.96px] text-primary transition-colors duration-200 group-hover:text-brand-700">
                                        {featuredArticles[0].title}
                                    </h3>
                                    <p className="mt-2 text-md leading-relaxed text-tertiary">
                                        {featuredArticles[0].description}
                                    </p>
                                    <span className="mt-3 inline-block rounded-full bg-brand-50 px-2.5 py-0.5 font-mono text-xs font-medium uppercase text-brand-700">
                                        {featuredArticles[0].category}
                                    </span>
                                </div>
                            </a>
                        </FadeIn>

                        {/* Stacked cards */}
                        <div className="flex flex-col gap-8">
                            {featuredArticles.slice(1).map((article, i) => (
                                <FadeIn key={article.title} delay={i * 0.1}>
                                    <a
                                        href={article.link}
                                        className="group flex gap-6 border-b border-secondary pb-10 last:border-0 last:pb-0"
                                    >
                                        <div className="relative aspect-square w-[160px] shrink-0 overflow-hidden rounded-xl bg-secondary">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex flex-col pr-[48px]">
                                            <span className="text-secondary-mono text-xs text-quaternary">
                                                {article.date}
                                            </span>
                                            <h3 className="mt-2 text-xl font-[400] leading-[1.3] text-primary transition-colors duration-200 group-hover:text-brand-700">
                                                {article.title}
                                            </h3>
                                            <p className="mt-1.5 text-sm leading-relaxed text-tertiary line-clamp-2">
                                                {article.description}
                                            </p>
                                            <span className="mt-3 inline-block w-fit rounded-full bg-brand-50 px-2.5 py-0.5 font-mono text-xs font-medium uppercase text-brand-700">
                                                {article.category}
                                            </span>
                                        </div>
                                    </a>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Papers Section (Custom Figma Design with PixelBlast BG) ── */}
            <section data-nav-dark className="relative z-10 overflow-hidden">
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
                            Technical Breakthroughs<br />from the ØG Research Lab
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
                            className="rounded-[16px]! border-none! bg-[#fefefe]! px-5! py-4! text-md! font-medium! text-[#0A0D12]! hover:bg-[#9200E1]! hover:text-white!"
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

            {/* ── Multi-Agent Technology — Two-column layout ── */}
            <section className="relative z-10 border-b border-secondary bg-primary">
                <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
                    <div className="grid gap-16 lg:grid-cols-2">
                        {/* Left column — Heading + Description + Image */}
                        <FadeIn className="lg:sticky lg:top-28 lg:self-start">
                            <h2 className="text-[48px] font-[300] leading-[1.1] tracking-[-1.44px] text-primary">
                                New Blockchain System Empowered by Multi-Agent Technology
                            </h2>
                            <p className="mt-6 text-md leading-relaxed text-tertiary">
                                LLM-based multi-agent systems are rising in popularity for managing complex tasks through
                                coordinated AI agents. Their structure aligns well with blockchain, where each node can act
                                as an agent. We will explore key applications of this integration to enhance functionality
                                and efficiency.
                            </p>
                            <div className="mt-8">
                                <Image
                                    src="/68af9015e08318c6f04fb780_3.avif"
                                    alt="Multi-Agent Technology diagram"
                                    width={600}
                                    height={400}
                                    className="h-auto w-full"
                                />
                            </div>
                        </FadeIn>

                        {/* Right column — Stacked items with divider */}
                        <div className="flex flex-col divide-y divide-secondary">
                            <FadeIn delay={0.1}>
                                <div className="pb-10">
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-brand-50">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b75fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M6 3h12l4 6-10 13L2 9z" />
                                            <path d="M11 3l3.5 6L12 22 2 9l4-6" />
                                            <path d="M2 9h20" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-5 text-xl font-semibold text-primary">Smart Contract Management:</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-tertiary">
                                        Smart contracts are a critical component in blockchain to automate transaction execution.
                                        It is promising to analyze, manage, and optimize this software in a distributed manner. We
                                        could implement a multi-agent solution in the blockchain, with each agent focusing on different
                                        functionalities. Their collaboration could significantly augment the blockchain with
                                        comprehensive smart contract services.
                                    </p>
                                </div>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <div className="pt-10">
                                    <div className="flex size-12 items-center justify-center rounded-xl bg-brand-50">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b75fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 6v6l4 2" />
                                        </svg>
                                    </div>
                                    <h3 className="mt-5 text-xl font-semibold text-primary">Anomaly Detection:</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-tertiary">
                                        During blockchain execution, malicious entities may attempt to interfere with transactions,
                                        consensus mechanisms, or cross-node communications. It is thus vital to introduce security
                                        schemes to monitor the system and detect any anomalies. We will design and develop multi-agent
                                        systems to achieve this goal. By encouraging different agents to focus on various aspects of
                                        events and coordinating their decisions, the trustworthiness of the blockchain environment will
                                        be greatly enhanced.
                                    </p>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Research Partners ── */}
            <section className="relative z-10 bg-primary">
                <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
                    <FadeIn className="text-center">
                        <h2 className="text-[48px] font-[300] leading-[1.1] tracking-[-1.44px] text-primary">
                            Collaborating with World-Leading Institutions
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-md leading-relaxed text-tertiary">
                            We partner with top universities and research organizations to advance decentralized AI technology.
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                            {partners.map((partner) => (
                                <div
                                    key={partner.name}
                                    className="flex min-h-[140px] items-center justify-center rounded-[16px] border border-[#e5e5e5] bg-white p-8 grayscale transition-all duration-300 hover:grayscale-0"
                                >
                                    <div className="relative h-16 w-full">
                                        <Image
                                            src={partner.logo}
                                            alt={partner.name}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── Build on ØG — Dark section with 3 cards + CTA ── */}
            <section data-nav-dark className="relative z-10 overflow-hidden bg-black">
                {/* Purple gradient accents — behind rays */}
                <div className="pointer-events-none absolute -right-40 top-0 z-0 size-[600px] rounded-full bg-brand-700/15 blur-[120px]" />
                <div className="pointer-events-none absolute -left-40 bottom-0 z-0 size-[400px] rounded-full bg-brand-700/10 blur-[100px]" />
                {/* Light rays background — above gradients */}
                <div className="absolute inset-0 z-[1]">
                    <LightRays
                        rayLength={2.4}
                        lightSpread={0.8}
                        saturation={0.3}
                        mouseInfluence={0}
                        fadeDistance={1.5}
                        raysSpeed={0.8}
                        noiseAmount={0.22}
                    />
                </div>

                <div className="relative z-[2] mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
                    {/* Header */}
                    <FadeIn className="text-center">
                        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[rgba(183,95,255,0.15)] px-4 py-1.5">
                            <span className="size-2 rounded-full bg-[#b75fff]" />
                            <span className="font-mono text-sm font-medium text-[#b75fff]">BUILD ON ØG</span>
                        </div>
                        <h2 className="mt-6 text-[48px] font-[300] leading-[1.1] tracking-[-1.44px] text-white">
                            Infrastructure for Healthcare AI & Robotics
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-md leading-relaxed text-white/60">
                            ØG provides decentralized infrastructure for organizations working on healthcare AI, robotics,
                            and data-intensive applications. Here&apos;s what we bring to the table.
                        </p>
                    </FadeIn>

                    {/* 3 Feature cards */}
                    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: (
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b75fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <path d="M3 9h18M9 21V9" />
                                    </svg>
                                ),
                                title: "Decentralized Data Storage",
                                desc: "Store and manage sensitive data with ØG Storage — decentralized, encrypted, and verifiable. Built for compliance-heavy industries where data sovereignty matters.",
                                bullets: [
                                    "End-to-end encryption with cryptographic verification",
                                    "Immutable audit trails for regulatory compliance",
                                    "No single point of failure",
                                    "Patient-controlled access keys",
                                ],
                            },
                            {
                                icon: (
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b75fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="4" y="4" width="16" height="16" rx="2" />
                                        <rect x="9" y="9" width="6" height="6" />
                                        <path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2" />
                                    </svg>
                                ),
                                title: "AI Compute Network",
                                desc: "Access a global GPU network through ØG Compute with TEE (Trusted Execution Environment) verification. Run AI inference and training without building your own infrastructure.",
                                bullets: [
                                    "Pay-per-use GPU access, no idle costs",
                                    "Verifiable execution with TEE proofs",
                                    "Global availability, no vendor lock-in",
                                    "Supports large-scale model training",
                                ],
                            },
                            {
                                icon: (
                                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b75fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                ),
                                title: "Research Collaboration & Funding",
                                desc: "We work directly with research teams — providing technical support, infrastructure access, and investment opportunities for projects building on ØG.",
                                bullets: [
                                    "Direct access to ØG engineering team",
                                    "Investment support for promising projects",
                                    "Co-author research papers with our team",
                                    "Connect with our university partner network",
                                ],
                            },
                        ].map((card) => (
                            <FadeIn key={card.title}>
                                <div className="flex h-full flex-col rounded-[20px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                                    <div className="flex size-14 items-center justify-center rounded-[16px] bg-[rgba(183,95,255,0.15)]">
                                        {card.icon}
                                    </div>
                                    <h3 className="mt-6 text-xl font-semibold text-white">{card.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-white/50">{card.desc}</p>
                                    <ul className="mt-5 flex flex-col gap-2.5">
                                        {card.bullets.map((bullet) => (
                                            <li key={bullet} className="flex items-start gap-2.5 text-sm text-white/70">
                                                <svg className="mt-0.5 size-4 shrink-0 text-[#b75fff]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* Apply CTA banner */}
                    <FadeIn delay={0.2}>
                        <div className="mt-14 text-center">
                            <h3 className="text-[32px] font-[300] tracking-[-0.96px] text-white">
                                Build Your Application on ØG
                            </h3>
                            <p className="mx-auto mt-3 max-w-xl text-md leading-relaxed text-white/60">
                                Whether you&apos;re working on medical imaging, robotic coordination, federated learning,
                                or any data-intensive AI application — we want to hear from you.
                            </p>
                            <div className="mt-8">
                                <a
                                    href="/apply"
                                    className="inline-flex rounded-[16px] bg-white px-8 py-4 text-md font-medium text-[#0A0D12] transition-colors duration-200 hover:bg-[#9200E1] hover:text-white"
                                >
                                    Apply for Partnership
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── Apply for Research Partnership ── */}
            <section className="relative z-10 bg-primary">
                <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-8 lg:py-28">
                    {/* Header */}
                    <FadeIn className="text-center">
                        <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[rgba(183,95,255,0.15)] px-4 py-1.5">
                            <span className="size-2 rounded-full bg-[#b75fff]" />
                            <span className="font-mono text-sm font-medium text-[#b75fff]">JOIN US</span>
                        </div>
                        <h2 className="mt-6 text-[48px] font-[300] leading-[1.1] tracking-[-1.44px] text-primary">
                            Apply for Research Partnership
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-md leading-relaxed text-tertiary">
                            We&apos;re actively seeking partnerships with universities, research institutions, and companies
                            working on decentralized AI, healthcare technology, and robotics.
                        </p>
                    </FadeIn>

                    {/* Benefits — Anthropic-style rows with dividers */}
                    <div className="mx-auto mt-16 max-w-[960px] divide-y divide-secondary">
                        {[
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                    </svg>
                                ),
                                title: "Technical Support",
                                desc: "Access to ØG's engineering team and infrastructure. Get hands-on guidance for building on our decentralized platform.",
                            },
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="1" x2="12" y2="23" />
                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                    </svg>
                                ),
                                title: "Investment Opportunities",
                                desc: "Funding support for promising projects. We invest in research that pushes the boundaries of decentralized AI.",
                            },
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                                    </svg>
                                ),
                                title: "Research Collaboration",
                                desc: "Co-author papers with cutting-edge researchers. Publish alongside our team at top-tier conferences and journals.",
                            },
                            {
                                icon: (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="2" y1="12" x2="22" y2="12" />
                                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                    </svg>
                                ),
                                title: "Ecosystem Access",
                                desc: "Join our global network of partners. Connect with leading universities, research labs, and industry collaborators worldwide.",
                            },
                        ].map((item, i) => (
                            <FadeIn key={item.title} delay={i * 0.08}>
                                <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-[1fr_1.5fr] md:gap-16">
                                    <div className="flex items-start gap-4">
                                        <span className="text-tertiary">{item.icon}</span>
                                        <h3 className="text-xl font-semibold text-primary">{item.title}</h3>
                                    </div>
                                    <p className="text-md leading-relaxed text-tertiary">{item.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>

                    {/* CTA */}
                    <FadeIn delay={0.3} className="mt-12 text-center">
                        <a
                            href="/apply"
                            className="inline-flex rounded-[16px] bg-[#0A0D12] px-10 py-4 text-md font-medium text-white transition-colors duration-200 hover:bg-[#9200E1]"
                        >
                            Apply for Research Partnership
                        </a>
                    </FadeIn>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="relative z-10 overflow-hidden">
                {/* Panda video background — covers entire footer */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                >
                    <source src="/footer-video.mp4" type="video/mp4" />
                </video>
                {/* Purple gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to bottom, rgba(173,87,210,0.7) 0%, rgba(173,87,210,0.3) 50%, rgba(173,87,210,0) 100%)",
                    }}
                />

                {/* Footer content over video */}
                <div className="relative z-10 mx-auto max-w-[1280px] px-6 pt-16 pb-12 lg:px-8">
                    {/* Top row: Newsletter (left) + Links + Socials (right) */}
                    <div className="grid gap-12 lg:grid-cols-[1fr_3fr]">
                        {/* Left: Newsletter + Copyright */}
                        <div>
                            <h3 className="text-xl font-[300] text-white">Sign up for our newsletter</h3>
                            <form className="mt-6 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full max-w-[200px] rounded-[16px] border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-white/50 backdrop-blur-sm focus:border-white/40 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="rounded-[16px] bg-white px-5 py-3 text-sm font-medium text-[#0A0D12] transition-colors duration-200 hover:bg-[#9200E1] hover:text-white"
                                >
                                    Subscribe
                                </button>
                            </form>
                            <p className="mt-6 text-sm text-white/50">&copy; 2026 ØG. All rights reserved.</p>
                        </div>

                        {/* Right: Link columns + Socials */}
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {Object.entries(footerLinks).map(([category, links]) => (
                                <div key={category}>
                                    <h4 className="font-mono text-xs font-medium uppercase tracking-wider text-white/80">
                                        {category}
                                    </h4>
                                    <ul className="mt-4 flex flex-col gap-2.5">
                                        {links.map((link) => (
                                            <li key={link.label}>
                                                <a
                                                    href={link.href}
                                                    target={link.href.startsWith("http") ? "_blank" : undefined}
                                                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                    className="text-sm text-white/60 transition-colors duration-200 hover:text-white"
                                                >
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            {/* Socials */}
                            <div>
                                <h4 className="font-mono text-xs font-medium uppercase tracking-wider text-white/80">
                                    Socials
                                </h4>
                                <div className="mt-4 flex items-center gap-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex size-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-200 hover:border-white/40 hover:text-white"
                                            aria-label={social.label}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom branding: Zero ( ØG ) Gravity */}
                    <div className="mt-16 flex items-end justify-between">
                        <span className="text-[80px] font-[300] leading-none text-white/80 lg:text-[120px]">Zero</span>
                        <div className="flex items-center gap-4 pb-2">
                            <span className="text-[40px] font-[300] text-white/60 lg:text-[60px]">(</span>
                            <Image
                                src="/0g-logo-nav.svg"
                                alt="ØG"
                                width={80}
                                height={38}
                            />
                            <span className="text-[40px] font-[300] text-white/60 lg:text-[60px]">)</span>
                        </div>
                        <span className="text-[80px] font-[300] leading-none text-white/80 lg:text-[120px]">Gravity</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};
