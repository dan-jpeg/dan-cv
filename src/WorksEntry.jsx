import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MediaCarousel from "./MediaCarousel.jsx";

// Additional content arrays for each component
const jxuAdditionalImages = [
    {
        src: "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/JXU-FRAMES.png?alt=media&token=5873e562-b689-45a9-80b9-4379192e6f85",
        className: "w-full max-w-[500px] object-contain"
    },
    {
        src: "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/jxu-archive-grid.png?alt=media&token=876a72de-5ea5-4e9e-98e2-4e75ff655210",
        className: "w-full max-w-[500px] object-contain"
    }
];

const edieAdditionalImages = [
    {
        src: "https://placeholder-url-3.com",
        className: "w-full max-w-[250px] object-contain"
    },
    {
        src: "https://placeholder-url-4.com",
        className: "w-full max-w-[180px] object-contain"
    },
    {
        src: "https://placeholder-url-5.com",
        className: "w-full max-w-[220px] object-contain"
    }
];

const newAdditionalImages = [
    {
        src: "https://placeholder-url-6.com",
        className: "w-full max-w-[280px] object-contain"
    },
    {
        src: "https://placeholder-url-7.com",
        className: "w-full max-w-[160px] object-contain"
    }
];

const hausAdditionalImages = [
    {
        src: "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/haus-closeup.PNG?alt=media&token=d337d182-d580-4cc4-be96-347e4b9f1ef8",
        className: "w-full max-w-[600px] object-contain"
    },
    {
        src: "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/haus-6.PNG?alt=media&token=2ca4e731-535b-4548-8391-5cea9dca288f",
        className: "w-full max-w-[500px] object-contain"
    },
    {
        src: "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/haus-5.PNG?alt=media&token=8d17e857-b591-437b-ba5a-c6fc2e0118b4",
        className: "w-full max-w-[240px] object-contain"
    },

];

const hausmediaItems = [
    {
        src: "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/haus-6.PNG?alt=media&token=2ca4e731-535b-4548-8391-5cea9dca288f",
        className: "max-w-[600px]", // Custom sizing
        alt: "Description"
    },
    {
        src: "https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/Sequence%2002.mp4?alt=media&token=83f023f8-b05a-4eb1-8293-8c961668a68d",
        className: "max-w-[700px]",
        alt: "Video description"
    }
];

const unionAdditionalImages = [
    {
        src: "https://placeholder-url-11.com",
        className: "w-full max-w-[260px] object-contain"
    },
    {
        src: "https://placeholder-url-12.com",
        className: "w-full max-w-[190px] object-contain"
    }
];

const lapresAdditionalImages = [
    {
        src: "https://placeholder-url-13.com",
        className: "w-full max-w-[200px] object-contain"
    },
    {
        src: "https://placeholder-url-14.com",
        className: "w-full max-w-[300px] object-contain"
    },
    {
        src: "https://placeholder-url-15.com",
        className: "w-full max-w-[150px] object-contain"
    }
];

// Reusable hook for preloading images
const useImagePreloader = (imageObjects) => {
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        if (!imageObjects || imageObjects.length === 0) {
            setImagesLoaded(true);
            return;
        }

        const preloadImages = async () => {
            const imagePromises = imageObjects.map((imageObj) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = reject;
                    img.src = imageObj.src;
                });
            });

            try {
                await Promise.all(imagePromises);
                setImagesLoaded(true);
            } catch (error) {
                console.error('Failed to preload images:', error);
                setImagesLoaded(true);
            }
        };

        preloadImages();
    }, [imageObjects]);

    return imagesLoaded;
};

// Reusable transition animations
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

const contentTransitions = {
    initial: { opacity: 0, y: 20, scale: 0.9 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
    }
};

