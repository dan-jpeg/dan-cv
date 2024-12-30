import { useState, useRef, useEffect } from 'react';
import arrow from '/src/assets/arrow_14.svg';
import linkArrow from '/src/assets/link-arrow-test.svg';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import SkillsTab from "./SkillsTab2.jsx";
import { colorSchemes } from './colorSchemes';
import WorksEntry, { WorksEntryEdie } from "./WorksEntry.jsx";
import navArrow from '/src/assets/small-arrow.svg'

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

const Header = ({workOpen, skillsOpen }) => {

    const [isScrolling, setIsScrolling] = useState(false);


    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleArrowClick  = async () => {
        setIsScrolling(true);
        handleScrollToTop()
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsScrolling(false)
    }

    return (


        <div
            className={`flex justify-between w-screen font-bold px-6 fixed top-4 z-50 font-['Neue Haas Grotesk Display Pro'] text-[18px] md:text-[24px]`}>
            <span className="text  opacity-0 "> DANIEL CROWLEY</span>
            {(workOpen || skillsOpen) && (
                <motion.div

                    className={`fixed top-4 left-1/2 m-0 p-0 transform -translate-x-1/2 cursor-pointer ${isScrolling ? 'opacity-0' : 'opacity-100'}`}
                    onClick={handleArrowClick}
                >
                    <img
                        src={navArrow}
                        alt="navig  ation arrow"
                        className="w-8 h-8 m-0 p-0 rotate-180"
                    />
                </motion.div>
            )}
            <span className="text  opacity-0 "> CV</span>
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
                <div className="fixed left-1/2 z-20 transform -translate-x-1/2 bottom-6 md:bottom-[100px]">
                    <motion.div
                        initial={{opacity: 1, y: 60}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 45}}
                        transition={{delay: 0.2, ease: "linear", duration: 0.142}}
                        className="font-['Neue Haas Grotesk Display Pro'] font-bold text-[15px] md:text-[24px] relative inline-block"
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
    const [direction, setDirection] =
        useState('');

    const [showSecondaryContent, setShowSecondaryContent] = useState(false);


    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSecondaryContent(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);


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
        }
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
            <Header colorScheme={colorScheme} workOpen={workOpen} skillsOpen={skillsOpen}/>
            <WorkInfoTitle
                scrollPosition={scrollPosition}
                isVisible={shouldShowWorkInfo}
                title={works[currentWorkIndex].title}
                url={works[currentWorkIndex].url}
            />

            {/* First viewport - About section */}
            <div
                className="w-full min-h-screen flex flex-col  items-center font-['Neue Haas Grotesk Display Pro']">
                <motion.div
                    className="flex flex-col justify-center items-center gap-[12px]"
                    animate={{
                        color: colorSchemes[colorScheme].text
                    }}
                    transition={{duration: 0.8}}
                >

                    <div
                        className="text-center  pt-32 md:pt-[31vh] w-2/3 lg:w-full text-[18px] leading-5 md:leading-7 md:text-[24px] lg:max-w-screen-lg lg:leading-9 lg:text-[32px] space-y-2 font-medium">
                        <p>
                            <motion.span initial={{opacity: 1}}>DANIEL CROWLEY</motion.span>
                            {' '}
                            <motion.span
                                initial={{opacity: 0}}
                                animate={{opacity: showSecondaryContent ? 1 : 0}}
                                transition={{duration: 0.1, delay: 0.1}}
                            >IS A
                            </motion.span>


                            <motion.span
                                initial={{opacity: 0}}
                                animate={{opacity: showSecondaryContent ? 1 : 0}}
                                transition={{duration: 0.1, delay: 3.333}}
                            >N NYC-BASED
                            </motion.span>
                            < br/>
                            <motion.span initial={{opacity: 1}}>PRODUCT DESIGNER</motion.span>
                            {' '}
                            <motion.span
                                initial={{opacity: 0}}
                                animate={{opacity: showSecondaryContent ? 1 : 0}}
                                transition={{duration: 0.1, delay: 0.7}}
                            >
                                THAT SPECIALIZES IN CRAFTING
                                <span className={`mx-2 ${isFlashing ? 'flashing' : ''}`}>UNIQUE</span>
                                DIGITAL EXPERIENCES.
                            </motion.span>
                        </p>
                    </div>

                    <motion.img
                        initial={{opacity: 0}}
                        animate={{opacity: showSecondaryContent ? 1 : 0}}
                        transition={{duration: 0.1, delay: 1.2}}
                        src={arrow} alt="arrow" className="pb-12 pt-6"/>

                    <motion.div className={`flex flex-col justify-center items-center gap-[12px]`}

                        initial={{opacity: 0}}
                        animate={{opacity: showSecondaryContent ? 1 : 0}}
                                    transition={{duration: 0.1, delay: 1.5}}
                    >
                        <motion.button
                            className="px-8 md:px-[37px] py-1.5 md:py-2.5  rounded-[50px] border-[2.5px] justify-center items-center gap-2.5 flex focus:outline-none transition-colors"
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
                                color: "white", // Explicitly set the text color on hover
                            }}
                            whileTap={{scale: 0.95}}
                            onClick={() => window.location.href = 'mailto:dancr.wley@gmail.com'}
                            className="px-8 md:px-[37px] py-1.5 md:py-2.5 rounded-[50px] border-[2.5px] justify-center items-center gap-2.5 flex text-center text-[24px] md:text-[30px] font-medium focus:outline-none transition-colors"
                        >
                            CONTACT
                        </motion.button>
                    </motion.div>
                    {/* Button with Flashing Text Effect */}

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
                        <div
                            className="w-full space-y-2 justify-center items-center lg:space-y-0 lg:space-x-4 flex flex-col lg:flex-row relative">
                            <AnimatePresence mode="popLayout">
                                <motion.div
                                    key={currentWorkIndex}
                                    initial={direction === '' ?
                                        {opacity: 0} : // Initial load
                                        {
                                            opacity: 0,
                                            x: direction === 'right' ? 1200 : -1200
                                        }
                                    }
                                    animate={{opacity: 1, x: 0}}
                                    exit={{
                                        opacity: 0,
                                        x: direction === 'right' ? 1200 : -1200
                                    }}
                                    transition={{duration: 0.5, ease: "easeInOut"}}
                                >
                                    {(() => {
                                        const Component = works[currentWorkIndex].component;
                                        return <Component/>;
                                    })()}
                                </motion.div>
                            </AnimatePresence>

                            {/* Nav arrow */}
                            <div
                                className={`absolute ${currentWorkIndex === 0 ? 'right-[-12px] left-auto' : 'left-[-28px] right-auto'}    md:bottom-auto md:top-1/2  -translate-y-1/2 cursor-pointer`}
                                onClick={handleWorkNav}
                            >
                                <img
                                    className={`w-10 h-8 m-0 p-0 ${currentWorkIndex === 0 ? '-rotate-90' : 'rotate-90'}`}
                                    src={navArrow}
                                    alt="nav arrow"
                                />
                            </div>
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

                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default App;