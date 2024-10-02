import { fetchCareer } from "@/app/dashboard/action";
import {Card, CardBody, Image, Button, Link} from "@nextui-org/react";
import Nav from "@/components/navbar";
import { checkUser } from "../login/actions";

export default async function CareerSection(){
    const [jobList,featuredList] = await Promise.all([fetchCareer('Career'),fetchCareer('Featured')]);
    const userData = await checkUser();
    const username = userData?.user?.email?.split('@')[0] ?? 'user';
    return(
        <>
            <Nav/>
                <div className="bg-midnight p-12">
                {/* 1st */}
                <div className="text-2xl text-lionsmane font-bold">
                    歡迎, {username}!
                </div>
                {/* 2nd */}
                <div className="py-5">
                <div className="text-3xl text-lionsmane font-bold py-5">熱門面試題目</div>
                <div className="grid grid-flow-col auto-cols-[250px] overflow-x-auto scrollbar-hide gap-5 snap-x">
                {featuredList?.map((item, index) => (
                    <Card key= {index} shadow="sm" isPressable className="snap-center">
                        <CardBody as={Link}  href={`/myquestion/${item.occupation_id}`} className="overflow-visible p-0">
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
                        <CardBody as={Link}  href={`/myquestion/${item.occupation_id}`} className="overflow-visible p-0">
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