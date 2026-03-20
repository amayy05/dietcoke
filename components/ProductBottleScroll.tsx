"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform } from "framer-motion";
import { Product } from "@/data/products";

interface BottleScrollProps {
    product: Product;
    onLoadProgress?: (progress: number) => void;
}

export default function ProductBottleScroll({ product, onLoadProgress }: BottleScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameCount = 192;

    const getImageUrl = useCallback((index: number) => {
        if (product.id === "dietcoke") {
            return `${product.folderPath}/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
        }
        if (product.id === "monster" || product.id === "redbull") {
            return `${product.folderPath}/ezgif-frame-${String(index).padStart(3, "0")}.png`;
        }
        return `${product.folderPath}/${index}.webp`;
    }, [product.id, product.folderPath]);

    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, frameCount]);

    const [imagesLoaded, setImagesLoaded] = useState(false);

    const renderFrame = useCallback((img: HTMLImageElement) => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Ensure canvas has dimensions
        if (canvas.width === 0 || canvas.height === 0) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        if (img.width === 0 || img.height === 0) return;

        const imgRatio = img.width / img.height;
        const canvasRatio = w / h;

        let drawW, drawH, drawX, drawY;

        if (imgRatio > canvasRatio) {
            drawW = h * imgRatio;
            drawH = h;
            drawX = (w - drawW) / 2;
            drawY = 0;
        } else {
            drawW = w;
            drawH = w / imgRatio;
            drawX = 0;
            drawY = (h - drawH) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }, []);

    // Initialize canvas dimensions immediately on mount
    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
        }
    }, []);

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;
        let firstFrameRendered = false;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = getImageUrl(i);
            img.onload = () => {
                loadedCount++;
                // Render first frame as soon as it loads
                if (i === 1 && !firstFrameRendered) {
                    firstFrameRendered = true;
                    renderFrame(img);
                }
                onLoadProgress?.((loadedCount / frameCount) * 100);
                if (loadedCount === frameCount) {
                    imagesRef.current = loadedImages;
                    setImagesLoaded(true);
                }
            };
            img.onerror = () => {
                loadedCount++;
                onLoadProgress?.((loadedCount / frameCount) * 100);
                if (loadedCount === frameCount) {
                    imagesRef.current = loadedImages;
                    setImagesLoaded(true);
                }
            };
            loadedImages.push(img);
        }

        return () => {
            imagesRef.current = [];
            setImagesLoaded(false);
        };
    }, [product, getImageUrl, renderFrame, onLoadProgress, frameCount]);

    // Subscribe to scroll changes
    useEffect(() => {
        if (!imagesLoaded) return;

        const unsubscribe = frameIndex.on("change", (latest: number) => {
            const idx = Math.min(
                frameCount - 1,
                Math.max(0, Math.floor(latest) - 1)
            );
            const img = imagesRef.current[idx];
            if (img && img.complete && img.naturalWidth > 0) {
                requestAnimationFrame(() => renderFrame(img));
            }
        });

        // Render current frame immediately
        const currentIdx = Math.min(
            frameCount - 1,
            Math.max(0, Math.floor(frameIndex.get()) - 1)
        );
        const currentImg = imagesRef.current[currentIdx];
        if (currentImg && currentImg.complete && currentImg.naturalWidth > 0) {
            renderFrame(currentImg);
        }

        return () => unsubscribe();
    }, [imagesLoaded, frameIndex, frameCount, renderFrame]);

    // Handle resize - always active, not dependent on images
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;

                // Re-render current frame if images are loaded
                if (imagesRef.current.length > 0) {
                    const currentIdx = Math.min(
                        frameCount - 1,
                        Math.max(0, Math.floor(frameIndex.get()) - 1)
                    );
                    const img = imagesRef.current[currentIdx];
                    if (img && img.complete && img.naturalWidth > 0) {
                        renderFrame(img);
                    }
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [frameIndex, frameCount, renderFrame]);

    return (
        <div ref={containerRef} className="h-[500vh] w-full relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain mix-blend-normal"
                />
            </div>
        </div>
    );
}

