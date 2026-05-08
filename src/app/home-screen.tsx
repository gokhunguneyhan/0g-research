"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowRight, ArrowUpRight, ExternalLink, ChevronRight, ChevronDown, Search, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/base/buttons/button";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
        date: "June 23, 2025",
        venue: "FSE 2025",
        title: "dl²: Detecting Communication Deadlocks in Deep Learning Jobs",
        image: "/papers/venue-1.png",
        link: "https://cdn.prod.website-files.com/680bf096cfee93035357a4c9/68b518045dcbd53b99359d15_dl2-fse2025.pdf",
    },
    {
        date: "June 25, 2025",
        venue: "FSE 2025",
        title: "Reduction Fusion for Optimized Distributed Data-Parallel Computations via Inverse Recomputation",
        image: "/papers/venue-2.png",
        link: "https://cdn.prod.website-files.com/680bf096cfee93035357a4c9/68b51954c6bc26fb513fe1aa_reduction-fusion-fse2025.pdf",
    },
    {
        date: "June 26, 2025",
        venue: "ArXiv 2025",
        title: "DiLoCoX: A Low-Communication Large-Scale Training Framework for Decentralized Cluster",
        image: "/papers/venue-3.png",
        link: "https://cdn.prod.website-files.com/680bf096cfee93035357a4c9/68b5141056d5157f362f08f1_2506.21263v1.pdf",
    },
    {
        date: "June 26, 2025",
        venue: "ICCV 2025",
        title: "Backdoor Attack against Scaffold Federated Learning",
        image: "/papers/venue-4.png",
        link: "https://cdn.prod.website-files.com/680bf096cfee93035357a4c9/68b51707a6dae8bd34258ef8_2411.16167v3.pdf",
    },
    {
        date: "2025",
        venue: "ACM 2025",
        title: "CCAgent: Coordinating Collaborative Data Scaling for Operating System Agents via Web3",
        image: "/papers/venue-5.png",
        link: "https://dl.acm.org/doi/epdf/10.1145/3746252.3761392",
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

const navLinks: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
    {
        label: "Learn",
        href: "#",
        children: [
            { label: "Product", href: "https://0g.ai/product" },
            { label: "Blog", href: "https://0g.ai/blog" },
            { label: "FAQs", href: "https://0g.ai/faq" },
            { label: "Contact us", href: "https://0g.ai/contact" },
            { label: "Whitepaper", href: "https://docs.0g.ai/whitepaper.pdf" },
        ],
    },
    {
        label: "Platform",
        href: "#",
        children: [
            { label: "Docs", href: "https://docs.0g.ai/" },
            { label: "0G hub", href: "https://hub.0g.ai" },
            { label: "Builder Hub", href: "https://build.0g.ai/" },
            { label: "0G storage", href: "https://storage.0g.ai/" },
            { label: "0G Private Computer", href: "https://pc.0g.ai/" },
        ],
    },
    {
        label: "Ecosystem",
        href: "#",
        children: [
            { label: "Partners", href: "https://0g.ai/partners" },
            { label: "Accelerator", href: "https://0g.ai/accelerator" },
            { label: "Ecosystem Growth Program", href: "https://0gfoundation.ai/" },
            { label: "Node Sale", href: "https://0gfoundation.ai/node-sale" },
        ],
    },
    {
        label: "Research",
        href: "/",
    },
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
        { label: "Blog", href: "https://0g.ai/blog" },
        { label: "AMAs", href: "https://0g.ai/ama" },
        { label: "FAQs", href: "https://0g.ai/faq" },
        { label: "Whitepaper", href: "https://cdn.jsdelivr.net/gh/0glabs/0g-doc/static/whitepaper.pdf" },
        { label: "Node Disclaimer", href: "https://0g.ai/disclaimer" },
        { label: "Privacy", href: "https://0g.ai/privacy-policy" },
        { label: "Terms", href: "https://0g.ai/terms-of-service" },
    ],
    ecosystem: [
        { label: "Accelerator", href: "https://0g.ai/accelerator" },
        { label: "Press", href: "https://0g.ai/press" },
        { label: "Contact Us", href: "https://0g.ai/contact" },
        { label: "Brand Kit", href: "https://0g.ai/brandkit" },
        { label: "Ecosystem Growth Fund", href: "https://0gfoundation.ai/" },
    ],
};

