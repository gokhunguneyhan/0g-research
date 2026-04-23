import type { Metadata } from "next";
import { ApplyForm } from "./apply-form";

export const metadata: Metadata = {
    title: "Apply for Research Partnership — 0G Research",
    description:
        "Apply to collaborate with 0G. We partner with universities, hospitals, research institutes, and labs advancing decentralized AI.",
};

export default function ApplyPage() {
    return <ApplyForm />;
}
