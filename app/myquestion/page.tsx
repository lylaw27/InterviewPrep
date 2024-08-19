import { fetchCareer } from "@/app/dashboard/action";
import {Card, CardBody, Image, Button, Link} from "@nextui-org/react";
import { getUserData, occupationType } from "@/app/dashboard/page";
import Nav from "@/components/navbar";

export default async function CareerSection(){
    
    const [jobList,featuredList] = await Promise.all([fetchCareer('Career'),fetchCareer('Featured')]);
    const user = await getUserData();
    return(
        <>
            <Nav/>
                <div className="bg-midnight p-12">
                {/* 1st */}
                <div className="text-2xl text-lionsmane font-bold">
                    歡迎, {user}!
                </div>
                {/* 2nd */}
                <div className="py-5">
                <div className="text-3xl text-lionsmane font-bold py-5">熱門面試題目</div>
                <div className="grid grid-flow-col auto-cols-[250px] overflow-x-auto scrollbar-hide gap-5 snap-x">
                {featuredList?.map((item, index) => (
                    <Card key= {index} shadow="sm" isPressable className="snap-center">
                        <CardBody as={Link}  href={`/interqpage/${item.occupation_id}`} className="overflow-visible p-0">
                            <Image
                            shadow="sm"
                            radius="lg"
                            alt={item.eng_name}
                            className="w-[250px] max-w-none"
                            src={item.img_url}
                            />
                        </CardBody>
                    </Card>
                ))}
                </div>
                </div>
                {/* 2nd */}
                <div className="text-3xl text-lionsmane font-bold py-5">各行職業</div>
                <div className="grid grid-flow-col auto-cols-[250px] overflow-x-auto scrollbar-hide gap-5 snap-x">
                {jobList?.map((item, index) => (
                    <Card key= {index} shadow="sm" isPressable className="snap-center">
                        <CardBody as={Link}  href={`/interqpage/${item.occupation_id}`} className="overflow-visible p-0">
                            <Image
                            shadow="sm"
                            radius="lg"
                            alt={item.eng_name}
                            className="w-[250px] max-w-none"
                            src={item.img_url}
                            />
                        </CardBody>
                    </Card>
                ))}
                </div>
            </div>
        </>
    )
}