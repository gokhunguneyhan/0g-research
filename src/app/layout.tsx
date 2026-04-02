import type { Metadata, Viewport } from "next";
import { Agentation } from "agentation";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "0G Research — Decentralized AI Innovation",
    description:
        "At 0G, we connect advanced AI with Web3, driving innovation in decentralized AI through cutting-edge research and collaboration across blockchain ecosystems.",
};

export const viewport: Viewport = {
    themeColor: "#9200E1",
    colorScheme: "light",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-primary antialiased">
                <RouteProvider>
                    <Theme>{children}</Theme>
                    {process.env.NODE_ENV === "development" && <Agentation />}
                </RouteProvider>
            </body>
        </html>
    );
}
