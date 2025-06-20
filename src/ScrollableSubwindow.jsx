import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollableMediaWindow = ({ mediaItems, onClose, className = "", columns = 1 }) => {
    const scrollContainerRef = useRef(null);

    // Keyboard navigation with scrolling
    useEffect(() => {
        const handleKeyPress = (e) => {
            // Stop all events from reaching the main app
            e.stopPropagation();

            // Handle ESC to close
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose?.();
                return;
            }

            // Handle scrolling with arrow keys and WASD
            const container = scrollContainerRef.current;
            if (!container) return;

            const scrollAmount = 120;
            const key = e.key.toLowerCase();

            if (key === 'arrowup' || key === 'w') {
                e.preventDefault();
                container.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
            } else if (key === 'arrowdown' || key === 's') {
                e.preventDefault();
                container.scrollBy({ top: scrollAmount, behavior: 'smooth' });
            } else if (key === 'arrowleft' || key === 'a') {
                e.preventDefault();
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else if (key === 'arrowright' || key === 'd') {
                e.preventDefault();
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        };

        document.addEventListener('keydown', handleKeyPress, true);
        return () => document.removeEventListener('keydown', handleKeyPress, true);
    }, [onClose]);

    const isVideo = (url) => {
        return url.includes('.mp4') || url.includes('.webm') || url.includes('.mov');
    };

    if (!mediaItems || mediaItems.length === 0) {
        return null;
    }

    const gridClass = columns === 2 ? 'grid-cols-2' : 'grid-cols-1';

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-[100]"
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
                className={`bg-white w-[90vw] h-[80vh] max-w-4xl rounded-lg shadow-2xl overflow-hidden relative ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Scrollable content */}
                <div
                    ref={scrollContainerRef}
                    className="w-full h-full overflow-y-auto overflow-x-hidden p-6"
                >
                    <div className={`grid ${gridClass} gap-6`}>
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
                                className="flex justify-center"
                            >
                                {isVideo(mediaItem.src) ? (
                                    <video
                                        className={`w-full object-contain ${mediaItem.className || ''}`}
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
                                        className={`w-full object-contain ${mediaItem.className || ''}`}
                                    />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Controls hint */}
                <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-white/90 px-3 py-1 rounded-full">
                    ↑↓ or W/S to scroll • ESC to close
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ScrollableMediaWindow;