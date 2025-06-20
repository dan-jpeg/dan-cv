import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollableMediaWindow = ({
                                   mediaItems,
                                   onClose,
                                   className = "",
                                   columns = 1,
                                   variant = "vertical" // "vertical" or "horizontal"
                               }) => {
    const scrollContainerRef = useRef(null);
    const keysPressed = useRef(new Set());
    const animationFrameRef = useRef(null);

    // Smooth continuous scrolling while keys are held
    useEffect(() => {
        const scrollSpeed = 8; // Pixels per frame (60fps = smooth)

        const smoothScroll = () => {
            const container = scrollContainerRef.current;
            if (!container || keysPressed.current.size === 0) {
                animationFrameRef.current = null;
                return;
            }

            let deltaX = 0;
            let deltaY = 0;

            // Check which keys are currently pressed
            if (keysPressed.current.has('arrowup') || keysPressed.current.has('w')) {
                deltaY -= scrollSpeed;
            }
            if (keysPressed.current.has('arrowdown') || keysPressed.current.has('s')) {
                deltaY += scrollSpeed;
            }
            if (keysPressed.current.has('arrowleft') || keysPressed.current.has('a')) {
                deltaX -= scrollSpeed;
            }
            if (keysPressed.current.has('arrowright') || keysPressed.current.has('d')) {
                deltaX += scrollSpeed;
            }

            // Apply scrolling
            if (deltaX !== 0 || deltaY !== 0) {
                container.scrollBy(deltaX, deltaY);
            }

            // Continue the animation loop
            animationFrameRef.current = requestAnimationFrame(smoothScroll);
        };

        const handleKeyDown = (e) => {
            e.stopPropagation();

            if (e.key === 'Escape') {
                e.preventDefault();
                onClose?.();
                return;
            }

            const key = e.key.toLowerCase();
            const scrollKeys = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'];

            if (scrollKeys.includes(key)) {
                e.preventDefault();

                // Add key to pressed set
                keysPressed.current.add(key);

                // Start smooth scrolling if not already running
                if (!animationFrameRef.current) {
                    animationFrameRef.current = requestAnimationFrame(smoothScroll);
                }
            }
        };

        const handleKeyUp = (e) => {
            const key = e.key.toLowerCase();
            keysPressed.current.delete(key);

            // Stop scrolling if no keys are pressed
            if (keysPressed.current.size === 0 && animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
        };

        document.addEventListener('keydown', handleKeyDown, true);
        document.addEventListener('keyup', handleKeyUp, true);

        return () => {
            document.removeEventListener('keydown', handleKeyDown, true);
            document.removeEventListener('keyup', handleKeyUp, true);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [onClose]);

    const isVideo = (url) => {
        return url.includes('.mp4') || url.includes('.webm') || url.includes('.mov');
    };

    if (!mediaItems || mediaItems.length === 0) {
        return null;
    }

    const gridClass = columns === 2 ? 'grid-cols-2' : 'grid-cols-1';

    // Different dimensions based on variant
    const windowClasses = variant === "horizontal"
        ? "w-[100vw] h-[70vh] max-w-none"
        : "w-[90vw] h-[90vh] max-w-4xl";

    const scrollDirection = variant === "horizontal"
        ? "overflow-x-auto overflow-y-hidden"
        : "overflow-y-auto overflow-x-hidden";

    const gridLayout = variant === "horizontal"
        ? `grid-flow-col auto-cols-max gap-6`
        : `grid ${gridClass} gap-6`;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white backdrop-blur-[10px] flex justify-center items-center z-[100]"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose?.();
                }
            }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className={`bg-white ${windowClasses}  overflow-hidden relative ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Scrollable content */}
                <div
                    ref={scrollContainerRef}
                    className={`w-full h-full ${scrollDirection} p-6`}
                >
                    <div className={`grid ${gridLayout}`}>
                        {mediaItems.map((mediaItem, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.4,
                                    ease: [0.4, 0, 0.2, 1]
                                }}
                                className="flex justify-center items-center"
                            >
                                {isVideo(mediaItem.src) ? (
                                    <video
                                        className={`${variant === 'horizontal' ? 'h-full max-h-[100vh]' : 'w-full'} object-contain ${mediaItem.className || ''}`}
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="auto"
                                    >
                                        <source src={mediaItem.src} type="video/mp4" />
                                    </video>
                                ) : (
                                    <img
                                        src={mediaItem.src}
                                        alt={mediaItem.alt || `Media ${index + 1}`}
                                        className={`${variant === 'horizontal' ? 'h-full max-h-[100vh]' : 'w-full'} object-contain ${mediaItem.className || ''}`}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Controls hint */}
                <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white/90 px-3 py-1 rounded-full">
                    {variant === 'horizontal'
                        ? '←→ or A/D to scroll • ESC to close'
                        : '↑↓ or W/S to scroll • ESC to close'
                    }
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ScrollableMediaWindow;