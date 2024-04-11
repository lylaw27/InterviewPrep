import {Card, CardBody, Image} from "@nextui-org/react";

export default function CareerSection(){
    const list = [{
        title:"Accountant",
        link:"",
        img:"/Accountant.jpg",
    },
    {
        title:"Civil Engineer",
        link:"",
        img:"/Civil Engineer.jpg",
    },
    {
        title:"Nurse",
        link:"",
        img:"/Nurse.jpg",
    },
    {
        title:"Administrative assistant",
        link:"",
        img:"/Administrative assistant.jpg",
    },
    {
        title:"Compliance manager",
        link:"",
        img:"/Compliance manager.jpg",
    },
    {
        title:"Digital Marketing manager",
        link:"",
        img:"/Digital Marketing manager.jpg",
    },
    {
        title:"Graphic designer",
        link:"",
        img:"/Graphic designer.jpg",
    },
    {
        title:"Sales, Leasing & Property Management",
        link:"",
        img:"/Sales, Leasing & Property Management.jpg",
    },
    {
        title:"Software Engineer",
        link:"",
        img:"/Software Engineer.jpg",
    },
    {
        title:"Construction PM",
        link:"",
        img:"/Construction PM.jpg",
    },
    ]
    return(
        <div>
            <div className="flex justify-center flex-col bg-lionsmane text-midnight h-auto px-3 py-7">
                {/* 1st */}
                <div className="flex h-auto py-3">
                    <div className="px-3">
                        <Image src="/number-1.png" alt="" width={30} height={30}/>
                    </div>
                    <div>
                        <h1 className="text-xl p-[3px] font-black">
                        超過10個不同行業的面試問題及答案
                        </h1>
                        <p className="text-sm p-[3px] font-light">
                        從金融到科技，從市場營銷到工程，
                        </p>
                        <p className="text-sm p-[3px] font-light">
                        我們涵蓋了各行各業的精選面試問題。
                        </p>
                        <p className="text-sm p-[3px] font-light">
                        每個問題都附帶了專家級的答案，
                        </p>
                        <p className="text-sm p-[3px] font-light">
                        幫助您展現專業知識和技能。
                        </p>
                    </div>
                </div>
                {/* 2nd */}
                <div className="flex h-auto py-3">
                    <div className="px-3">
                        <Image src="/down-arrow.png" alt="" width={30} height={30}/>
                    </div>
                    <div className="max-w-full">
                        <h1 className="text-xl p-[3px] font-black">
                        尋找你的理想職業
                        </h1>
                    </div>
                 </div>
                <div className="grid grid-flow-col auto-cols-[250px] overflow-x-auto scrollbar-hide max-h-[400px] p-[3px] gap-5 snap-x">
                {list.map((item, index) => (
                    <Card key= {index} shadow="sm" isPressable className="snap-center">
                        <CardBody className="overflow-visible p-0">
                            <Image
                            shadow="sm"
                            radius="lg"
                            alt={item.title}
                            className="w-[250px] max-w-none"
                            src={item.img}
                            />
                        </CardBody>
                    </Card>
                ))}
                </div>
            {/* 3rd */}
            <div className="h-auto py-8">
                <div className="flex h-auto py-3">
                    <div className="px-3">
                        <Image src="/2number-2.png" alt="" width={30} height={30}/>
                    </div>
                    <div>
                        <h1 className="text-xl p-[3px] font-black">
                        50題熱門面試題目及答案
                        </h1>
                        <p className="text-sm p-[3px] font-light">
                        這些是您在面試中最有可能遇到的問題，
                        </p>
                        <p className="text-sm p-[3px] font-light">
                        我們為您提供了精心準備的答案，
                        </p>
                        <p className="text-sm p-[3px] font-light">
                        讓您在眾多求職者中脫穎而出。
                        </p>
                    </div>
                </div>
                <div className="flex h-auto p-3">
                    <Image src="/general.jpg" alt="" className="w-full"/>
                </div>
            </div>
            </div>
        </div>
    )
}
