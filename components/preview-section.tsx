'use client'
import { Button, Accordion,AccordionItem} from "@nextui-org/react";

export default function PreviewSection(){
    const list = [{
        title:"Q1. Can you tell us about yourself and your previous experience?",
        content:"Hi, my name's (name) and I have been a/an (position) for (number) years. You will see that I have acquired key experience during my working life and I confidently believe I am ready for this new role you are offering today. My last few jobs have all been within the (name) industry/sector and the time spent working there was particularly constructive and rewarding. In terms of myself, I feel I am an outgoing, hardworking person, able to meet deadlines within a team environment or indeed working solo. I enjoy many hobbies outside of work such as (hobby) and (hobby). I believe my continuous striving to better myself in all areas of my life has contributed to me being able to advance my career in the last few years and provide myself with a solid foundation from which to continue. "
    },
    {
        title:"question 2",
        content:"trial ^2"
    },
    ]
    return(
        <div>
            <div className="flex items-center justify-center flex-col bg-lionsmane text-midnight h-auto py-7">
            <Button className="bg-midnight text-3xl p-9 text-lionsmane font-black">
                面試必問題
            </Button>
            <div className="h-auto py-3">
                <div className="h-auto py-3 text-center">
                        <h1 className="text-3xl p-[3px] font-black">
                        50題熱門面試題目及答案
                        </h1>
                        <p className="text-m p-[3px] font-light">
                        這些是您在面試中最有可能遇到的問題，
                        </p>
                        <p className="text-m p-[3px] font-light">
                        我們為您提供了精心準備的答案，
                        </p>
                        <p className="text-m p-[3px] font-light">
                        讓您在眾多求職者中脫穎而出。
                        </p>
                </div>
                <div className="flex h-auto p-3">
                <Accordion variant="splitted">
                {list.map((item, index) => (
                    <AccordionItem classNames={{base: "!bg-transparent border-midnight border-2", indicator: "text-midnight text-lg"}} key={index} aria-label="Accordion 1" title={item.title}>
                        {item.content}
                    </AccordionItem>
                ))}
                </Accordion>
                </div>
            </div>
            </div>
        </div>
    )
}