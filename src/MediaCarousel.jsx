import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MediaCarousel = ({ mediaItems, onClose, className = "" }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === '[' || e.key === '{') {
                e.preventDefault();
                e.stopPropagation();
                goToPrevious();
            } else if (e.key === ']' || e.key === '}') {
                e.preventDefault();
                e.stopPropagation();
                goToNext();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                e.stopPropagation();
                onClose?.();
            }
        };

        document.addEventListener('keydown', handleKeyPress, true);
        return () => document.removeEventListener('keydown', handleKeyPress, true);
    }, [currentIndex, mediaItems.length, onClose]);

    const goToNext = () => {
        if (currentIndex < mediaItems.length - 1) {
            setDirection(1);
            setCurrentIndex(prev => prev + 1);
        }
    };

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setDirection(-1);
            setCurrentIndex(prev => prev - 1);
        }
    };

    const isVideo = (url) => {
        return url.includes('.mp4') || url.includes('.webm') || url.includes('.mov') || url.includes('video');
    };

    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 400 : -400,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1]
            }
        },
        exit: (direction) => ({
            x: direction < 0 ? 400 : -400,
            opacity: 0,
            scale: 0.9,
            transition: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
            }
        })
    };

    if (!mediaItems || mediaItems.length === 0) {
        return null;
    }

    const currentMedia = mediaItems[currentIndex];

    return (
        <div
            className={`w-full h-full flex justify-center items-center relative ${className}`}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            {/* Media Display - Full Size */}
            <div className="w-full h-full flex justify-center items-center overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="w-full h-full flex justify-center items-center"
                    >
                        {isVideo(currentMedia.src) ? (
                            <video
                                className={`w-full h-full max-h-[61vh] object-contain ${currentMedia.className || ''}`}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="auto"
                            >
                                <source src={currentMedia.src} type="video/mp4" />
                            </video>
                        ) : (
                            <img
                                src={currentMedia.src}
                                alt={currentMedia.alt || `Media ${currentIndex + 1}`}
                                className={`w-full h-full max-h-[61vh] object-contain ${currentMedia.className || ''}`}
                            />
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MediaCarousel;