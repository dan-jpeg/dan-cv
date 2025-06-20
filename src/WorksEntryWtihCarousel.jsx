import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MediaCarousel from './MediaCarousel'; // Import the carousel

// Example: Modified WorksEntryHaus with carousel
const hausCarouselMedia = [
    {
        src: "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/haus-closeup.PNG?alt=media&token=d337d182-d580-4cc4-be96-347e4b9f1ef8",
        className: "max-w-[600px]",
        alt: "Haus closeup view"
    },
    {
        src: "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/haus-6.PNG?alt=media&token=2ca4e731-535b-4548-8391-5cea9dca288f",
        className: "max-w-[500px]",
        alt: "Haus interface 6"
    },
    {
        src: "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/haus-5.PNG?alt=media&token=8d17e857-b591-437b-ba5a-c6fc2e0118b4",
        className: "max-w-[400px]",
        alt: "Haus interface 5"
    },
    {
        src: "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/videos/example-video.mp4", // Example video
        className: "max-w-[700px]",
        alt: "Haus demo video"
    }
];

// Reusable hook for preloading carousel media
const useCarouselPreloader = (mediaItems) => {
    const [mediaLoaded, setMediaLoaded] = useState(false);

    useEffect(() => {
        if (!mediaItems || mediaItems.length === 0) {
            setMediaLoaded(true);
            return;
        }

        const preloadMedia = async () => {
            const mediaPromises = mediaItems.map((mediaItem) => {
                return new Promise((resolve, reject) => {
                    if (mediaItem.src.includes('.mp4') || mediaItem.src.includes('.webm')) {
                        // For videos, just resolve immediately since preloading video can be heavy
                        resolve();
                    } else {
                        // For images, preload as usual
                        const img = new Image();
                        img.onload = resolve;
                        img.onerror = reject;
                        img.src = mediaItem.src;
                    }
                });
            });

            try {
                await Promise.all(mediaPromises);
                setMediaLoaded(true);
            } catch (error) {
                console.error('Failed to preload media:', error);
                setMediaLoaded(true);
            }
        };

        preloadMedia();
    }, [mediaItems]);

    return mediaLoaded;
};

const videoTransitions = {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
    }
};

const carouselTransitions = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
};

export const WorksEntryHausWithCarousel = () => {
    const [showCarousel, setShowCarousel] = useState(false);
    const mediaLoaded = useCarouselPreloader(hausCarouselMedia);

    return (
        <div className="w-full mb-0 max-w-[850px] flex justify-center items-center h-screen relative overflow-hidden">
            <AnimatePresence mode="wait">
                {!showCarousel ? (
                    <motion.video
                        key="video"
                        {...videoTransitions}
                        className="w-full h-full max-h-[61vh] object-contain cursor-pointer"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onClick={() => mediaLoaded && setShowCarousel(true)}
                    >
                        <source src="https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/Sequence%2002.mp4?alt=media&token=83f023f8-b05a-4eb1-8293-8c961668a68d" type="video/mp4"/>
                    </motion.video>
                ) : (
                    <motion.div
                        key="carousel"
                        {...carouselTransitions}
                        className="w-full h-full"
                    >
                        <MediaCarousel
                            mediaItems={hausCarouselMedia}
                            onClose={() => setShowCarousel(false)}
                            className="cursor-pointer"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Alternative: Simple integration example for any WorksEntry
export const createWorksEntryWithCarousel = (videoSrc, carouselMedia, maxWidth = "[850px]") => {
    return () => {
        const [showCarousel, setShowCarousel] = useState(false);
        const mediaLoaded = useCarouselPreloader(carouselMedia);

        return (
            <div className={`w-full mb-0 max-w-${maxWidth} flex justify-center items-center h-screen relative overflow-hidden`}>
                <AnimatePresence mode="wait">
                    {!showCarousel ? (
                        <motion.video
                            key="video"
                            {...videoTransitions}
                            className="w-full h-full max-h-[61vh] object-contain cursor-pointer"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            onClick={() => mediaLoaded && setShowCarousel(true)}
                        >
                            <source src={videoSrc} type="video/mp4"/>
                        </motion.video>
                    ) : (
                        <motion.div
                            key="carousel"
                            {...carouselTransitions}
                            className="w-full h-full"
                        >
                            <MediaCarousel
                                mediaItems={carouselMedia}
                                onClose={() => setShowCarousel(false)}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };
};