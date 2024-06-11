'use client'
import { Button, Accordion,AccordionItem} from "@nextui-org/react";

export default function PreviewSection(){
    const list = [{
        title:"Accountant",
        content:"trial ^1"
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
                    <AccordionItem classNames={{base: "!bg-transparent"}} key={index} aria-label="Accordion 1" title="hi">
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