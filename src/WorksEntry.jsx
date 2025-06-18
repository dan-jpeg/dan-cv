
const WorksEntry = () => {
    return (

        <div className={`w-full mb-0 max-w-[550px] flex justify-center items-center  h-screen  `}>

                <video
                    className=" w-full transform   h-full max-h-[60vh] justify-self-center object-contain"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                >
                    <source src="https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/videos/jxu-preview.mp4" type="video/mp4" />
                </video>
        </div>
    )
}

export default WorksEntry;

export const WorksEntryEdie = () => {
    return (
    <div className={`w-full mb-0 max-w-[850px] flex justify-center items-center h-screen  `}>

        <video
            className=" w-full h-full max-h-[61vh] object-contain"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
        >
            <source src="https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/videos/edie-sample.mp4" type="video/mp4"/>
        </video>
    </div>
)
}

export const WorksEntryNew = () => {
    return (
        <div className={`w-full mb-0 max-w-[850px] flex justify-center items-center h-screen  `}>
                <img
                    className="w-full h-full max-h-[61vh] object-contain"
                    alt="not missing" src="https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/jxu-archive-grid.png?alt=media&token=876a72de-5ea5-4e9e-98e2-4e75ff655210" />

        </div>
    )
}

export const WorksEntryHaus = () => {
    return (
        <div className={`w-full mb-0 max-w-[850px] flex justify-center items-center h-screen  `}>

            <video
                className=" w-full h-full max-h-[61vh] object-contain"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            >
                <source src="https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/Sequence%2002.mp4?alt=media&token=83f023f8-b05a-4eb1-8293-8c961668a68d" type="video/mp4"/>
            </video>
        </div>
    )
}



    export const WorksEntryUnion = () => {
        return (
            <div className={`w-full mb-0 max-w-[850px] flex justify-center items-center h-screen  `}>

                <video
                    className=" w-full h-full max-h-[61vh] object-contain"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                >
                    <source src="https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/union-splash-sequence.mp4?alt=media&token=d0fc4c6d-5c8e-48cc-a36b-d9e60800eeeb" type="video/mp4"/>
                </video>
            </div>
        )
    }



    export const WorksEntryUnion2 = () => {
        return (
            <div className={`w-full mb-0 max-w-[850px] flex justify-center items-center h-screen  `}>

                <video
                    className=" w-full h-full  scale-[2.5] md:scale-125 max-h-[61vh] object-contain"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                >
                    <source src="https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/union-splash-sequence-reverse-120fps.mp4?alt=media&token=a33378f2-4fa6-412c-b44c-175e84b4a3e1" type="video/mp4"/>
                </video>
            </div>
        )
    }

export const WorksEntryLapres = () => {
    return (
        <div className={`w-full mb-0 max-w-[850px] flex justify-center items-center h-screen  `}>
            <div className="flex scale-[0.66] justify-center items-center  md:scale-100 flex-row -gap-x-[1]">

                <img
                    className="w-full h-full max-h-[61vh] object-contain"
                    alt="not missing"
                    src="https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/lapres-3.png?alt=media&token=73c364e9-6ae8-4e32-94bc-2924734a468d"
                />
                <img
                    className="w-full h-full max-h-[61vh] object-contain"
                    alt="not missing"
                    src="https://firebasestorage.googleapis.com/v0/b/common-base-d538e.firebasestorage.app/o/lapres-2.png?alt=media&token=3bbbe66b-34f6-404f-939d-0899643c7c44"
                />
            </div>


        </div>
    )
}