import {motion} from "framer-motion";

const SkillsTab2 = () => {
    return (
        <div
            className="h-[334px] px-6 py-8 bg-white flex-col justify-start items-start gap-2.5 inline-flex overflow-hidden">
            <div className="w-[366px] h-[270px] flex-col justify-center items-center gap-[33px] flex">
                <div className="self-stretch justify-between items-center inline-flex">
                    <div
                        className="text-center text-black text-[22px] font-medium font-['Neue Haas Grotesk Display Pro']">ADOBE
                    </div>
                    <div className="w-[86px] h-[25px] relative">
                        <div className="w-[25px] h-[25px] left-0 top-[25px] absolute bg-[#353333] rounded-full"/>
                        <div className="w-[25px] h-[25px] left-[30px] top-[25px] absolute bg-[#353333] rounded-full"/>
                        <div
                            className="w-[25px] h-[25px] left-[61px] top-[25px] absolute rounded-full border-2 border-black"/>
                    </div>
                </div>
                <div className="self-stretch justify-between items-center inline-flex">
                    <div
                        className="text-center text-black text-[22px] font-medium font-['Neue Haas Grotesk Display Pro']">FIGMA
                    </div>
                    <div className="w-[86px] h-[25px] relative">
                        <div className="w-[25px] h-[25px] left-0 top-[25px] absolute bg-[#353333] rounded-full"/>
                        <div className="w-[25px] h-[25px] left-[30px] top-[25px] absolute bg-[#353333] rounded-full"/>
                        <div
                            className="w-[25px] h-[25px] left-[61px] top-[25px] absolute bg-black rounded-full border-2 border-black"/>
                    </div>
                </div>
                <div className="self-stretch bg-white justify-between items-center inline-flex">
                    <div
                        className="text-center text-black text-[22px] font-medium font-['Neue Haas Grotesk Display Pro']">CODE
                        (JS / WEB)
                    </div>
                    <div className="w-[86px] h-[25px] relative">
                        <div className="w-[25px] h-[25px] left-0 top-[25px] absolute bg-[#353333] rounded-full"/>
                        <div className="w-[25px] h-[25px] left-[30px] top-[25px] absolute bg-[#353333] rounded-full"/>
                        <div
                            className="w-[25px] h-[25px] left-[61px] top-[25px] absolute bg-[#0e0e0e] rounded-full border-2 border-black"/>
                    </div>
                </div>
                <div className="self-stretch justify-between items-center inline-flex">
                    <div
                        className="text-center text-black text-[22px] font-medium font-['Neue Haas Grotesk Display Pro']">CODE
                        (NATIVE / OTHER)
                    </div>
                    <div className="w-[86px] h-[25px] relative">
                        <div className="w-[25px] h-[25px] left-0 top-[25px] absolute bg-[#353333] rounded-full"/>
                        <div className="w-[25px] h-[25px] left-[30px] top-[25px] absolute bg-[#353333] rounded-full"/>
                        <div
                            className="w-[25px] h-[25px] left-[61px] top-[25px] absolute rounded-full border-2 border-black"/>
                    </div>
                </div>
                <div className="self-stretch justify-between items-center inline-flex">
                    <div
                        className="text-center text-black text-[22px] font-medium font-['Neue Haas Grotesk Display Pro']">COMMON
                        SENSE
                    </div>
                    <div className="w-[86px] h-[25px] relative">
                        <div className="w-[25px] h-[25px] left-0 top-[25px] absolute bg-[#353333] rounded-full"/>
                        <div className="w-[25px] h-[25px] left-[30px] top-[25px] absolute bg-[#353333] rounded-full"/>
                        <div
                            className="w-[25px] h-[25px] left-[61px] top-[25px] absolute bg-black rounded-full border-2 border-[#030303]"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SkillsTab2;


const SkillsTab3 = () => {
    return  (
<div
    className="text-center  pt-32 md:pt-40 w-2/3 text-[18px] leading-5 md:leading-7 md:text-[24px] lg:max-w-screen-md lg:leading-9 lg:text-[32px] space-y-2 font-medium">
    <p>
        <motion.span initial={{opacity: 1}}>DANIEL CROWLEY</motion.span>
        {' '}
        <motion.span
            initial={{opacity: 0}}
            animate={{opacity: showSecondaryContent ? 1 : 0}}
            transition={{duration: 0.5}}
        >IS AN NYC BASED
        </motion.span>
        {' '}
        <motion.span initial={{opacity: 1}}>PRODUCT DESIGNER</motion.span>
        {' '}
        <motion.span
            initial={{opacity: 0}}
            animate={{opacity: showSecondaryContent ? 1 : 0}}
            transition={{duration: 0.5}}
        >
            THAT SPECIALIZES IN CRAFTING
            <span className={`mx-2 ${isFlashing ? 'flashing' : ''}`}>UNIQUE</span>
            DIGITAL EXPERIENCES.
        </motion.span>
    </p>
</div>
    )
}


