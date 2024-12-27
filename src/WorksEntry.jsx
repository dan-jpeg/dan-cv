
const WorksEntry = () => {
    return (
        <div className={`w-full mb-0 max-w-[550px] flex justify-center items-center  h-screen  `}>

                <video
                    className=" w-full h-full max-h-[60vh] justify-self-center object-contain"
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