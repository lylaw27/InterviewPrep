'use client'
import { Button, Image, Accordion,AccordionItem} from "@nextui-org/react";
import { questionlist } from "@/app/dashboard/[jobid]/page";

export default function AccordionPage({questionlist} : {questionlist: questionlist[]}){
    const questions = questionlist;
    console.log(questionlist)
    return(
        <>
        {questions.map((item, index) => (
            <div key={index} className="flex items-center py-3">
                <Image alt="speech bubble" src="/speech-bubble.png" width={40} height={40}/>
                <Accordion variant="splitted">
                <AccordionItem classNames={{base: "!bg-transparent border-midnight border-2", indicator: "text-midnight text-lg"}} aria-label="Accordion 1" title={item.question}>
                    {item.answer}
                </AccordionItem>
                </Accordion>
            </div>
        ))}
        </>
    )
}