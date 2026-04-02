"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    characters?: string;
    className?: string;
    encryptedClassName?: string;
    parentClassName?: string;
    animateOn?: "view" | "hover";
}

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()",
    className = "",
    encryptedClassName = "",
    parentClassName = "",
    animateOn = "view",
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [isDecrypted, setIsDecrypted] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);
    const revealedRef = useRef(new Set<number>());

    const availableChars = useMemo(() => characters.split(""), [characters]);

    const shuffleText = useCallback(
        (revealed: Set<number>) => {
            return text
                .split("")
                .map((char, i) => {
                    if (char === " ") return " ";
                    if (revealed.has(i)) return text[i];
                    return availableChars[Math.floor(Math.random() * availableChars.length)];
                })
                .join("");
        },
        [text, availableChars],
    );

    const triggerDecrypt = useCallback(() => {
        revealedRef.current = new Set();
        setIsDecrypted(false);
        setIsAnimating(true);
    }, []);

    useEffect(() => {
        if (!isAnimating) return;
        let iteration = 0;

        const interval = setInterval(() => {
            setDisplayText(shuffleText(revealedRef.current));
            iteration++;
            if (iteration >= maxIterations) {
                clearInterval(interval);
                setIsAnimating(false);
                setDisplayText(text);
                setIsDecrypted(true);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [isAnimating, text, speed, maxIterations, shuffleText]);

    // View observer
    useEffect(() => {
        if (animateOn !== "view") return;
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    triggerDecrypt();
                    setHasAnimated(true);
                }
            },
            { threshold: 0.1 },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [animateOn, hasAnimated, triggerDecrypt]);

    const hoverProps =
        animateOn === "hover"
            ? {
                  onMouseEnter: () => {
                      if (!isAnimating) triggerDecrypt();
                  },
                  onMouseLeave: () => {
                      setIsAnimating(false);
                      setDisplayText(text);
                      setIsDecrypted(true);
                  },
              }
            : {};

    return (
        <span ref={containerRef} className={parentClassName} style={{ whiteSpace: "pre-wrap" }} {...hoverProps}>
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
                {displayText.split("").map((char, index) => (
                    <span
                        key={index}
                        className={!isAnimating && isDecrypted ? className : revealedRef.current.has(index) ? className : encryptedClassName}
                    >
                        {char}
                    </span>
                ))}
            </span>
        </span>
    );
}
