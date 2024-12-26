import { useState, useRef } from 'react';
import arrow from '/src/assets/arrow_14.svg';
import { motion, AnimatePresence } from 'framer-motion';
import SkillsTab from "./SkillsTab2.jsx";

const Header = () => {
    return (
        <div className={`flex justify-between w-screen font-bold px-4 fixed top-4 font-['Neue Haas Grotesk Display Pro'] text-[18px]`}>
        <span className="text "> DANIEL CROWLEY</span>
        <span className="text "> CV</span>
        </div>
    )
}

function App() {
    const [isFlashing, setIsFlashing] = useState(false);
    const [workOpen, setWorkOpen] = useState(false);
    const [skillsOpen, setSkillsOpen] = useState(true);
    const workSectionRef = useRef(null);

    const handleWorkClick = async () => {
        setWorkOpen(true);

        // Wait for state update and DOM render
        await new Promise(resolve => setTimeout(resolve, 10));

        const element = workSectionRef.current;
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const skillsSectionRef = useRef(null);

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

    const handleWorkClose = async () => {
        // First scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Wait for scroll to complete before removing content
        // A typical smooth scroll takes about 500ms
        await new Promise(resolve => setTimeout(resolve, 800));

        // Then close the work section
        setWorkOpen(false);
    };



    return (
        <div className="w-full overflow-y-auto">
            <Header />
            {/* First viewport - About section */}
            <div
                className="w-full min-h-screen bg-custom-blue bg-opacity-0 flex flex-col justify-center items-center font-['Neue Haas Grotesk Display Pro']">
                <div className="flex flex-col justify-center items-center gap-[13px]">
                    <div className="pb-4 pt-20 text-center text-black text-[36px] md:text-[66px] font-medium">
                        ABOUT
                    </div>
                    <div className="w-screen pb-4 justify-center items-center gap-2.5 inline-flex">
                        <div
                            className="text-center text-black text-[18px] md:text-[24px] font-medium font-['Neue Haas Grotesk Display Pro']">
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
                    <button
                        className="px-[37px] py-2.5 rounded-[50px] border-[2.5px] border-black justify-center items-center gap-2.5 flex focus:outline-none hover:text-white transition-colors"
                        onMouseEnter={() => setIsFlashing(true)}
                        onMouseLeave={() => setIsFlashing(false)}
                        onClick={handleWorkClick}
                    >
                        <span
                            className={`text-black text-[30px] font-medium font-['Neue Haas Grotesk Display Pro'] ${isFlashing ? 'flashing' : ''} `}>

                            SELECTED WORK
                        </span>
                    </button>

                    {/* Normal Button */}

                    <button
                        onClick={handleSkillsClick}
                        className="px-[37px] py-2.5 rounded-[50px] border-[2.5px] border-black skills-cursor justify-center items-center gap-2.5 flex text-center text-black text-[30px] font-medium font-['Neue Haas Grotesk Display Pro'] focus:outline-none hover:rounded-3xl hover:bg-opacity-0 hover:text-opacity-0 duration-[60ms] transition-colors">
                        SKILLS
                    </button>

                    <button
                        className="px-[37px] py-2.5 rounded-[50px] border-[2.5px] border-black justify-center items-center gap-2.5 flex text-center text-black text-[30px] font-medium font-['Neue Haas Grotesk Display Pro'] focus:outline-none hover:bg-black hover:text-white transition-colors">
                        CONTACT
                    </button>
                </div>

            </div>


            {/* Work section with motion */}
            {workOpen && (
                <motion.div
                    ref={workSectionRef}
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5}}
                    className="w-full min-h-screen   flex flex-col justify-center items-center"
                >
                    <div className="text-custom-blue font-bold text-3xl hover:cursor-n-resize " onClick={handleWorkClose}>
                        CLOSE WORK
                    </div>
                </motion.div>
            )}

            <AnimatePresence>
                {skillsOpen && (
                    <motion.div
                        ref={skillsSectionRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full min-h-screen flex flex-col justify-center items-center"
                    >
                        <SkillsTab />
                        <div
                            className="text-custom-blue font-bold text-3xl mt-8 hover:cursor-n-resize"
                            onClick={handleSkillsClose}
                        >
                            CLOSE SKILLS
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;