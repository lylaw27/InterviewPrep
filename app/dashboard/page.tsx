import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import {Card, CardBody, Image, Button, Link} from "@nextui-org/react";
import Navbar from "@/components/navbar";


export default async function Dashboard() {
  const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if(error || !data){
      redirect('/login')
    }
    const username = data.user?.email?.split('@')[0] ?? 'user';
    const list = [{
        title:"Accountant",
        link:"accountant",
        img:"/Accountant.jpg",
    },
    {
        title:"Civil Engineer",
        link:"civil-engineer",
        img:"/Civil Engineer.jpg",
    },
    {
        title:"Nurse",
        link:"nurse",
        img:"/Nurse.jpg",
    },
    {
        title:"Administrative assistant",
        link:"administrative-assistant",
        img:"/Administrative assistant.jpg",
    },
    {
        title:"Compliance manager",
        link:"compliance-manager",
        img:"/Compliance manager.jpg",
    },
    {
        title:"Digital Marketing manager",
        link:"digital-marketing-manager",
        img:"/Digital Marketing manager.jpg",
    },
    {
        title:"Graphic designer",
        link:"Graphic-designer",
        img:"/Graphic designer.jpg",
    },
    {
        title:"Sales, Leasing & Property Management",
        link:"Sale-Leasing-Property-Management",
        img:"/Sales, Leasing & Property Management.jpg",
    },
    {
        title:"Software Engineer",
        link:"Software-Engineer",
        img:"/Software Engineer.jpg",
    },
    {
        title:"Construction PM",
        link:"Construction-PM",
        img:"/Construction PM.jpg",
    },
    ]
    return(
        <div>
          <Navbar/>
                <div className="p-5 font-black text-xl">
                  Welcome back, {username}!
                </div>
                {/* 2nd */}
                <div className="p-5 flex flex-wrap gap-20 justify-center">
                {list.map((item, index) => (
                    <Card key= {index} shadow="sm" isPressable className="snap-center">
                        <CardBody as={Link}  href={"/interqpage/" + item.link} className="p-0">
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
                <div className="flex justify-center py-[20px]">
                    <Button className="bg-ruby text-3xl p-9 text-white font-black">
                        立即體驗
                    </Button>
                </div>
        </div>
    )
}
