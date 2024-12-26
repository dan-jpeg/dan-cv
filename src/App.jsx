import { useState, useRef } from 'react';
import arrow from '/src/assets/arrow_14.svg';
import linkArrow from '/src/assets/link-arrow-test.svg';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import SkillsTab from "./SkillsTab2.jsx";
import { colorSchemes } from './colorSchemes';
import WorksEntry from "./WorksEntry.jsx";
import navArrow from '/src/assets/nav-arrow.svg'


const Header = () => {
    return (
        <div className={`flex justify-between w-screen font-bold px-6 fixed top-4 font-['Neue Haas Grotesk Display Pro'] text-[18px] md:text-[24px]`}>
        <span className="text  "> DANIEL CROWLEY</span>
        <span className="text "> CV</span>
        </div>
    )
}

const WorkInfoTitle = ({ scrollPosition, isVisible }) => {
    const [isHovered, setIsHovered] = useState(false);  // Add hover state
    const title = "OFFICE OF JING YI XU"

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed left-1/2 z-20 transform -translate-x-1/2 bottom-6">
                    <motion.div
                        initial={{opacity: 1, y: 60}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 45}}
                        transition={{delay: 0.2, ease: "linear", duration: 0.142}}
                        className="font-['Neue Haas Grotesk Display Pro'] font-bold text-[18px] flex flex-row md:text-[24px] text-center items-center"
                    >
                        <span>{title} </span>
                        <motion.div
                            className="ml-4 px-2 cursor-pointer"
                            animate={{ opacity: isHovered ? 0.7 : 0.3 }}
                            whileHover={{ opacity: 0.7 }}
                            onHoverStart={() => setIsHovered(true)}
                            onHoverEnd={() => setIsHovered(false)}
                        >
                            <img
                                className="w-8 h-8 m-0 p-0"
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
    const [direction, setDirection] = useState('right');

    const works = [
        { id: 1, videoUrl: 'placeholder.com', title: "OFFICE OF JING YI XU" },
        { id: 1, videoUrl: 'placeholder.com', title: "OFFICE OF JING YI XU" },
        { id: 2 },
        { id: 2 },
        { id: 2 },
        // Add more works as needed
    ];

