"use client";

import { useRef, useEffect, useCallback, useMemo } from "react";

interface DotGridProps {
    dotSize?: number;
    gap?: number;
    baseColor?: string;
    shockRadius?: number;
    shockStrength?: number;
    resistance?: number;
    returnDuration?: number;
    className?: string;
}

interface Dot {
    cx: number;
    cy: number;
    xOffset: number;
    yOffset: number;
    vx: number;
    vy: number;
}

export default function DotGrid({
    dotSize = 4,
    gap = 5,
    baseColor = "rgba(183,95,255,0.3)",
    shockRadius = 460,
    shockStrength = 10,
    resistance = 1250,
    returnDuration = 3.1,
    className = "",
}: DotGridProps) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dotsRef = useRef<Dot[]>([]);
    const pointerRef = useRef({ x: -9999, y: -9999 });

    const buildGrid = useCallback(() => {
        const wrap = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;

        const { width, height } = wrap.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr);

        const cell = dotSize + gap;
        const cols = Math.floor((width + gap) / cell);
        const rows = Math.floor((height + gap) / cell);
        const gridW = cell * cols - gap;
        const gridH = cell * rows - gap;
        const startX = (width - gridW) / 2 + dotSize / 2;
        const startY = (height - gridH) / 2 + dotSize / 2;

        const dots: Dot[] = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                dots.push({
                    cx: startX + x * cell,
                    cy: startY + y * cell,
                    xOffset: 0,
                    yOffset: 0,
                    vx: 0,
                    vy: 0,
                });
            }
        }
        dotsRef.current = dots;
    }, [dotSize, gap]);

    useEffect(() => {
        buildGrid();
        const ro = new ResizeObserver(buildGrid);
        if (wrapperRef.current) ro.observe(wrapperRef.current);
        return () => ro.disconnect();
    }, [buildGrid]);

    // Animation loop
    useEffect(() => {
        let rafId: number;
        const spring = 1 / returnDuration;
        const damping = resistance / 10000;

        const draw = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) { rafId = requestAnimationFrame(draw); return; }
            const dpr = window.devicePixelRatio || 1;
            ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

            const r = dotSize / 2;

            for (const dot of dotsRef.current) {
                // Spring physics: pull back to center
                const fx = -spring * dot.xOffset;
                const fy = -spring * dot.yOffset;
                dot.vx = (dot.vx + fx) * (1 - damping);
                dot.vy = (dot.vy + fy) * (1 - damping);
                dot.xOffset += dot.vx;
                dot.yOffset += dot.vy;

                // Snap if close enough
                if (Math.abs(dot.xOffset) < 0.01 && Math.abs(dot.vx) < 0.01) {
                    dot.xOffset = 0;
                    dot.vx = 0;
                }
                if (Math.abs(dot.yOffset) < 0.01 && Math.abs(dot.vy) < 0.01) {
                    dot.yOffset = 0;
                    dot.vy = 0;
                }

                ctx.beginPath();
                ctx.arc(dot.cx + dot.xOffset, dot.cy + dot.yOffset, r, 0, Math.PI * 2);
                ctx.fillStyle = baseColor;
                ctx.fill();
            }

            rafId = requestAnimationFrame(draw);
        };

        rafId = requestAnimationFrame(draw);
        return () => cancelAnimationFrame(rafId);
    }, [dotSize, baseColor, returnDuration, resistance]);

    // Click shockwave
    useEffect(() => {
        const onClick = (e: MouseEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const cx = e.clientX - rect.left;
            const cy = e.clientY - rect.top;

            for (const dot of dotsRef.current) {
                const dx = dot.cx - cx;
                const dy = dot.cy - cy;
                const dist = Math.hypot(dx, dy);
                if (dist < shockRadius && dist > 0) {
                    const falloff = Math.max(0, 1 - dist / shockRadius);
                    const angle = Math.atan2(dy, dx);
                    dot.vx += Math.cos(angle) * shockStrength * falloff;
                    dot.vy += Math.sin(angle) * shockStrength * falloff;
                }
            }
        };

        // Mouse proximity push
        const onMove = (e: MouseEvent) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;
            pointerRef.current = { x: mx, y: my };

            const pushRadius = 80;
            const pushStrength = 0.8;
            for (const dot of dotsRef.current) {
                const dx = dot.cx + dot.xOffset - mx;
                const dy = dot.cy + dot.yOffset - my;
                const dist = Math.hypot(dx, dy);
                if (dist < pushRadius && dist > 0) {
                    const falloff = 1 - dist / pushRadius;
                    const angle = Math.atan2(dy, dx);
                    dot.vx += Math.cos(angle) * pushStrength * falloff;
                    dot.vy += Math.sin(angle) * pushStrength * falloff;
                }
            }
        };

        window.addEventListener("click", onClick);
        window.addEventListener("mousemove", onMove, { passive: true });
        return () => {
            window.removeEventListener("click", onClick);
            window.removeEventListener("mousemove", onMove);
        };
    }, [shockRadius, shockStrength]);

    return (
        <div className={`absolute inset-0 ${className}`}>
            <div ref={wrapperRef} className="h-full w-full">
                <canvas ref={canvasRef} className="block h-full w-full" />
            </div>
        </div>
    );
}
