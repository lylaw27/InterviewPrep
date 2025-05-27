import {Link, Button} from "@nextui-org/react";

export default function ATSSection(){
    return(
        <div id="ats-section">
            <div className="flex justify-center items-center flex-col bg-lionsmane text-midnight h-auto px-3 py-7">
                <div className="text-midnight text-4xl pt-6 font-black">
                    ATS履歷優化
                </div>
                <div className="flex h-auto p-10">
                    <video src="/ats-video.mov" width="320" controls autoPlay muted/>
                </div>
                <Button as={Link}  href="/atspage" className="bg-ruby text-3xl p-9 text-white font-black">
                立即體驗
                </Button>
            </div>
        </div>
    )
}
