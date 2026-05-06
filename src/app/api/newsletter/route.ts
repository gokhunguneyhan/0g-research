import { NextResponse } from "next/server";

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf69IEhxOCzourq41UJK0ki-z-Dmr7RVHV-sItxe4b78KYJeQ/formResponse";

export async function POST(request: Request) {
    try {
        const { email } = await request.json();

        if (!email?.trim()) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "Invalid email" }, { status: 400 });
        }

        const body = new URLSearchParams({ "entry.1149620237": email });

        await fetch(FORM_URL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body.toString(),
            redirect: "follow",
        });

        console.log("NEWSLETTER", email);
        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
