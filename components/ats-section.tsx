import {Card, CardBody, Image, Button} from "@nextui-org/react";

export default function ATSSection(){
    return(
        <div>
            <div className="flex justify-center items-center flex-col bg-lionsmane text-midnight h-auto px-3 py-7">
                <Button className="bg-midnight text-3xl p-9 text-lionsmane font-black">
                    ATS履歷優化
                </Button>
                <div className="flex h-auto p-10">
                    <video src="/ats-video.mov" width="320" controls/>
                </div>
                <Button className="bg-ruby text-3xl p-9 text-white font-black">
                立即體驗
                </Button>
            </div>
        </div>
    )
}
