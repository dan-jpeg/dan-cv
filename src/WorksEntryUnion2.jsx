import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const unionTeasers = [
    "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/union-teaser-1.png?alt=media&token=8ccd4321-5257-4d05-af18-b15aa5a129e4",
    "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/union-teaser-2.png?alt=media&token=4b097ae2-41f1-47c6-adc1-e40e8c42974b",
    "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/union-teaser%203.png?alt=media&token=7e84276b-451f-46b6-9dba-787c05381853",
    "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/union-teaser-4.png?alt=media&token=67957970-52bf-40f6-8aae-fa4cc2d13786"
];

export const WorksEntryUnion2 = () => {
    const [showMockups, setShowMockups] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Preload all images
    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = unionTeasers.map((src) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = src;
                });
            });

            try {
                await Promise.all(imagePromises);
                setImagesLoaded(true);
            } catch (error) {
                console.error('Failed to preload images:', error);
                setImagesLoaded(true); // Still allow interaction even if some images fail
            }
        };

        preloadImages();
    }, []);

    return (
        <div className="w-full mb-0 max-w-[850px] flex justify-center items-center h-screen relative overflow-hidden">
            <AnimatePresence mode="wait">
                {!showMockups ? (
                    <motion.video
                        key="video"
                        initial={{ opacity: 1, scale: 1 }}
                        exit={{
                            opacity: 0,
                            scale: 0.95,
                            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                        }}
                        className="w-full h-full max-h-[61vh] object-contain cursor-pointer"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onClick={() => imagesLoaded && setShowMockups(true)}
                    >
                        <source
                            src="https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/Sequence%2001.mp4?alt=media&token=91c4d022-e484-42cd-9201-4ec54e5b2f93"
                            type="video/mp4"
                        />
                    </motion.video>
                ) : (
                    <motion.div
                        key="mockups"
                        initial={{
                            opacity: 0,
                            y: 20,
                            scale: 0.9
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                                duration: 0.5,
                                ease: [0.4, 0, 0.2, 1]
                            }
                        }}
                        className="flex flex-row justify-center gap-4 cursor-pointer"
                        onClick={() => setShowMockups(false)}
                    >
                        {unionTeasers.map((src, idx) => (
                            <img
                                key={idx}
                                src={src}
                                alt={`union-teaser-${idx + 1}`}
                                className="w-full max-w-[200px] object-contain"
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};