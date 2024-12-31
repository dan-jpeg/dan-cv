import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import navArrow from '/src/assets/nav-arrow.svg'

const ThreeCircles = ({ filledCount = 0 }) => {
    return (
        <div className="flex gap-2">
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`w-4 h-4 rounded-full border-2 border-black ${
                        index < filledCount ? 'bg-[#353333]' : 'bg-transparent'
                    }`}
                />
            ))}
        </div>
    );
};

const SkillRow = ({ title, filledCount, index }) => {
    return (
        <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 0, opacity: 0 }}
            transition={{ delay: index * 0.07 }}
            className="flex justify-between items-center w-full"
        >
            <div className="text-center text-black sm:text-[16px] md:text-xl font-medium font-['Neue Haas Grotesk Display Pro']">
                {title}
            </div>
            <ThreeCircles filledCount={filledCount} />
        </motion.div>
    );
};

const SkillsTab = () => {
    const skills = [
        { title: 'ADOBE', filledCount: 3 },
        { title: 'FIGMA', filledCount: 3 },
        { title: 'CODE (JS / WEB)', filledCount: 3 },
        { title: 'CODE (NATIVE / OTHER)', filledCount: 2 },
        { title: 'COMMON SENSE', filledCount: 3 },
    ];

    return (
        <motion.div
            initial={{ height: 0, y: 0, opacity: 0 }}
            animate={{ height: "auto", y: 0, opacity: 1 }}
            exit={{ height: 0, y: 0, opacity: 0 }}
            transition={{ duration: 0.1, ease: "linear" }}
            className="p-6 bg-white overflow-hidden "
        >
            <div className="flex w-screen md:w-[550px] lg:w-[720px] rounded-[5px]  justify-center items-center rounded-2 py-12 px-16 flex-col gap-4">

                {skills.map((skill, index) => (
                    <SkillRow
                        key={index}
                        title={skill.title}
                        filledCount={skill.filledCount}
                        index={index}
                    />
                ))}

                <div className="absolute bottom-4 flex ">
                    <span className="items-center fixed bottom-4 left-1/2 translate -translate-x-1/2  sm:text-[16px] md:text-xl font-medium font-['Neue Haas Grotesk Display Pro']" >SKILLS</span>
                </div>
            </div>
        </motion.div>
    );
};

export default SkillsTab;