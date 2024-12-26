import { useState, useRef } from 'react';
import arrow from '/src/assets/arrow_14.svg';
import { motion, AnimatePresence } from 'framer-motion';
import SkillsTab from "./SkillsTab2.jsx";
import { colorSchemes } from './colorSchemes';
import WorksEntry from "./WorksEntry.jsx";

const Header = () => {
    return (
        <div className={`flex justify-between w-screen font-bold px-6 fixed top-4 font-['Neue Haas Grotesk Display Pro'] text-[18px]`}>
        <span className="text  "> DANIEL CROWLEY</span>
        <span className="text "> CV</span>
        </div>
    )
}

function App() {
    const [isFlashing, setIsFlashing] = useState(false);
    const [workOpen, setWorkOpen] = useState(false);
    const [skillsOpen, setSkillsOpen] = useState(false);
    const [colorScheme, setColorScheme] = useState('default');

    const workSectionRef = useRef(null);

    const skillsSectionRef = useRef(null);


    const handleWorkClick = async () => {
        setWorkOpen(true);

        // Start color transition


        // Wait for state update and DOM render
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
        }
    }

    const handleWorkClose = async () => {
        // Start transition back to default colors
        setColorScheme('default');

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        await new Promise(resolve => setTimeout(resolve, 800));
        setWorkOpen(false);
    };

    const handleSkillsClick = async () => {
        setSkillsOpen(true);

        // Wait for state update and DOM render
        await new Promise(resolve => setTimeout(resolve, 10));

        const element = skillsSectionRef.current;
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const handleSkillsClose = async () => {
        // First scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Wait for scroll to complete
        await new Promise(resolve => setTimeout(resolve, 800));

        // Then close the skills section
        setSkillsOpen(false);
    };


    return(
        <motion.div
            className="w-full overflow-y-auto"
            animate={{
                backgroundColor: colorSchemes[colorScheme].background,
                color: colorSchemes[colorScheme].text,
            }}
            transition={{duration: 0.8, ease: "easeInOut"}}
        >
            <Header colorScheme={colorScheme}/>

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
            <AnimatePresence>
                {workOpen && (
                    <motion.div
                        ref={workSectionRef}
                        initial={{opacity: 0}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 20}}
                        transition={{duration: 0.5}}
                        className="w-full px-6 min-h-screen  flex flex-col  justify-center items-center"
                    >
                        <div className=" w-full space-y-2 justify-center lg:space-y-0 lg:space-x-4 flex flex-col lg:flex-row">
                            <WorksEntry />
                            <WorksEntry />

                        </div>

                        <motion.div
                            className="text-3xl hover:cursor-n-resize font-bold"
                            animate={{
                                color: colorSchemes[colorScheme].text
                            }}
                            whileTap={{scale: 0.95}}
                            onClick={handleWorkClose}
                        >

                            CLOSE WORK
                        </motion.div>
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