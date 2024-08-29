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
        <AccordionPage questionlist={questionlist} occupationId={occupationId} career={career}/>
    )
}