const WorksEntry = () => {
    const [showAdditional, setShowAdditional] = useState(false);
    const imagesLoaded = useImagePreloader(jxuAdditionalImages);

    return (
        <div className="w-full mb-0 md:max-w-screen-md lg:max-w-screen-lg flex justify-center items-center h-screen relative overflow-hidden">
            <AnimatePresence mode="wait">
                {!showAdditional ? (
                    <motion.video
                        key="video"
                        {...videoTransitions}
                        className="w-full transform h-full max-h-[60vh] justify-self-center object-contain cursor-pointer"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onClick={() => imagesLoaded && setShowAdditional(true)}
                    >
                        <source src="https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/videos/jxu-preview.mp4" type="video/mp4" />
                    </motion.video>
                ) : (
                    <motion.div
                        key="additional"
                        {...contentTransitions}
                        className="flex flex-row justify-center gap-4 cursor-pointer"
                        onClick={() => setShowAdditional(false)}
                    >
                        {jxuAdditionalImages.map((imageObj, idx) => (
                            <img
                                key={idx}
                                src={imageObj.src}
                                alt={`jxu-additional-${idx + 1}`}
                                className={imageObj.className}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WorksEntry;

export const WorksEntryEdie = () => {
    const [showAdditional, setShowAdditional] = useState(false);
    const imagesLoaded = useImagePreloader(edieAdditionalImages);

    return (
        <div className="w-full mb-0 max-w-[850px] flex justify-center items-center h-screen relative overflow-hidden">
            <AnimatePresence mode="wait">
                {!showAdditional ? (
                    <motion.video
                        key="video"
                        {...videoTransitions}
                        className="w-full h-full max-h-[61vh] object-contain cursor-pointer"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onClick={() => imagesLoaded && setShowAdditional(true)}
                    >
                        <source src="https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/videos/edie-sample.mp4" type="video/mp4"/>
                    </motion.video>
                ) : (
                    <motion.div
                        key="additional"
                        {...contentTransitions}
                        className="flex flex-row justify-center gap-4 cursor-pointer"
                        onClick={() => setShowAdditional(false)}
                    >
                        {edieAdditionalImages.map((imageObj, idx) => (
                            <img
                                key={idx}
                                src={imageObj.src}
                                alt={`edie-additional-${idx + 1}`}
                                className={imageObj.className}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const WorksEntryNew = () => {
    const [showAdditional, setShowAdditional] = useState(false);
    const imagesLoaded = useImagePreloader(newAdditionalImages);

    return (
        <div className="w-full mb-0 max-w-[850px] flex justify-center items-center h-screen relative overflow-hidden">
            <AnimatePresence mode="wait">
                {!showAdditional ? (
                    <motion.img
                        key="image"
                        {...videoTransitions}
                        className="w-full h-full max-h-[61vh] object-contain cursor-pointer"
                        alt="jxu archive grid"
                        src="https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/jxu-archive-grid.png?alt=media&token=876a72de-5ea5-4e9e-98e2-4e75ff655210"
                        onClick={() => imagesLoaded && setShowAdditional(true)}
                    />
                ) : (
                    <motion.div
                        key="additional"
                        {...contentTransitions}
                        className="flex flex-row justify-center gap-4 cursor-pointer"
                        onClick={() => setShowAdditional(false)}
                    >
                        {newAdditionalImages.map((imageObj, idx) => (
                            <img
                                key={idx}
                                src={imageObj.src}
                                alt={`new-additional-${idx + 1}`}
                                className={imageObj.className}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const WorksEntryHaus = () => {
    const [showAdditional, setShowAdditional] = useState(false);
    const imagesLoaded = useImagePreloader(hausAdditionalImages);

    const mediaItems = [
        {
            src: "image-url.png",
            className: "max-w-[600px]", // Custom sizing
            alt: "Description"
        },
        {
            src: "video-url.mp4",
            className: "max-w-[700px]",
            alt: "Video description"
        }
    ];

    return (
        <div className="w-full mb-0 max-w-[850px] flex justify-center items-center h-screen relative overflow-hidden ">
            <AnimatePresence mode="wait">
                {!showAdditional ? (
                    <motion.video
                        key="video"
                        {...videoTransitions}
                        className="w-full h-full max-h-[61vh] object-contain cursor-pointer"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onClick={() => imagesLoaded && setShowAdditional(true)}
                    >
                        <source src="https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/Sequence%2002.mp4?alt=media&token=83f023f8-b05a-4eb1-8293-8c961668a68d" type="video/mp4"/>
                    </motion.video>
                ) : (


                    <motion.div
                        key="additional"
                        {...contentTransitions}
                        className="flex flex-col justify-center gap-4 cursor-pointer"
                        onClick={() => setShowAdditional(false)}
                    >
                        {hausAdditionalImages.map((imageObj, idx) => (
                            <img
                                key={idx}
                                src={imageObj.src}
                                alt={`haus-additional-${idx + 1}`}
                                className={imageObj.className}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const WorksEntryUnion = () => {
    const [showAdditional, setShowAdditional] = useState(false);
    const imagesLoaded = useImagePreloader(unionAdditionalImages);

    return (
        <div className="w-full mb-0 max-w-[850px] flex justify-center items-center h-screen relative overflow-hidden">
            <AnimatePresence mode="wait">
                {!showAdditional ? (
                    <motion.video
                        key="video"
                        {...videoTransitions}
                        className="w-full h-full scale-[2.5] md:scale-[1.5] xl:scale-[1.5] max-h-[61vh] object-contain cursor-pointer"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onClick={() => imagesLoaded && setShowAdditional(true)}
                    >
                        <source src="https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/swivel-v2.mp4?alt=media&token=f13a6b4c-54a8-4090-92f4-8b6c47dc1043" type="video/mp4"/>
                    </motion.video>
                ) : (
                    <motion.div
                        key="additional"
                        {...contentTransitions}
                        className="flex flex-row justify-center gap-4 cursor-pointer"
                        onClick={() => setShowAdditional(false)}
                    >
                        {unionAdditionalImages.map((imageObj, idx) => (
                            <img
                                key={idx}
                                src={imageObj.src}
                                alt={`union-additional-${idx + 1}`}
                                className={imageObj.className}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const WorksEntryLapres2 = () => {
    const [showAdditional, setShowAdditional] = useState(false);
    const imagesLoaded = useImagePreloader(lapresAdditionalImages);

    return (
        <div className="w-full mb-0 max-w-[850px] flex justify-center items-center h-screen relative overflow-hidden">
            <AnimatePresence mode="wait">
                {!showAdditional ? (
                    <motion.video
                        key="video"
                        {...videoTransitions}
                        className="w-full h-full scale-[2.5] md:scale-[1.5] xl:scale-[1.5] max-h-[61vh] object-contain cursor-pointer"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                        onClick={() => imagesLoaded && setShowAdditional(true)}
                    >
                        <source src="https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/white-bg.mp4?alt=media&token=c73e53fa-0f71-4569-a947-743a80d7c318" type="video/mp4"/>
                    </motion.video>
                ) : (
                    <motion.div
                        key="additional"
                        {...contentTransitions}
                        className="flex flex-row justify-center gap-4 cursor-pointer"
                        onClick={() => setShowAdditional(false)}
                    >
                        {lapresAdditionalImages.map((imageObj, idx) => (
                            <img
                                key={idx}
                                src={imageObj.src}
                                alt={`lapres-additional-${idx + 1}`}
                                className={imageObj.className}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const WorksEntryLapres = () => {
    const [showAdditional, setShowAdditional] = useState(false);
    const imagesLoaded = useImagePreloader(lapresAdditionalImages);

    return (
        <div className="w-full mb-0 max-w-[850px] flex justify-center items-center h-screen relative overflow-hidden">
            <AnimatePresence mode="wait">
                {!showAdditional ? (
                    <motion.div
                        key="images"
                        {...videoTransitions}
                        className="flex scale-[0.66] justify-center items-center md:scale-100 flex-row -gap-x-[1] cursor-pointer"
                        onClick={() => imagesLoaded && setShowAdditional(true)}
                    >
                        <img
                            className="w-full h-full max-h-[61vh] object-contain"
                            alt="lapres 3"
                            src="https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/lapres-3.png?alt=media&token=73c364e9-6ae8-4e32-94bc-2924734a468d"
                        />
                        <img
                            className="w-full h-full max-h-[61vh] object-contain"
                            alt="lapres 2"
                            src="https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/lapres-2.png?alt=media&token=3bbbe66b-34f6-404f-939d-0899643c7c44"
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key="additional"
                        {...contentTransitions}
                        className="flex flex-row justify-center gap-4 cursor-pointer"
                        onClick={() => setShowAdditional(false)}
                    >
                        {lapresAdditionalImages.map((imageObj, idx) => (
                            <img
                                key={idx}
                                src={imageObj.src}
                                alt={`lapres-additional-${idx + 1}`}
                                className={imageObj.className}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