// Add function to handle navigation
    const handleWorkNav = () => {
        if (currentWorkIndex === 0) {
            setDirection('right'); // Going from 1st to 2nd
            setCurrentWorkIndex(1);
        } else {
            setDirection('left'); // Going from 2nd to 1st
            setCurrentWorkIndex(0);
        }
    };

    const shouldShowWorkInfo = workOpen && scrollPosition > window.innerHeight / 2;

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrollPosition(latest);

        if (!isTransitioning && latest < 50) {
            if (workOpen) handleWorkClose();
            if (skillsOpen) handleSkillsClose();
        }
    });




    const workSectionRef = useRef(null);

    const skillsSectionRef = useRef(null);


    const handleWorkClick = async () => {
        setDirection('');
        setIsTransitioning(true);
        setWorkOpen(true);
        await new Promise(resolve => setTimeout(resolve, 10));

        const element = workSectionRef.current;
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            await new Promise(resolve => setTimeout(resolve, 80));
            setColorScheme('studio');
            await new Promise(resolve => setTimeout(resolve, 220));
            setColorScheme('default');
            setIsTransitioning(false);
        }
    }


    const handleWorkClose = async () => {
        // Start transition back to default colors
        setColorScheme('default');

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        await new Promise(resolve => setTimeout(resolve, 250));
        setWorkOpen(false);
    };

    const handleSkillsClick = async () => {
        setIsTransitioning(true);
        setSkillsOpen(true);

        await new Promise(resolve => setTimeout(resolve, 10));

        const element = skillsSectionRef.current;
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Adding a delay before allowing scroll-to-top to work
            await new Promise(resolve => setTimeout(resolve, 800));
            setIsTransitioning(false);
        }
    };

    const handleSkillsClose = async () => {
        setIsTransitioning(true);

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        await new Promise(resolve => setTimeout(resolve, 800));
        setSkillsOpen(false);
        setIsTransitioning(false);
    };


    return(
        <motion.div
            className="w-full overflow-y-auto"
            animate={{
                backgroundColor: colorSchemes[colorScheme].background,
                color: colorSchemes[colorScheme].text,
            }}
            transition={{duration: 0.8, ease: "linear"}}
        >
            <Header colorScheme={colorScheme}/>
            <WorkInfoTitle
                scrollPosition={scrollPosition}
                isVisible={shouldShowWorkInfo}
            />

            {/* First viewport - About section */}
            <div
                className="w-full min-h-screen flex flex-col justify-center items-center font-['Neue Haas Grotesk Display Pro']">
                <motion.div
                    className="flex flex-col justify-center items-center gap-[13px]"
                    animate={{
                        color: colorSchemes[colorScheme].text
                    }}
                    transition={{duration: 0.8}}
                >
                    <div className="pb-4 pt-20 text-center text-[36px] md:text-[66px] font-medium">
                        ABOUT
                    </div>
                    <div className="w-screen pb-4 justify-center items-center gap-2.5 inline-flex">
                        <div className="text-center text-[18px] md:text-[24px] font-medium">
                            I AM A PRODUCT DESIGNER <br/>
                            OBSESSED WITH EXPLORING CULTURE <br/>
                            THROUGH
                            <span className={`mx-2 ${isFlashing ? 'flashing' : ''}`}>
                            UNIQUE
                        </span>
                            DIGITAL EXPERIENCES
                        </div>
                    </div>

                    <img src={arrow} alt="arrow" className="pb-12"/>

                    {/* Button with Flashing Text Effect */}
                    <motion.button
                        className="px-[37px] py-2.5 rounded-[50px] border-[2.5px] justify-center items-center gap-2.5 flex focus:outline-none transition-colors"
                        animate={{
                            borderColor: colorSchemes[colorScheme].text,
                            color: colorSchemes[colorScheme].text
                        }}
                        whileTap={{scale: 0.95}}
                        onMouseEnter={() => setIsFlashing(true)}
                        onMouseLeave={() => setIsFlashing(false)}
                        onClick={handleWorkClick}
                    >
                    <span className={`text-[30px] font-medium ${isFlashing ? 'flashing' : ''}`}>
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
                        className="px-[37px] py-2.5 rounded-[50px] border-[2.5px] skills-cursor justify-center items-center gap-2.5 flex text-center text-[30px] font-medium focus:outline-none hover:rounded-3xl hover:bg-opacity-0 hover:text-opacity-0 duration-[60ms] transition-colors"
                    >
                        SKILLS
                    </motion.button>

                    {/* Contact Button */}
                    <motion.button
                        animate={{
                            borderColor: colorSchemes[colorScheme].text,
                            color: colorSchemes[colorScheme].text
                        }}
                        whileTap={{scale: 0.95}}
                        className="px-[37px] py-2.5 rounded-[50px] border-[2.5px] justify-center items-center gap-2.5 flex text-center text-[30px] font-medium focus:outline-none hover:bg-black hover:text-white transition-colors"
                    >
                        CONTACT
                    </motion.button>
                </motion.div>


            </div>

            {/* Work section */}
            {/* Work section */}
            <AnimatePresence>
                {workOpen && (
                    <motion.div
                        ref={workSectionRef}
                        initial={{opacity: 0}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 20}}
                        transition={{duration: 0.5}}
                        className="w-full px-6 min-h-screen flex flex-col justify-center items-center"
                    >
                        <div className="w-full space-y-2 justify-center items-center lg:space-y-0 lg:space-x-4 flex flex-col lg:flex-row relative">
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={currentWorkIndex}
                                    initial={direction === '' ?
                                        { opacity: 0 } : // Initial load
                                        {
                                            opacity: 0,
                                            x: direction === 'right' ? 1200 : -1200
                                        }
                                    }
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{
                                        opacity: 0,
                                        x: direction === 'right' ? 1200 : -1200
                                    }}
                                    transition={{duration: 0.5, ease: "easeInOut"}}
                                >
                                    <WorksEntry workData={works[currentWorkIndex]}/>
                                </motion.div>
                            </AnimatePresence>

                            {/* Nav arrow */}
                            <motion.div
                                className={`absolute ${currentWorkIndex === 0 ? 'right-[2rem]' : 'left-[2rem]'} top-1/2 transform -translate-y-1/2 cursor-pointer`}
                                whileHover={{scale: 1.1}}
                                whileTap={{scale: 0.95}}
                                onClick={handleWorkNav}
                            >
                                <img
                                    className={`w-12 h-12 m-0 p-0 ${currentWorkIndex === 0 ? '' : 'rotate-180'}`}
                                    src={navArrow}
                                    alt="nav arrow"
                                />
                            </motion.div>
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
                        <SkillsTab/>
                        <motion.div
                            className="text-3xl mt-8 hover:cursor-n-resize font-bold"
                            animate={{
                                color: colorSchemes[colorScheme].text
                            }}
                            whileTap={{scale: 0.95}}
                            onClick={handleSkillsClose}
                        >
                            CLOSE SKILLS
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default App;