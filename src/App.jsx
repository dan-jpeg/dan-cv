import React, { useState, useRef, useEffect } from 'react';
import arrow from '/src/assets/arrow_14.svg';
import linkArrow from '/src/assets/link-arrow-test.svg';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, animate } from 'framer-motion';
import SkillsTab from "./SkillsTab2.jsx";
import { colorSchemes } from './colorSchemes';
import WorksEntry, {WorksEntryEdie, WorksEntryNew, WorksEntryHaus, WorksEntryUnion, WorksEntryLapres, WorksEntryLapres2} from "./WorksEntry.jsx";
import {WorksEntryUnion2} from "./WorksEntryUnion2.jsx";
import {WorksEntryHausWithCarousel} from "./WorksEntryWtihCarousel.jsx";
import navArrow from '/src/assets/small-arrow.svg'
import {WorksEntryHausScrollable, WorksEntryHausWithScrollableWindow} from "./WorksEntryWithScrollable.jsx";

const NavArrow = ({ isVisible, onClick }) => {
    const [isScrolling, setScrolling] = useState(false);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="fixed top-20 right-1/2 transform -translate-x-full cursor-pointer z-50"
                    onClick={onClick}
                >
                    <img
                        src={navArrow}
                        alt="navigation arrow"
                        className="w-10 h-8 m-0 p-0 rotate-90"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const Header = ({workOpen, skillsOpen, isTransitioning, setIsTransitioning,setIsScrolling, isScrolling }) => {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleArrowClick = async () => {
        setIsScrolling(true);
        handleScrollToTop();
        await new Promise(resolve => setTimeout(resolve, 1300));
        setIsScrolling(false);
    };

    return (
        <div
            className={`flex justify-between w-screen font-bold ${isScrolling ? "opacity-0" : ""} px-6 fixed top-4 z-50 font-['Neue Haas Grotesk Display Pro'] text-[18px] md:text-[24px] transition duration-0`}>
            <span className="text"> DANIEL CROWLEY</span>

            <motion.div
                className={`fixed top-4 left-1/2 m-0 p-0 transform -translate-x-1/2 cursor-pointer ${isScrolling ? 'opacity-0' : 'opacity-100'}`}
                onClick={handleArrowClick}
            >
                <img
                    src={navArrow}
                    alt="navigation arrow"
                    className="w-8 h-8 m-0 p-0 rotate-180"
                />
            </motion.div>

            <span className="text"> CV</span>
        </div>
    )
}

const WorkInfoTitle = ({scrollPosition, isVisible, title, url}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleLinkClick = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed left-1/2 z-20 transform -translate-x-1/2 bottom-6">
                    <motion.div
                        initial={{opacity: 1, y: 60}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 45}}
                        transition={{delay: 0.2, ease: "linear", duration: 0.142}}
                        className="font-['Neue Haas Grotesk Display Pro'] font-bold text-[18px] md:text-[24px] relative inline-block"
                    >
                        {title}
                        <motion.div
                            className="absolute top-1/2 -translate-y-1/2 -right-12 cursor-pointer"
                            animate={{ opacity: isHovered ? 0.7 : 0.3 }}
                            whileHover={{ opacity: 0.7 }}
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                            onClick={handleLinkClick}
                        >
                            <img
                                className="w-6 h-6"
                                src={linkArrow}
                                alt="link arrow"
                            />
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function App() {
    const [isFlashing, setIsFlashing] = useState(false);
    const [workOpen, setWorkOpen] = useState(false);
    const [skillsOpen, setSkillsOpen] = useState(false);
    const [colorScheme, setColorScheme] = useState('default');
    const [scrollPosition, setScrollPosition] = useState(0);
    const { scrollY } = useScroll();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [currentWorkIndex, setCurrentWorkIndex] = useState(0);
    const [direction, setDirection] = useState('');
    const [nextWorkIndex, setNextWorkIndex] = useState(null);
    const [isMediaWindowOpen, setIsMediaWindowOpen] = useState(false);

    // States for arrow flashing
    const [leftArrowFlashing, setLeftArrowFlashing] = useState(false);
    const [rightArrowFlashing, setRightArrowFlashing] = useState(false);

    // Use useEffect to handle index change after direction is set
    React.useEffect(() => {
        if (nextWorkIndex !== null) {
            setCurrentWorkIndex(nextWorkIndex);
            setNextWorkIndex(null);
        }
    }, [nextWorkIndex]);

    const [isScrolling, setIsScrolling] = useState(false);

    const scrollTo = async (target) => {
        await animate(window.scrollY, target, {
            duration: 0.2,
            type: "tween",
            ease: "easeInOut",
            onUpdate: latest => window.scrollTo(0, latest)
        })
    }

    const works = [
        {
            id: 1,
            component: WorksEntry,
            title: "OFFICE OF JING YI XU",
            url: "https://jxu.netlify.app/"
        },
        {
            id: 2,
            component: WorksEntryEdie,
            title: "ARTIST PORTFOLIO: EDIE XU",
            url: "https://statuesque-mochi-dbb890.netlify.app/"
        },
        {
            id: 3,
            component: WorksEntryHausWithCarousel,
            title: "ARCHIVE VIEW-JXU",
            url: "https://ABC-mochi-dbb890.netlify.app/"
        },
        {
            id: 4,
            component: WorksEntryHaus,
            title: "HAUS PROTOTYPE",
            url: "https://ABC-mochi-dbb890.netlify.app/"
        },
        {
            id: 5,
            component: WorksEntryUnion,
            title: "HAUS PROTOTYPE",
            url: "https://ABC-mochi-dbb890.netlify.app/"
        },
        {
            id: 6,
            component: WorksEntryUnion2,
            title: "HAUS PROTOTYPE",
            url: "https://ABC-mochi-dbb890.netlify.app/"
        },
        {
            id: 7,
            component: WorksEntryLapres,
            title: "L'APRES COFFEE JOURNAL",
            url: "https://ABC-mochi-dbb890.netlify.app/"
        },
        {
            id: 8,
            component: WorksEntryLapres2,
            title: "L'APRES COFFEE JOURNAL",
            url: "https://ABC-mochi-dbb890.netlify.app/"
        },
        {
            id: 9,
            component: WorksEntryHausScrollable,
            title: "ARCHIVE VIEW-JXU",
            url: "https://ABC-mochi-dbb890.netlify.app/"
        }
    ];

    // Flash effect helper function
    const flashArrow = async (setFlashState) => {
        setFlashState(true);
        await new Promise(resolve => setTimeout(resolve, 150));
        setFlashState(false);
    };

    // Navigation functions for bidirectional movement
    const handleWorkNavRight = () => {
        if (currentWorkIndex < works.length - 1) {
            setDirection('right');
            setNextWorkIndex(currentWorkIndex + 1);
            flashArrow(setRightArrowFlashing);
        }
    };

    const handleWorkNavLeft = () => {
        if (currentWorkIndex > 0) {
            setDirection('left');
            setNextWorkIndex(currentWorkIndex - 1);
            flashArrow(setLeftArrowFlashing);
        }
    };

    const shouldShowWorkInfo = workOpen && scrollPosition > window.innerHeight / 2;

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrollPosition(latest);

        if (!isTransitioning && latest < 50) {
            if (workOpen) {
                handleWorkClose();
                setDirection('')
                setCurrentWorkIndex(0)
            }
            if (skillsOpen) handleSkillsClose();
        }
    });

    const workSectionRef = useRef(null);
    const skillsSectionRef = useRef(null);

    const glitchEffect = async () => {
        setColorScheme('studio');
        await new Promise(resolve => setTimeout(resolve, window.safari ? 400 : 220));
        setColorScheme('default');
    }

    const handleWorkClick = async () => {
        setDirection('');
        setIsTransitioning(true);
        setWorkOpen(true);

        glitchEffect()

        await new Promise(resolve => setTimeout(resolve, 122));

        const element = workSectionRef.current;
        if (element) {
            await animate(window.scrollY, element.offsetTop, {
                duration: 0.4,
                type: "tween",
                ease: "easeOut",
                onUpdate: latest => window.scrollTo(0, latest)
            });
        }
        setIsTransitioning(false);
    }

    const handleWorkClose = async () => {
        setColorScheme('default');
        setIsTransitioning(true)

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        await new Promise(resolve => setTimeout(resolve, 250));
        setWorkOpen(false);
        setIsTransitioning(false)
    };

    const handleSkillsClick = async () => {
        setIsTransitioning(true);
        setSkillsOpen(true);

        await new Promise(resolve => setTimeout(resolve, 10));

        const element = skillsSectionRef.current;
        if (element) {
            await animate(window.scrollY, element.offsetTop, {
                duration: 0.4,
                type: "tween",
                ease: "easeOut",
                onUpdate: latest => window.scrollTo(0, latest)
            });

            setIsTransitioning(false);
            await new Promise(resolve => setTimeout(resolve, 800));
            setIsTransitioning(false);
        }
    };

    const handleSkillsClose = async () => {
        setIsTransitioning(true);
        scrollTo()
        setSkillsOpen(false);
        await new Promise(resolve => setTimeout(resolve, 1200));
        setIsTransitioning(false);
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event) => {
            // Prevent navigation if currently transitioning, scrolling, OR if media window is open
            if (isTransitioning || isScrolling || isMediaWindowOpen) return;

            // Prevent navigation if user is typing in an input
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') return;

            const key = event.key.toLowerCase();

            switch (key) {
                case 'arrowup':
                case 'w':
                    event.preventDefault();
                    if (workOpen) {
                        handleWorkClose();
                    } else if (skillsOpen) {
                        handleSkillsClose();
                    }
                    break;

                case 'arrowdown':
                case 's':
                    event.preventDefault();
                    if (!workOpen && !skillsOpen) {
                        handleWorkClick();
                    }
                    break;

                case 'arrowleft':
                case 'a':
                    event.preventDefault();
                    if (workOpen && !isTransitioning) {
                        handleWorkNavLeft();
                    }
                    break;

                case 'arrowright':
                case 'd':
                    event.preventDefault();
                    if (workOpen && !isTransitioning) {
                        handleWorkNavRight();
                    }
                    break;

                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [workOpen, skillsOpen, isTransitioning, isScrolling, isMediaWindowOpen, currentWorkIndex, works.length]);

    return(
        <motion.div
            className="w-full overflow-y-auto"
            animate={{
                backgroundColor: colorSchemes[colorScheme].background,
                color: colorSchemes[colorScheme].text,
            }}
            transition={{duration: 0.8, ease: "linear"}}
        >
            <WorkInfoTitle
                scrollPosition={scrollPosition}
                isVisible={shouldShowWorkInfo}
                title={works[currentWorkIndex].title}
                url={works[currentWorkIndex].url}
            />

            {/* First viewport - About section */}
            <div className="w-full min-h-screen flex flex-col items-center font-['Neue Haas Grotesk Display Pro']">
                <motion.div
                    className="flex flex-col justify-center items-center gap-[12px]"
                    animate={{
                        color: colorSchemes[colorScheme].text
                    }}
                    transition={{duration: 0.8}}
                >
                    <div className="pb-4 opacity-0 pt-32 md:pt-[vh] text-center text-[36px] bg-green-300 font-medium">
                        ABOUT
                    </div>
                    <div className="w-screen pb-4 justify-center items-center gap-2.5 inline-flex">
                        <div className="text-center w-2/3 text-[18px] leading-5 md:leading-7 md:text-[24px] lg:max-w-screen-md lg:leading-9 lg:text-[32px] space-y-2 font-medium">
                            DANIEL CROWLEY IS AN NYC BASED PRODUCT DESIGNER

                            THAT SPECIALIZES IN CRAFTING
                            <span className={`mx-2 ${isFlashing ? 'flashing' : ''}`}>
                            UNIQUE
                        </span>
                            DIGITAL EXPERIENCES.
                        </div>
                    </div>

                    <div className="pb-12">
                        <svg
                            width="16"
                            height="120"
                            viewBox="0 0 16 120"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{color: colorScheme === 'studio' ? '#FF00FF' : 'black'}}
                        >
                            <path
                                d="M7.29289 119.707C7.68342 120.098 8.31658 120.098 8.70711 119.707L15.0711 113.343C15.4616 112.953 15.4616 112.319 15.0711 111.929C14.6805 111.538 14.0474 111.538 13.6569 111.929L8 117.586L2.34315 111.929C1.95262 111.538 1.31946 111.538 0.928932 111.929C0.538408 112.319 0.538408 112.953 0.928932 113.343L7.29289 119.707ZM7 0V119H9V0H7Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>

                    {/* Button with Flashing Text Effect */}
                    <motion.button
                        className="px-8 md:px-[37px] py-1.5 md:py-2.5 rounded-[50px] border-[2.5px] justify-center items-center gap-2.5 flex focus:outline-none transition-colors"
                        animate={{
                            borderColor: colorSchemes[colorScheme].text,
                            color: colorSchemes[colorScheme].text
                        }}
                        whileTap={{scale: 0.95}}
                        onMouseEnter={() => setIsFlashing(true)}
                        onMouseLeave={() => setIsFlashing(false)}
                        onClick={handleWorkClick}
                    >
                    <span className={` text-[24px] md:text-[30px] font-medium ${isFlashing ? 'flashing' : ''}`}>
                        SELECTED WORK
                    </span>
                    </motion.button>

                    {/* Skills Button */}
                    <motion.button
                        animate={{
                            borderColor: colorSchemes[colorScheme].text,
                            color: colorSchemes[colorScheme].text
                        }}
                        whileTap={{scale: 0.95}}
                        onClick={handleSkillsClick}
                        className="px-8 md:px-[37px] py-1.5 md:py-2.5 rounded-[50px] border-[2.5px] skills-cursor justify-center items-center gap-2.5 flex text-center text-[24px] md:text-[30px] font-medium focus:outline-none hover:rounded-3xl hover:bg-opacity-0 hover:text-opacity-0 duration-[60ms] transition-colors"
                    >
                        SKILLS
                    </motion.button>

                    {/* Contact Button */}
                    <motion.button
                        animate={{
                            borderColor: colorSchemes[colorScheme].text,
                            color: colorSchemes[colorScheme].text,
                        }}
                        whileHover={{
                            backgroundColor: "black",
                            color: "white",
                        }}
                        whileTap={{scale: 0.95}}
                        onClick={() => window.location.href = 'mailto:dancr.wley@gmail.com'}
                        className="px-8 md:px-[37px] py-1.5 md:py-2.5 rounded-[50px] border-[2.5px] justify-center items-center gap-2.5 flex text-center text-[24px] md:text-[30px] font-medium focus:outline-none transition-colors"
                    >
                        CONTACT
                    </motion.button>
                </motion.div>
            </div>

            {/* Work section */}
            <AnimatePresence>
                {workOpen && (
                    <motion.div
                        ref={workSectionRef}
                        initial={{opacity: 0}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 20}}
                        transition={{duration: 0.5}}
                        className="w-full px-16 md:px-6 min-h-screen bg-grey flex flex-col justify-center items-center"
                    >
                        {!isTransitioning && <Header
                            workOpen={workOpen}
                            skillsOpen={skillsOpen}
                            isTransitioning={isTransitioning}
                            setIsTransitioning={setIsTransitioning}
                            setIsScrolling={setIsScrolling}
                            isScrolling={isScrolling}
                        />}

                        <div className="w-full space-y-2 justify-center items-center lg:space-y-0 lg:space-x-4 flex flex-col lg:flex-row relative">
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={currentWorkIndex}
                                    initial={direction === '' ?
                                        { opacity: 0 } :
                                        {
                                            opacity: 0,
                                            x: direction === 'right' ? 1200 : -1200
                                        }
                                    }
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{
                                        opacity: 0,
                                        x: direction === 'right' ? -1200 : 1200
                                    }}
                                    transition={{duration: 0.5, ease: "easeInOut"}}
                                >
                                    {(() => {
                                        const Component = works[currentWorkIndex].component;
                                        return <Component />;
                                    })()}
                                </motion.div>
                            </AnimatePresence>

                            {/* Left Nav Arrow with Flashing */}
                            {currentWorkIndex > 0 && (
                                <motion.div
                                    className="absolute left-[-50px] md:left-[-28px] md:bottom-auto md:top-1/2 -translate-y-1/2 cursor-pointer"
                                    onClick={handleWorkNavLeft}
                                    animate={{
                                        scale: leftArrowFlashing ? 0.6 : 1,
                                        opacity: leftArrowFlashing ? 0.1 : 1
                                    }}
                                    transition={{ duration: 0.11 }}
                                >
                                    <img
                                        className={`w-10 h-8 m-0 p-0 rotate-90 transition-all duration-150 ${leftArrowFlashing ? 'brightness-150' : ''}`}
                                        src={navArrow}
                                        alt="nav arrow left"
                                    />
                                </motion.div>
                            )}

                            {/* Right Nav Arrow with Flashing */}
                            {currentWorkIndex < works.length - 1 && (
                                <motion.div
                                    className="absolute right-[-50px] md:right-[-12px] md:bottom-auto md:top-1/2 -translate-y-1/2 cursor-pointer"
                                    onClick={handleWorkNavRight}
                                    animate={{
                                        scale: rightArrowFlashing ? 0.6 : 1,
                                        opacity: rightArrowFlashing ? 0.1 : 1
                                    }}
                                    transition={{  duration: 0.11 }}
                                >
                                    <img
                                        className={`w-10 h-8 m-0 p-0 -rotate-90 transition-all duration-150 ${rightArrowFlashing ? 'brightness-150' : ''}`}
                                        src={navArrow}
                                        alt="nav arrow right"
                                    />
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Skills section */}
            <AnimatePresence>
                {skillsOpen && (
                    <motion.div
                        ref={skillsSectionRef}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.5}}
                        className="w-full min-h-screen flex flex-col justify-center items-center"
                    >
                        <Header colorScheme={colorScheme} workOpen={workOpen} skillsOpen={skillsOpen} setIsTransitioning={setIsTransitioning} setIsScrolling={setIsScrolling}
                                isScrolling={isScrolling}/>
                        <SkillsTab isTransitioning={isTransitioning}/>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default App;