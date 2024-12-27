import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import navArrow from '/src/assets/nav-arrow.svg'

const ThreeCircles = ({ filledCount = 0 }) => {
    return (
        <div className="flex gap-2">
            {[0, 1, 2].map((index) => (
                <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.07 }}
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
            <div className="text-center text-black text-xl font-medium font-['Neue Haas Grotesk Display Pro']">
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
            initial={{ height: 0, y: -15, opacity: 0 }}
            animate={{ height: "auto", y: 0, opacity: 1 }}
            exit={{ height: 0, y: 15, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="p-6 bg-white overflow-hidden"
        >
            <div className="flex min-w-[400px] md:min-w-[550px] rounded-[5px] border-2 justify-center items-center rounded-2 border-black px-6 py-10 flex-col gap-4">
                <button
                    className="py-2.5 rounded-[50px] max-w-[300px] w-2/3  mb-12 border-[2.5px] border-black skills-cursor justify-center items-center gap-2.5 flex text-center text-black text-[30px] font-medium font-['Neue Haas Grotesk Display Pro'] focus:outline-none hover:rounded-3xl hover:bg-opacity-60 hover:text-opacity-15 duration-[60ms] transition-colors"
                >
                    SKILLS
                </button>
                {skills.map((skill, index) => (
                    <SkillRow
                        key={index}
                        title={skill.title}
                        filledCount={skill.filledCount}
                        index={index}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default SkillsTab;