const socialLinks = [
    {
        label: "Discord",
        href: "https://discord.com/invite/0glabs",
        icon: (
            <svg width="100%" height="100%" viewBox="0 0 41 41" fill="none" aria-hidden="true">
                <path d="M28.9614 13.3126C27.4116 12.6038 25.7657 12.0872 24.0477 11.7988C23.8314 12.1713 23.5911 12.6759 23.4229 13.0723C21.5956 12.808 19.7814 12.808 17.9793 13.0723C17.8111 12.6759 17.5588 12.1713 17.3546 11.7988C15.6246 12.0872 13.9786 12.6038 12.4396 13.3126C9.32799 17.902 8.48701 22.3832 8.90751 26.8044C10.9739 28.3062 12.9683 29.2192 14.9278 29.82C15.4083 29.1712 15.8409 28.4743 16.2133 27.7415C15.5045 27.4772 14.8317 27.1528 14.1829 26.7684C14.3511 26.6483 14.5193 26.5161 14.6755 26.3839C18.5921 28.1741 22.8343 28.1741 26.7027 26.3839C26.8709 26.5161 27.0272 26.6483 27.1954 26.7684C26.5466 27.1528 25.8738 27.4772 25.165 27.7415C25.5375 28.4743 25.9699 29.1712 26.4505 29.82C28.4087 29.2192 30.4151 28.3062 32.4707 26.8044C32.9873 21.6865 31.6526 17.2412 28.9614 13.3126ZM16.7539 24.0772C15.5765 24.0772 14.6154 23.008 14.6154 21.6985C14.6154 20.3889 15.5525 19.3197 16.7539 19.3197C17.9433 19.3197 18.9164 20.3889 18.8924 21.6985C18.8924 23.008 17.9433 24.0772 16.7539 24.0772ZM24.6484 24.0772C23.471 24.0772 22.5086 23.008 22.5086 21.6985C22.5086 20.3889 23.447 19.3197 24.6484 19.3197C25.8378 19.3197 26.8109 20.3889 26.7868 21.6985C26.7868 23.008 25.8498 24.0772 24.6484 24.0772Z" fill="currentColor" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/0g-labs/",
        icon: (
            <svg width="100%" height="100%" viewBox="0 0 41 40" fill="none" aria-hidden="true">
                <path d="M15.685 13.1952C15.6846 13.9869 15.1986 14.6993 14.4562 14.9965C13.7137 15.2937 12.863 15.1164 12.3053 14.5481C11.7475 13.9799 11.5941 13.1342 11.9173 12.4098C12.2405 11.6855 12.9758 11.2271 13.7765 11.2509C14.84 11.2824 15.6855 12.1438 15.685 13.1952ZM15.744 16.5784H11.8091V28.75H15.744V16.5784ZM21.9612 16.5784H18.0459V28.75H21.9219V22.3628C21.9219 18.8046 26.6143 18.4741 26.6143 22.3628V28.75H30.5V21.0407C30.5 15.0424 23.5549 15.266 21.9219 18.2116L21.9612 16.5784Z" fill="currentColor" />
            </svg>
        ),
    },
    {
        label: "X",
        href: "https://x.com/0G_labs",
        icon: (
            <svg width="100%" height="100%" viewBox="0 0 41 40" fill="none" aria-hidden="true">
                <path d="M26.2511 11.25L21.1976 16.8419L16.8283 11.25H10.5L18.0613 20.8211L10.8949 28.75H13.9636L19.4946 22.6322L24.3284 28.75H30.5L22.6179 18.6629L29.318 11.25H26.2511ZM25.1748 26.9731L14.0813 12.9336H15.9049L26.8741 26.9731H25.1748Z" fill="currentColor" />
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

    const isMobile = dimensions.vw < 768;
    const totalTrackWidth = optimizationAreas.length * 406 + (optimizationAreas.length - 1) * 32;
    const leftPad = Math.max(24, (dimensions.vw - 1280) / 2 + 32);
    const maxTranslate = Math.max(totalTrackWidth + leftPad + leftPad - dimensions.vw, 0);

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
            style={{ height: isMobile ? "auto" : `${maxTranslate + dimensions.vh}px` }}
        >
            <div className={`flex flex-col overflow-clip ${isMobile ? "py-10" : "sticky top-0 h-screen justify-center py-[5vh]"}`}>
                <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
                    <div className="inline-flex items-center gap-2 rounded-full bg-[rgba(183,95,255,0.15)] px-4 py-1.5">
                        <span className="size-2 rounded-full bg-[#b75fff]" />
                        <span className="font-mono text-sm font-medium text-[#b75fff]">
                            WHO WE ARE
                        </span>
                    </div>
                    <h2 className="mt-4 max-w-[1152px] text-[28px] font-[300] leading-[1.3] tracking-[-0.84px] text-[#141413] md:mt-6 md:text-[48px] md:leading-[1.1] md:tracking-[-1.44px]">
                        Optimizing Model Training in{" "}
                        <span className="text-[#b75fff]">Decentralized AI Systems</span> with
                        Scalable Frameworks and Algorithms for Efficient and Collaborative{" "}
                        <span className="text-[#b75fff]">Global Learning</span>.
                    </h2>
                </div>

                <div
                    className="mt-6 flex gap-4 overflow-x-auto pb-4 md:mt-12 md:gap-[32px] md:overflow-visible md:pb-0"
                    style={{
                        paddingLeft: "max(1.5rem, calc((100vw - 1280px) / 2 + 32px))",
                        paddingRight: "1.5rem",
                        ...(!isMobile ? { transform: `translateX(-${translateX}px)`, willChange: "transform" } : {}),
                    }}
                >
                    {optimizationAreas.map((area, i) => (
                        <div
                            key={area.title}
                            className="flex w-[280px] shrink-0 flex-col gap-3 rounded-[24px] bg-[#faf4fe] p-6 md:w-[406px] md:gap-[17px] md:rounded-[32px] md:p-[40px]"
                        >
                            {cardIcons[i]}
                            <h3 className="text-[22px] font-[300] leading-[1.3] tracking-[-0.66px] text-[#141413] md:text-[32px] md:leading-[1.4] md:tracking-[-0.96px]">
                                {area.title}
                            </h3>
                            <p className="text-[14px] font-[300] leading-[1.4] text-[#333] md:text-[18px]">
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [expandedNav, setExpandedNav] = useState<string | null>(null);
    const [isMobileView, setIsMobileView] = useState(false);
    const [nlEmail, setNlEmail] = useState("");
    const [nlLoading, setNlLoading] = useState(false);
    const [nlStatus, setNlStatus] = useState<"idle" | "success" | "error">("idle");

    const handleNewsletterSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (!nlEmail.trim() || nlLoading) return;
        setNlLoading(true);
        setNlStatus("idle");
        try {
            const res = await fetch("/api/newsletter", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: nlEmail }),
            });
            if (res.ok) {
                setNlStatus("success");
                setNlEmail("");
            } else {
                setNlStatus("error");
            }
        } catch {
            setNlStatus("error");
        } finally {
            setNlLoading(false);
        }
    };

    useEffect(() => {
        const checkMobile = () => setIsMobileView(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

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
        <div className="min-h-dvh overflow-x-clip">
            {/* Gradual blur at top of page */}
            <GradualBlur position="top" strength={4} target="page" zIndex={0} divCount={10} />

            {/* ── Navigation — Floating glass pill, adaptive colors ── */}
            <nav className="fixed left-0 right-0 top-0 z-[200] flex items-center px-4 pt-3 transition-colors duration-300 md:px-6 md:pt-4 lg:px-8">
                {/* Left spacer to balance the right CTA */}
                <div className="hidden w-[200px] lg:block" />

                {/* Nav pill — centered on desktop, full-width on mobile */}
                <div
                    className="mx-auto flex w-full items-center justify-between gap-[60px] rounded-[16px] border py-2 pl-4 pr-2 transition-all duration-300 md:w-auto md:rounded-[20px] md:py-3 md:pl-5 md:pr-3"
                    style={{
                        background: navOnDark && !mobileMenuOpen ? "rgba(255,255,255,0.08)" : mobileMenuOpen ? "rgba(245,245,245,0.95)" : "rgba(0,0,0,0)",
                        backdropFilter: "blur(25px)",
                        WebkitBackdropFilter: "blur(25px)",
                        borderColor: navOnDark && !mobileMenuOpen ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                    }}
                >
                    {/* 0G Logo */}
                    <a href="https://0g.ai" className="shrink-0">
                        <Image
                            src="/0g-logo-nav.svg"
                            alt="0G"
                            width={64}
                            height={31}
                            className={`transition-all duration-300 ${navOnDark && !mobileMenuOpen ? "" : "brightness-0"}`}
                        />
                    </a>

                    {/* Desktop nav links */}
                    <div className="hidden items-center gap-5 md:flex">
                        {navLinks.map((link) =>
                            link.children ? (
                                <div key={link.label} className="group relative">
                                    <button
                                        className={`flex items-center gap-1 text-[16px] capitalize transition-colors duration-300 hover:opacity-80 ${navOnDark ? "text-white" : "text-[#0A0D12]"}`}
                                    >
                                        {link.label}
                                        <ChevronDown className="size-3.5 opacity-50" />
                                    </button>
                                    <div className="pointer-events-none absolute left-1/2 top-full pt-4 opacity-0 transition-all duration-300 ease-out [transform:translateY(8px)] group-hover:pointer-events-auto group-hover:opacity-100 group-hover:[transform:translateY(0)]">
                                        <div className="-translate-x-[36%] rounded-[12px] border border-[#e5e5e5] bg-white p-2 shadow-lg backdrop-blur-[50px]"
                                            style={{ gap: "0.25rem", display: "flex", flexDirection: "column" }}
                                        >
                                            {link.children.map((child) => (
                                                <a
                                                    key={child.label}
                                                    href={child.href}
                                                    {...(child.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                                    className="block whitespace-nowrap rounded-[8px] px-3 py-3 text-[16px] capitalize text-[#0A0D12] transition-colors duration-300 hover:bg-[#e3c1ff]"
                                                >
                                                    {child.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className={`text-[16px] capitalize transition-colors duration-300 hover:opacity-80 ${navOnDark ? "text-white" : "text-[#0A0D12]"}`}
                                >
                                    {link.label}
                                </a>
                            ),
                        )}
                    </div>

                    {/* Desktop Build + Launch app buttons */}
                    <div className="hidden items-center gap-2 md:flex">
                        <a
                            href="https://build.0g.ai/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`items-center justify-center rounded-[16px] border px-[18px] py-[14px] text-md font-medium capitalize transition-all duration-300 hover:border-[#b75fff] hover:bg-[#f3e6fe] hover:text-[#0A0D12] ${navOnDark ? "border-white/20 bg-transparent text-white hover:border-[#b75fff] hover:bg-[#f3e6fe] hover:text-[#0A0D12]" : "border-[rgba(0,0,0,0.08)] bg-transparent text-[#0A0D12]"}`}
                        >
                            Build
                        </a>
                        <a
                            href="https://app.0g.ai/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`items-center justify-center rounded-[16px] px-[18px] py-[14px] text-md font-medium capitalize transition-all duration-300 hover:bg-[#9200E1] hover:text-white ${navOnDark ? "bg-white text-[#0A0D12]" : "bg-[#0A0D12] text-white"}`}
                        >
                            Launch app
                        </a>
                    </div>

                    {/* Mobile: Apply CTA + Hamburger */}
                    <div className="flex items-center gap-2 md:hidden">
                        <a
                            href="https://0g.ai/apply"
                            className="rounded-[10px] bg-[#0A0D12] px-3 py-1.5 text-sm font-medium text-white transition-all duration-100 hover:bg-[#9200E1]"
                        >
                            Apply
                        </a>
                        <button
                            onClick={() => { setMobileMenuOpen(!mobileMenuOpen); setExpandedNav(null); }}
                            className="flex size-9 items-center justify-center rounded-[10px] text-[#0A0D12] transition-all duration-100 hover:bg-black/5"
                            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
                        </button>
                    </div>
                </div>

                {/* Right side: Bell + Apply CTA (desktop) */}
                <div className="hidden items-center gap-3 lg:flex">
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
                    <a
                        href="https://0g.ai/apply"
                        className={`rounded-[16px] px-[18px] py-[14px] text-md font-medium transition-all duration-300 hover:bg-[#9200E1] hover:text-white ${navOnDark ? "bg-white text-[#0A0D12]" : "bg-[#0A0D12] text-white"}`}
                    >
                        Apply for Partnership
                    </a>
                </div>
            </nav>

            {/* ── Mobile Menu Overlay ── */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed inset-0 z-[199] bg-white px-6 pt-20 pb-8 md:hidden"
                    >
                        <div className="flex h-full flex-col gap-2 overflow-y-auto pt-4">
                            {navLinks.map((group, i) => (
                                <motion.div
                                    key={group.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2, delay: 0.05 * i, ease: "easeOut" }}
                                >
                                    {group.children ? (
                                        <>
                                            <button
                                                onClick={() => setExpandedNav(expandedNav === group.label ? null : group.label)}
                                                className="flex w-full items-center justify-between py-2 text-[28px] font-[300] leading-tight text-[#0A0D12]"
                                            >
                                                {group.label}
                                                <ChevronDown className={`size-6 text-[#999] transition-transform duration-200 ${expandedNav === group.label ? "rotate-180" : ""}`} />
                                            </button>
                                            <AnimatePresence>
                                                {expandedNav === group.label && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="flex flex-col gap-3 pb-3 pl-1 pt-1">
                                                            {group.children.map((child) => (
                                                                <a
                                                                    key={child.label}
                                                                    href={child.href}
                                                                    {...(child.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                    className="text-[20px] font-[300] text-[#555] transition-colors duration-100 hover:text-[#0A0D12]"
                                                                >
                                                                    {child.label}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <a
                                            href={group.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block py-2 text-[28px] font-[300] leading-tight text-[#0A0D12]"
                                        >
                                            {group.label}
                                        </a>
                                    )}
                                </motion.div>
                            ))}

                            <motion.div
                                className="mt-4 flex flex-col gap-4 border-t border-[rgba(0,0,0,0.08)] pt-6"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2, delay: 0.05 * navLinks.length, ease: "easeOut" }}
                            >
                                <div className="flex items-center gap-3">
                                    {socialLinks.map((s) => (
                                        <a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex size-[48px] items-center justify-center rounded-[14px] border border-[rgba(0,0,0,0.08)] text-[#0A0D12] transition-colors duration-100 hover:bg-black/5"
                                            aria-label={s.label}
                                        >
                                            {s.icon}
                                        </a>
                                    ))}
                                </div>
                                <a
                                    href="https://app.0g.ai/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-fit items-center justify-center rounded-[14px] bg-[#0A0D12] px-5 py-3 text-[16px] font-medium text-white transition-all duration-100 hover:bg-[#9200E1]"
                                >
                                    Launch app
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Hero (Two-Column like Anthropic) ── */}
            <section className="relative z-10 border-b border-secondary bg-primary">
                <div className="mx-auto max-w-[1280px] px-6 pt-24 pb-8 lg:px-8 lg:pt-32 lg:pb-12">
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
                <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-8 lg:py-12">
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
            <section className="relative z-10 overflow-hidden border-b border-secondary bg-primary">
                <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-8 lg:py-12">
                    <FadeIn>
                        <p className="text-secondary-mono text-xs text-tertiary">Latest</p>
                        <h2 className="mt-3 text-[48px] font-[300] leading-[1.1] tracking-[-1.44px] text-primary">
                            Latest from ØG Research
                        </h2>
                    </FadeIn>

                    <div className="mt-20 grid gap-16 lg:grid-cols-2">
                        {/* Large featured card */}
                        <FadeIn className="group min-w-0">
                            <a href={featuredArticles[0].link} className="block">
                                <div className="relative overflow-hidden rounded-2xl bg-secondary">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={featuredArticles[0].image}
                                        alt={featuredArticles[0].title}
                                        className="block h-auto max-w-full transition-transform duration-500 group-hover:scale-105"
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
                                        <div className="relative aspect-square w-[100px] shrink-0 overflow-hidden rounded-xl bg-secondary md:w-[160px]">
                                            <Image
                                                src={article.image}
                                                alt={article.title}
                                                fill
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="flex min-w-0 flex-col pr-0 md:pr-[48px]">
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
                                            {pub.venue} · {pub.date}
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
                <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-8 lg:py-12">
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
                <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-8 lg:py-12">
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
                <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-8 lg:py-12">
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
                {/* Light rays background */}
                <div className="absolute inset-0 z-0">

                    <LightRays
                        rayLength={isMobileView ? 4 : 2.4}
                        lightSpread={isMobileView ? 2.5 : 0.8}
                        saturation={isMobileView ? 0.5 : 0.3}
                        mouseInfluence={0}
                        fadeDistance={isMobileView ? 3 : 1.5}
                        raysSpeed={0.8}
                        noiseAmount={0.22}
                    />
                </div>
                {/* Purple gradient accents — above rays, desktop only */}
                <div className="pointer-events-none absolute -right-40 top-0 z-[1] hidden size-[600px] rounded-full bg-brand-700/15 blur-[120px] md:block" />
                <div className="pointer-events-none absolute -left-40 bottom-0 z-[1] hidden size-[400px] rounded-full bg-brand-700/10 blur-[100px] md:block" />

                <div className="relative z-[2] mx-auto max-w-[1280px] px-6 py-8 lg:px-8 lg:py-12">
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
                                <div className="flex h-full flex-col rounded-[20px] border border-white/10 bg-white/[0.12] p-8 backdrop-blur-sm md:bg-white/5">
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
                                    href="https://0g.ai/apply"
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
                <div className="mx-auto max-w-[1280px] px-6 py-8 lg:px-8 lg:py-12">
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
                            href="https://0g.ai/apply"
                            className="inline-flex rounded-[16px] bg-[#0A0D12] px-10 py-4 text-md font-medium text-white transition-colors duration-200 hover:bg-[#9200E1]"
                        >
                            Apply for Research Partnership
                        </a>
                    </FadeIn>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer data-nav-dark className="relative z-10 flex flex-col justify-between overflow-hidden">
                {/* Panda video background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover object-bottom"
                >
                    <source src="/footer-video.mp4" type="video/mp4" />
                </video>
                {/* Purple gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(to bottom, rgba(173,87,210,0.85) 0%, rgba(173,87,210,0.5) 50%, rgba(173,87,210,0) 100%)",
                    }}
                />

                {/* Footer top: Newsletter + Link columns */}
                <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pt-16 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-[1fr_3fr]">
                        {/* Newsletter + Copyright */}
                        <div>
                            <h3 className="text-[1.5rem] font-[300] leading-tight text-white">Sign up for our newsletter</h3>
                            <form className="mt-6 flex max-w-[420px] items-center rounded-[0.875rem] border border-white/20 bg-white/10 py-1 pl-5 pr-1 backdrop-blur-sm" onSubmit={handleNewsletterSubmit}>
                                <input
                                    type="email"
                                    value={nlEmail}
                                    onChange={(e) => setNlEmail(e.target.value)}
                                    placeholder=""
                                    disabled={nlLoading}
                                    className="w-full bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none disabled:opacity-50"
                                />
                                <button
                                    type="submit"
                                    disabled={nlLoading || !nlEmail.trim()}
                                    className="shrink-0 rounded-[0.75rem] bg-white px-5 py-2.5 text-sm font-medium text-[#0A0D12] shadow-[0_2px_20px_rgba(255,255,255,0.6)] transition-colors duration-200 hover:bg-[#9200E1] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {nlLoading ? "..." : "Subscribe"}
                                </button>
                            </form>
                            {nlStatus === "success" && (
                                <p className="mt-3 text-sm text-white/70">Thanks! You&apos;re subscribed.</p>
                            )}
                            {nlStatus === "error" && (
                                <p className="mt-3 text-sm text-red-300">Something went wrong. Please try again.</p>
                            )}
                            <p className="mt-6 hidden text-sm text-white/50 md:block">&copy; 2026 ØG. All rights reserved.</p>
                        </div>

                        {/* Link columns — 2-col on mobile, 4-col on lg */}
                        <div className="grid grid-cols-[1.2fr_1fr] gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
                            {Object.entries(footerLinks).map(([category, links]) => (
                                <div key={category}>
                                    <h4 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-white">
                                        {category}
                                    </h4>
                                    <ul className="mt-4 flex flex-col gap-3">
                                        {links.map((link) => (
                                            <li key={link.label}>
                                                <a
                                                    href={link.href}
                                                    target={link.href.startsWith("http") ? "_blank" : undefined}
                                                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                    className="text-[0.9375rem] font-[300] text-white/60 transition-colors duration-200 hover:text-white"
                                                >
                                                    {link.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            {/* Socials — appears in grid on mobile, separate column on desktop */}
                            <div className="lg:hidden">
                                <h4 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-white">
                                    Socials
                                </h4>
                                <div className="mt-4 flex flex-wrap items-center gap-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex size-[48px] items-center justify-center rounded-[14px] border border-white/20 text-white transition-colors duration-100 hover:bg-white/10"
                                            aria-label={social.label}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Desktop socials column */}
                            <div className="hidden lg:block">
                                <h4 className="font-mono text-[0.6875rem] font-medium uppercase tracking-[0.1em] text-white">
                                    Socials
                                </h4>
                                <div className="mt-4 flex flex-wrap items-center gap-3">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex size-[48px] items-center justify-center rounded-[14px] border border-white/20 text-white transition-colors duration-100 hover:bg-white/10"
                                            aria-label={social.label}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer bottom: Zero ( ØG ) Gravity */}
                <div className="relative z-10 mx-auto w-full max-w-[1280px] px-6 pt-12 pb-8 lg:px-8 lg:pt-16 lg:pb-12">
                    <div className="flex items-end justify-between">
                        <span className="text-[2.5rem] font-[300] leading-none text-white sm:text-[4rem] lg:text-[7.5rem]">Zero</span>
                        <div className="flex items-center gap-2 pb-0.5 sm:gap-4 sm:pb-2">
                            <span className="hidden font-[300] text-white/60 sm:text-[2.5rem] md:inline lg:text-[3.75rem]">(</span>
                            <svg className="h-auto w-[3rem] text-white sm:w-[4rem] lg:w-[6.5rem]" viewBox="0 0 104 50" fill="none" aria-hidden="true">
                                <path d="M104 26.2362C103.344 39.4154 92.3289 49.9019 78.8372 49.9019C64.9233 49.9019 53.6436 38.7485 53.6436 24.9903C53.6436 11.2321 64.9233 0.0791016 78.8372 0.0791016C91.9013 0.0791016 102.643 9.91092 103.907 22.4994H92.4658C91.2808 16.1217 85.6298 11.2893 78.8376 11.2893C71.1845 11.2893 64.9808 17.4235 64.9808 24.9903C64.9808 32.5575 71.1845 38.6917 78.8376 38.6917C84.7128 38.6917 89.7333 35.0762 91.7493 29.9729H72.539V26.2362H104Z" fill="currentColor" />
                                <path d="M8.29178 43.3855C18.1809 52.2457 33.4683 51.9592 43.0086 42.5264C52.8472 32.7977 52.8472 17.0249 43.0086 7.29627C33.1697 -2.43209 17.2179 -2.43209 7.37911 7.29627C-1.85849 16.4304 -2.42295 30.8925 5.68565 40.6779L13.7758 32.6786C10.0529 27.3405 10.5928 19.9723 15.3958 15.2233C20.8071 9.87253 29.5807 9.87253 34.9922 15.2233C40.4031 20.5739 40.4031 29.249 34.9922 34.5998C30.8376 38.7076 24.7016 39.6619 19.6266 37.4622L33.2105 24.0304L30.5383 21.3885L8.29178 43.3855Z" fill="currentColor" />
                            </svg>
                            <span className="hidden font-[300] text-white/60 sm:text-[2.5rem] md:inline lg:text-[3.75rem]">)</span>
                        </div>
                        <span className="text-[2.5rem] font-[300] leading-none text-white sm:text-[4rem] lg:text-[7.5rem]">Gravity</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};
