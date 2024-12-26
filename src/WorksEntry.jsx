
const WorksEntry = () => {
    return (
        <div className={`w-full mb-6 max-w-[550px] h-screen  `}>

                <video
                    className=" w-full h-full object-contain"
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