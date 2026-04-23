"use client";

import { useState, useCallback, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { TextArea } from "@/components/base/textarea/textarea";
import { Button } from "@/components/base/buttons/button";


const institutionTypes = [
    { id: "university", label: "University" },
    { id: "research-institute", label: "Research Institute" },
    { id: "hospital", label: "Hospital / Health System" },
    { id: "government-lab", label: "Government Lab" },
    { id: "corporate-rd", label: "Corporate R&D" },
    { id: "other", label: "Other" },
];

const timelineOptions = [
    { id: "under-6", label: "Under 6 months" },
    { id: "6-12", label: "6-12 months" },
    { id: "1-2", label: "1-2 years" },
    { id: "2-plus", label: "2+ years" },
];

const referralOptions = [
    { id: "ntu", label: "NTU Partnership News" },
    { id: "conference", label: "Academic Conference" },
    { id: "colleague", label: "Colleague Referral" },
    { id: "website", label: "0G Website / Blog" },
    { id: "social", label: "Social Media" },
    { id: "other", label: "Other" },
];

const researchAreas = [
    "Decentralized AI Training",
    "Model Alignment",
    "Federated Learning",
    "Multi-Agent Systems",
    "Healthcare AI",
    "Robotics",
    "Data Privacy & Security",
    "Blockchain Infrastructure",
    "Other",
];

const supportOptions = [
    "Infrastructure Access (Storage/Compute)",
    "Research Funding",
    "Technical Mentorship",
    "Co-Authorship",
    "Student Programs (internships, scholarships)",
    "Other",
];

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

interface FormData {
    contact_name: string;
    contact_email: string;
    role: string;
    phone_whatsapp: string;
    telegram_slack: string;
    contact2_name: string;
    contact2_email: string;
    contact2_role: string;
    contact2_messaging: string;
    institution_name: string;
    institution_type: string;
    department: string;
    country: string;
    website: string;
    areas: string[];
    proposal: string;
    publications_url: string;
    support: string[];
    timeline: string;
    referral: string;
}

interface FormErrors {
    [key: string]: string;
}

const initialFormData: FormData = {
    contact_name: "",
    contact_email: "",
    role: "",
    phone_whatsapp: "",
    telegram_slack: "",
    contact2_name: "",
    contact2_email: "",
    contact2_role: "",
    contact2_messaging: "",
    institution_name: "",
    institution_type: "",
    department: "",
    country: "",
    website: "",
    areas: [],
    proposal: "",
    publications_url: "",
    support: [],
    timeline: "",
    referral: "",
};

export function ApplyForm() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const updateField = useCallback((field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
    }, []);

    const toggleArrayField = useCallback((field: "areas" | "support", value: string) => {
        setFormData((prev) => {
            const arr = prev[field];
            return {
                ...prev,
                [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
            };
        });
        setErrors((prev) => {
            const next = { ...prev };
            delete next[field];
            return next;
        });
    }, []);

    const validate = useCallback((): boolean => {
        const e: FormErrors = {};
        if (!formData.contact_name.trim()) e.contact_name = "Required";
        if (!formData.contact_email.trim()) {
            e.contact_email = "Required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact_email)) {
            e.contact_email = "Valid email required";
        }
        if (!formData.role.trim()) e.role = "Required";
        if (!formData.institution_name.trim()) e.institution_name = "Required";
        if (!formData.institution_type) e.institution_type = "Required";
        if (!formData.country.trim()) e.country = "Required";
        if (formData.areas.length === 0) e.areas = "Select at least one";
        if (!formData.proposal.trim()) e.proposal = "Required";
        if (formData.support.length === 0) e.support = "Select at least one";
        setErrors(e);
        return Object.keys(e).length === 0;
    }, [formData]);

    const handleSubmit = useCallback(
        async (e: FormEvent) => {
            e.preventDefault();
            if (!validate()) return;

            setIsSubmitting(true);
            setSubmitError(false);

            const payload = {
                timestamp: new Date().toISOString(),
                ...formData,
                areas: formData.areas.join(", "),
                support: formData.support.join(", "),
            };

            try {
                const res = await fetch("/api/apply", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                if (!res.ok) throw new Error("Submission failed");
                setIsSuccess(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } catch {
                setSubmitError(true);
                setIsSubmitting(false);
            }
        },
        [formData, validate],
    );

    return (
        <div className="min-h-dvh bg-primary">
            {/* Nav - simplified for apply page */}
            <nav className="fixed left-0 right-0 top-0 z-[200] flex items-center justify-between px-6 pt-4 lg:px-8">
                <Link
                    href="/"
                    className="flex items-center gap-2 rounded-[16px] border border-[rgba(0,0,0,0.08)] px-4 py-3 text-sm font-medium text-primary transition-all duration-300 hover:bg-[#9200E1] hover:text-white hover:border-transparent"
                    style={{
                        background: "rgba(255,255,255,0.7)",
                        backdropFilter: "blur(25px)",
                        WebkitBackdropFilter: "blur(25px)",
                    }}
                >
                    <ArrowLeft className="size-4" />
                    Back
                </Link>

                <Link href="/" className="shrink-0">
                    <Image
                        src="/0g-logo-nav.svg"
                        alt="0G"
                        width={64}
                        height={31}
                        className="brightness-0"
                    />
                </Link>

                <div className="w-[88px]" />
            </nav>

            <div className="mx-auto max-w-[680px] px-6 pt-28 pb-24 lg:pt-36">
                {/* Success screen */}
                {isSuccess ? (
                    <FadeIn>
                        <div className="text-center py-20">
                            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-success-secondary">
                                <CheckCircle className="size-8 text-fg-success-primary" />
                            </div>
                            <h2 className="text-[32px] font-[300] tracking-[-0.64px] text-primary">
                                Application Received
                            </h2>
                            <p className="mx-auto mt-3 max-w-md text-md leading-relaxed text-tertiary">
                                Thank you for your interest in partnering with 0G. Our research team will
                                review your submission and respond within 10 business days.
                            </p>
                            <div className="mt-8">
                                <Button href="/" color="primary" size="lg">
                                    Back to Research
                                </Button>
                            </div>
                        </div>
                    </FadeIn>
                ) : (
                    <>
                        {/* Header */}
                        <FadeIn>
                            <div className="mb-10 text-center">
                                <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-[rgba(183,95,255,0.15)] px-4 py-1.5">
                                    <span className="size-2 rounded-full bg-[#b75fff]" />
                                    <span className="font-mono text-sm font-medium text-[#b75fff]">0G RESEARCH</span>
                                </div>
                                <h1 className="mt-5 text-[clamp(1.6rem,4vw,2.5rem)] font-[300] leading-[1.15] tracking-[-1px] text-primary">
                                    Research Partnership Application
                                </h1>
                                <p className="mx-auto mt-3 max-w-lg text-md leading-relaxed text-tertiary">
                                    Apply to collaborate with 0G — we partner with universities, hospitals, research
                                    institutes, and labs advancing decentralized AI.
                                </p>
                            </div>
                        </FadeIn>

                        {/* Form */}
                        <form onSubmit={handleSubmit} noValidate>
                            {/* Section 1: Contact */}
                            <FadeIn>
                                <section className="rounded-2xl border border-secondary bg-primary p-6 lg:p-8">
                                    <h2 className="text-secondary-mono mb-5 text-xs text-tertiary">Contact</h2>

                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <Input
                                            label="Full Name"
                                            placeholder="Dr. Jane Smith"
                                            isRequired
                                            isInvalid={!!errors.contact_name}
                                            value={formData.contact_name}
                                            onChange={(v) => updateField("contact_name", v)}
                                            hint={errors.contact_name}
                                        />
                                        <Input
                                            label="Email"
                                            type="email"
                                            placeholder="jane@university.edu"
                                            isRequired
                                            isInvalid={!!errors.contact_email}
                                            value={formData.contact_email}
                                            onChange={(v) => updateField("contact_email", v)}
                                            hint={errors.contact_email}
                                        />
                                    </div>

                                    <div className="mt-5">
                                        <Input
                                            label="Role / Title"
                                            placeholder="Associate Professor, Lab Director, etc."
                                            isRequired
                                            isInvalid={!!errors.role}
                                            value={formData.role}
                                            onChange={(v) => updateField("role", v)}
                                            hint={errors.role}
                                        />
                                    </div>

                                    <div className="my-6 h-px bg-tertiary opacity-30" />

                                    <p className="mb-4 text-sm text-tertiary">
                                        Preferred messaging channel (optional — provide at least one)
                                    </p>
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <Input
                                            label="Phone / WhatsApp"
                                            type="tel"
                                            placeholder="+1 234 567 8901"
                                            value={formData.phone_whatsapp}
                                            onChange={(v) => updateField("phone_whatsapp", v)}
                                        />
                                        <Input
                                            label="Telegram or Slack"
                                            placeholder="@handle or workspace/handle"
                                            value={formData.telegram_slack}
                                            onChange={(v) => updateField("telegram_slack", v)}
                                        />
                                    </div>

                                    <div className="my-6 h-px bg-tertiary opacity-30" />

                                    <div className="mb-4 flex items-center gap-2">
                                        <p className="text-sm font-medium text-secondary">Secondary Contact</p>
                                        <span className="rounded-full bg-[rgba(183,95,255,0.12)] px-2.5 py-0.5 text-xs font-medium text-[#b75fff]">
                                            optional
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <Input
                                            label="Contact 2 — Name"
                                            placeholder="Full name"
                                            value={formData.contact2_name}
                                            onChange={(v) => updateField("contact2_name", v)}
                                        />
                                        <Input
                                            label="Contact 2 — Email"
                                            type="email"
                                            placeholder="colleague@university.edu"
                                            value={formData.contact2_email}
                                            onChange={(v) => updateField("contact2_email", v)}
                                        />
                                    </div>
                                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <Input
                                            label="Contact 2 — Role / Title"
                                            placeholder="Postdoc, Research Engineer, etc."
                                            value={formData.contact2_role}
                                            onChange={(v) => updateField("contact2_role", v)}
                                        />
                                        <Input
                                            label="Contact 2 — Messaging"
                                            placeholder="Phone number or @handle"
                                            value={formData.contact2_messaging}
                                            onChange={(v) => updateField("contact2_messaging", v)}
                                        />
                                    </div>
                                </section>
                            </FadeIn>

                            {/* Section 2: Institution */}
                            <FadeIn delay={0.05}>
                                <section className="mt-5 rounded-2xl border border-secondary bg-primary p-6 lg:p-8">
                                    <h2 className="text-secondary-mono mb-5 text-xs text-tertiary">Institution</h2>

                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <Input
                                            label="Institution Name"
                                            placeholder="Nanyang Technological University"
                                            isRequired
                                            isInvalid={!!errors.institution_name}
                                            value={formData.institution_name}
                                            onChange={(v) => updateField("institution_name", v)}
                                            hint={errors.institution_name}
                                        />
                                        <Select
                                            label="Institution Type"
                                            placeholder="Select type..."
                                            isRequired
                                            isInvalid={!!errors.institution_type}
                                            items={institutionTypes}
                                            selectedKey={formData.institution_type || null}
                                            onSelectionChange={(key) => updateField("institution_type", String(key))}
                                            hint={errors.institution_type}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                    </div>

                                    <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <Input
                                            label="Department / Lab"
                                            placeholder="Dept. of Computer Science"
                                            value={formData.department}
                                            onChange={(v) => updateField("department", v)}
                                        />
                                        <Input
                                            label="Country"
                                            placeholder="Singapore"
                                            isRequired
                                            isInvalid={!!errors.country}
                                            value={formData.country}
                                            onChange={(v) => updateField("country", v)}
                                            hint={errors.country}
                                        />
                                    </div>

                                    <div className="mt-5">
                                        <Input
                                            label="Institution Website"
                                            type="url"
                                            placeholder="https://..."
                                            value={formData.website}
                                            onChange={(v) => updateField("website", v)}
                                        />
                                    </div>
                                </section>
                            </FadeIn>

                            {/* Section 3: Research Interest */}
                            <FadeIn delay={0.1}>
                                <section className="mt-5 rounded-2xl border border-secondary bg-primary p-6 lg:p-8">
                                    <h2 className="text-secondary-mono mb-5 text-xs text-tertiary">Research Interest</h2>

                                    <div>
                                        <p className="mb-1 text-sm font-medium text-secondary">
                                            Areas of Interest <span className="text-brand-secondary">*</span>
                                        </p>
                                        <p className="mb-3 text-sm text-tertiary">Select all that apply</p>
                                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                            {researchAreas.map((area) => (
                                                <Checkbox
                                                    key={area}
                                                    label={area}
                                                    isSelected={formData.areas.includes(area)}
                                                    onChange={() => toggleArrayField("areas", area)}
                                                />
                                            ))}
                                        </div>
                                        {errors.areas && (
                                            <p className="mt-2 text-sm text-error-primary">{errors.areas}</p>
                                        )}
                                    </div>

                                    <div className="mt-6">
                                        <TextArea
                                            label="Brief Proposal"
                                            placeholder="We are interested in exploring..."
                                            isRequired
                                            isInvalid={!!errors.proposal}
                                            value={formData.proposal}
                                            onChange={(v) => updateField("proposal", v)}
                                            hint={errors.proposal || "Describe what you'd like to explore or build (3-5 sentences, max 500 characters)"}
                                            rows={4}
                                            maxLength={500}
                                        />
                                        <p className={`mt-1 text-right text-xs ${formData.proposal.length > 500 ? "text-error-primary" : "text-tertiary"}`}>
                                            {formData.proposal.length}/500
                                        </p>
                                    </div>

                                    <div className="mt-5">
                                        <Input
                                            label="Relevant Publications or Lab Page"
                                            type="url"
                                            placeholder="https://scholar.google.com/..."
                                            value={formData.publications_url}
                                            onChange={(v) => updateField("publications_url", v)}
                                        />
                                    </div>
                                </section>
                            </FadeIn>

                            {/* Section 4: Partnership Preferences */}
                            <FadeIn delay={0.15}>
                                <section className="mt-5 rounded-2xl border border-secondary bg-primary p-6 lg:p-8">
                                    <h2 className="text-secondary-mono mb-5 text-xs text-tertiary">Partnership</h2>

                                    <div>
                                        <p className="mb-3 text-sm font-medium text-secondary">
                                            What support are you looking for? <span className="text-brand-secondary">*</span>
                                        </p>
                                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                            {supportOptions.map((option) => (
                                                <Checkbox
                                                    key={option}
                                                    label={option}
                                                    isSelected={formData.support.includes(option)}
                                                    onChange={() => toggleArrayField("support", option)}
                                                />
                                            ))}
                                        </div>
                                        {errors.support && (
                                            <p className="mt-2 text-sm text-error-primary">{errors.support}</p>
                                        )}
                                    </div>

                                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                                        <Select
                                            label="Estimated Timeline"
                                            placeholder="Select..."
                                            items={timelineOptions}
                                            selectedKey={formData.timeline || null}
                                            onSelectionChange={(key) => updateField("timeline", String(key))}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                        <Select
                                            label="How did you hear about 0G?"
                                            placeholder="Select..."
                                            items={referralOptions}
                                            selectedKey={formData.referral || null}
                                            onSelectionChange={(key) => updateField("referral", String(key))}
                                        >
                                            {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
                                        </Select>
                                    </div>
                                </section>
                            </FadeIn>

                            {/* Submit */}
                            <FadeIn delay={0.2}>
                                <div className="mt-8 text-center">
                                    <Button
                                        type="submit"
                                        color="primary"
                                        size="xl"
                                        isLoading={isSubmitting}
                                        showTextWhileLoading
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Application"}
                                    </Button>
                                    <p className="mt-3 text-sm text-tertiary">
                                        We typically respond within 10 business days.
                                    </p>
                                    {submitError && (
                                        <p className="mt-3 text-sm text-error-primary">
                                            Something went wrong. Please try again or email us directly.
                                        </p>
                                    )}
                                </div>
                            </FadeIn>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
