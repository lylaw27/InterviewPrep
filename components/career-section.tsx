import {Card, CardBody, Image, Button} from "@nextui-org/react";

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
            <div className="flex justify-center flex-col items-center bg-midnight text-lionsmane h-auto px-3 py-7">
                {/* 1st */}
                <Button className="bg-lavender text-3xl py-9 text-midnight font-black">
                    行業面試祕技
                </Button>
                <div className="text-center py-[20px]">
                    <h1 className="text-xl p-[3px] font-black">
                    超過10個不同行業的面試問題及答案
                    </h1>
                    <p className="text-m p-[3px] font-light">
                    從金融到科技，從市場營銷到工程，
                    </p>
                    <p className="text-m p-[3px] font-light">
                    我們涵蓋了各行各業的精選面試問題。
                    </p>
                    <p className="text-m p-[3px] font-light">
                    每個問題都附帶了專家級的答案，
                    </p>
                    <p className="text-m p-[3px] font-light">
                    幫助您展現專業知識和技能。
                    </p>
                </div>
            </div>
                {/* 2nd */}
                <div className="bg-midnight p-5 grid grid-flow-col auto-cols-[250px] overflow-x-auto scrollbar-hide gap-5 snap-x">
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
                <div className="flex justify-center py-[20px] bg-midnight">
                    <Button className="bg-ruby text-3xl p-9 text-white font-black">
                        立即體驗
                    </Button>
                </div>
        </div>
    )
}
