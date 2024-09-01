'use client'
import { Image, Accordion,AccordionItem} from "@nextui-org/react";
import { questionType } from "@/components/types/careerTypes";

export default function AccordionPage({questionlist} : {questionlist: questionType[]}){
    const questions = questionlist;
    return(
        <>
        {questions.map((item, index) => (
            <div key={index} className="flex items-center py-3">
                <Image alt="speech bubble" src="/speech-bubble.png" width={40} height={40}/>
                <Accordion variant="splitted">
                <AccordionItem classNames={{base: "!bg-transparent border-midnight border-2", content: "text-midnight text-lg whitespace-pre-wrap"}} aria-label="Accordion 1" title={"Q"+ (index+1) + ". " + item.question}>
                    {item.answer}
                </AccordionItem>
                </Accordion>
            </div>
        ))}
        </>
    )
}