import { Button} from "@nextui-org/react";
import Navbar from "@/components/navbar";
import { fetchQuestion } from "@/app/dashboard/[jobid]/action";
import { fetchCareer } from "@/app/dashboard/action";
import { occupationType } from "@/components/types/careerTypes"
import AccordionPage from "./accordianPage";

export default async function myquestion({params} : {params : {career:string}}){
    const occupationId = parseInt(params.career)
    const questionlist = await fetchQuestion(occupationId);
    const career:occupationType[]|null = await fetchCareer(occupationId);
    return(
        <div>
            <Navbar/>
            <div className="flex items-center justify-center flex-col bg-lionsmane text-midnight h-auto">
                <div className="h-auto py-3">
                    <div className="py-3 w-full px-10">
                        <h1 className="text-4xl font-black"><b>{career![0].chi_name}面試祕技</b></h1>
                        <h1 className="text-2xl font-black"><b>{career![0].eng_name}</b></h1>
                        <h1 className="text-lg font-black"><b>Interview Questions and Answers</b></h1>
                    </div>
                    <AccordionPage questionlist={questionlist}/>
                </div>
            </div>
        </div>
    )
}