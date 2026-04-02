"use client";

import React, { CSSProperties, useMemo } from "react";

type GradualBlurProps = {
    position?: "top" | "bottom";
    strength?: number;
    height?: string;
    divCount?: number;
    zIndex?: number;
    target?: "parent" | "page";
    className?: string;
    style?: CSSProperties;
};

const getGradientDirection = (position: string): string => {
    return position === "top" ? "to top" : "to bottom";
};

export default function GradualBlur({
    position = "top",
    strength = 2,
    height = "6rem",
    divCount = 5,
    zIndex = 1000,
    target = "page",
    className = "",
    style = {},
}: GradualBlurProps) {
    const blurDivs = useMemo(() => {
        const divs: React.ReactNode[] = [];
        const increment = 100 / divCount;
        const direction = getGradientDirection(position);

        for (let i = 1; i <= divCount; i++) {
            const progress = i / divCount;
            const blurValue = 0.0625 * (progress * divCount + 1) * strength;

            const p1 = Math.round((increment * i - increment) * 10) / 10;
            const p2 = Math.round(increment * i * 10) / 10;
            const p3 = Math.round((increment * i + increment) * 10) / 10;
            const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

            let gradient = `transparent ${p1}%, black ${p2}%`;
            if (p3 <= 100) gradient += `, black ${p3}%`;
            if (p4 <= 100) gradient += `, transparent ${p4}%`;

            const divStyle: CSSProperties = {
                position: "absolute",
                inset: "0",
                maskImage: `linear-gradient(${direction}, ${gradient})`,
                WebkitMaskImage: `linear-gradient(${direction}, ${gradient})`,
                backdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
                WebkitBackdropFilter: `blur(${blurValue.toFixed(3)}rem)`,
            };

            divs.push(<div key={i} style={divStyle} />);
        }

        return divs;
    }, [position, strength, divCount]);

    const containerStyle: CSSProperties = useMemo(
        () => ({
            position: target === "page" ? "fixed" : "absolute",
            pointerEvents: "none" as const,
            height,
            width: "100%",
            [position]: 0,
            left: 0,
            right: 0,
            zIndex: target === "page" ? zIndex + 100 : zIndex,
            isolation: "isolate" as const,
            ...style,
        }),
        [position, height, zIndex, target, style],
    );

    return (
        <div className={className} style={containerStyle}>
            <div style={{ position: "relative", width: "100%", height: "100%" }}>{blurDivs}</div>
        </div>
    );
}
