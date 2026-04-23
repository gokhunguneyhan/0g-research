import { NextResponse } from "next/server";

interface SubmissionPayload {
    timestamp: string;
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
    areas: string;
    proposal: string;
    publications_url: string;
    support: string;
    timeline: string;
    referral: string;
}

function validatePayload(data: SubmissionPayload): string | null {
    if (!data.contact_name?.trim()) return "Contact name is required";
    if (!data.contact_email?.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact_email)) return "Invalid email";
    if (!data.role?.trim()) return "Role is required";
    if (!data.institution_name?.trim()) return "Institution name is required";
    if (!data.institution_type?.trim()) return "Institution type is required";
    if (!data.country?.trim()) return "Country is required";
    if (!data.areas?.trim()) return "At least one research area is required";
    if (!data.proposal?.trim()) return "Proposal is required";
    if (!data.support?.trim()) return "At least one support type is required";
    return null;
}

export async function POST(request: Request) {
    const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;

    if (!GOOGLE_SHEETS_URL) {
        console.error("GOOGLE_SHEETS_URL env var not set");
        return NextResponse.json({ error: "Form backend not configured" }, { status: 500 });
    }

    try {
        const data: SubmissionPayload = await request.json();

        const error = validatePayload(data);
        if (error) {
            return NextResponse.json({ error }, { status: 400 });
        }

        const response = await fetch(GOOGLE_SHEETS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!response.ok && response.type !== "opaque") {
            console.error("Google Sheets error:", response.status);
            return NextResponse.json({ error: "Submission failed" }, { status: 500 });
        }

        console.log("SUBMISSION", JSON.stringify({
            timestamp: data.timestamp,
            name: data.contact_name,
            email: data.contact_email,
            institution: data.institution_name,
            country: data.country,
        }));

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
