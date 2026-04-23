import { NextResponse } from "next/server";
import { Resend } from "resend";

function getResend() {
    return new Resend(process.env.RESEND_API_KEY);
}


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

function buildEmailHtml(data: SubmissionPayload): string {
    return `
<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
  <div style="background: #0A0D12; padding: 24px 32px; border-radius: 12px 12px 0 0;">
    <h1 style="margin: 0; font-size: 20px; font-weight: 500; color: #fff;">New Research Partnership Application</h1>
  </div>

  <div style="border: 1px solid #e5e5e5; border-top: none; padding: 32px; border-radius: 0 0 12px 12px;">
    <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #9200E1; margin: 0 0 16px;">Contact</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 140px;">Name</td><td style="padding: 6px 0; font-weight: 500;">${data.contact_name}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;"><a href="mailto:${data.contact_email}" style="color: #9200E1;">${data.contact_email}</a></td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Role</td><td style="padding: 6px 0;">${data.role}</td></tr>
      ${data.phone_whatsapp ? `<tr><td style="padding: 6px 0; color: #666;">Phone/WhatsApp</td><td style="padding: 6px 0;">${data.phone_whatsapp}</td></tr>` : ""}
      ${data.telegram_slack ? `<tr><td style="padding: 6px 0; color: #666;">Telegram/Slack</td><td style="padding: 6px 0;">${data.telegram_slack}</td></tr>` : ""}
    </table>

    ${data.contact2_name ? `
    <p style="font-size: 13px; color: #666; margin: 0 0 8px;">Secondary Contact</p>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 140px;">Name</td><td style="padding: 6px 0;">${data.contact2_name}</td></tr>
      ${data.contact2_email ? `<tr><td style="padding: 6px 0; color: #666;">Email</td><td style="padding: 6px 0;">${data.contact2_email}</td></tr>` : ""}
      ${data.contact2_role ? `<tr><td style="padding: 6px 0; color: #666;">Role</td><td style="padding: 6px 0;">${data.contact2_role}</td></tr>` : ""}
      ${data.contact2_messaging ? `<tr><td style="padding: 6px 0; color: #666;">Messaging</td><td style="padding: 6px 0;">${data.contact2_messaging}</td></tr>` : ""}
    </table>` : ""}

    <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 0 0 24px;" />

    <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #9200E1; margin: 0 0 16px;">Institution</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 140px;">Institution</td><td style="padding: 6px 0; font-weight: 500;">${data.institution_name}</td></tr>
      <tr><td style="padding: 6px 0; color: #666;">Type</td><td style="padding: 6px 0;">${data.institution_type}</td></tr>
      ${data.department ? `<tr><td style="padding: 6px 0; color: #666;">Department</td><td style="padding: 6px 0;">${data.department}</td></tr>` : ""}
      <tr><td style="padding: 6px 0; color: #666;">Country</td><td style="padding: 6px 0;">${data.country}</td></tr>
      ${data.website ? `<tr><td style="padding: 6px 0; color: #666;">Website</td><td style="padding: 6px 0;"><a href="${data.website}" style="color: #9200E1;">${data.website}</a></td></tr>` : ""}
    </table>

    <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 0 0 24px;" />

    <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #9200E1; margin: 0 0 16px;">Research</h2>
    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr><td style="padding: 6px 0; color: #666; width: 140px;">Areas</td><td style="padding: 6px 0;">${data.areas}</td></tr>
      <tr><td style="padding: 6px 0; color: #666; vertical-align: top;">Proposal</td><td style="padding: 6px 0;">${data.proposal}</td></tr>
      ${data.publications_url ? `<tr><td style="padding: 6px 0; color: #666;">Publications</td><td style="padding: 6px 0;"><a href="${data.publications_url}" style="color: #9200E1;">${data.publications_url}</a></td></tr>` : ""}
    </table>

    <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 0 0 24px;" />

    <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #9200E1; margin: 0 0 16px;">Partnership</h2>
    <table style="width: 100%; border-collapse: collapse;">
      <tr><td style="padding: 6px 0; color: #666; width: 140px;">Support needed</td><td style="padding: 6px 0;">${data.support}</td></tr>
      ${data.timeline ? `<tr><td style="padding: 6px 0; color: #666;">Timeline</td><td style="padding: 6px 0;">${data.timeline}</td></tr>` : ""}
      ${data.referral ? `<tr><td style="padding: 6px 0; color: #666;">Referral</td><td style="padding: 6px 0;">${data.referral}</td></tr>` : ""}
    </table>
  </div>

  <p style="font-size: 12px; color: #999; margin-top: 16px; text-align: center;">
    Submitted ${data.timestamp ? new Date(data.timestamp).toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" }) : "just now"}
  </p>
</div>`;
}

export async function POST(request: Request) {
    try {
        const data: SubmissionPayload = await request.json();

        const error = validatePayload(data);
        if (error) {
            return NextResponse.json({ error }, { status: 400 });
        }

        const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_URL;
        const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "research@0g.ai";

        const results = await Promise.allSettled([
            // Email notification
            getResend().emails.send({
                from: "0G Research <onboarding@resend.dev>",
                to: NOTIFY_EMAIL,
                subject: `New Partnership Application: ${data.institution_name} — ${data.contact_name}`,
                html: buildEmailHtml(data),
            }),

            // Google Sheets backup
            ...(GOOGLE_SHEETS_URL
                ? [
                      fetch(GOOGLE_SHEETS_URL, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(data),
                      }),
                  ]
                : []),
        ]);

        const emailResult = results[0];
        if (emailResult.status === "rejected") {
            console.error("Email failed:", emailResult.reason);
        }

        if (results[1]?.status === "rejected") {
            console.error("Google Sheets failed:", (results[1] as PromiseRejectedResult).reason);
        }

        // Structured log for Vercel dashboard
        console.log("SUBMISSION", JSON.stringify({
            timestamp: data.timestamp,
            name: data.contact_name,
            email: data.contact_email,
            institution: data.institution_name,
            country: data.country,
            areas: data.areas,
        }));

        if (emailResult.status === "rejected" && (!GOOGLE_SHEETS_URL || results[1]?.status === "rejected")) {
            return NextResponse.json({ error: "Submission failed" }, { status: 500 });
        }

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
