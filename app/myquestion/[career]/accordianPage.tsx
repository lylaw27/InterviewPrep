'use client'
import { Button, Image, Accordion,AccordionItem} from "@nextui-org/react";
import { questionType } from "@/components/types/careerTypes";
import { startSession } from "@/app/login/actions";

export default function AccordionPage({questionlist} : {questionlist: questionType[]}){
    const addtoCart = () =>{
        startSession()
    }
    const questions = questionlist;
    return(
        <div className="h-auto px-5">
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
         {questionlist?.length === 5 ? 
            <>
                <div>
                    <div className="flex items-center py-3 blur-sm">
                    <Image alt="speech bubble" src="/speech-bubble.png" width={40} height={40}/>
                    <Accordion variant="splitted">
                    <AccordionItem classNames={{base: "!bg-transparent border-midnight border-2 pointer-events-none", content: "text-midnight text-lg whitespace-pre-wrap"}} aria-label="Accordion 1" title="Q6. Describe one of the challenges in the accounting field and how you overcome it.">
                    </AccordionItem>
                    </Accordion>
                    </div>
                    <div className="flex items-center py-3 blur-md">
                    <Image alt="speech bubble" src="/speech-bubble.png" width={40} height={40}/>
                    <Accordion variant="splitted">
                    <AccordionItem classNames={{base: "!bg-transparent border-midnight border-2 pointer-events-none", content: "text-midnight text-lg whitespace-pre-wrap"}} aria-label="Accordion 1" title="Q7. Describe one of the challenges in the accounting field and how you overcome it.">
                    </AccordionItem>
                    </Accordion>
                    </div>
                </div>
                <div className="py-4 px-10">
                    <p className="py-2 text-xl"><b>行業面試秘技 - 購買流程 </b></p>
                    <p className="py-2">1. 輸入名字及電郵</p>
                    <p className="py-2">2. 按 “Pay”</p>
                    <p className="py-2">3. 輸入信用卡號碼</p>
                    <p className="py-2">4. 見到 “Payment Processing”, 請耐心等候</p>
                    <p className="py-2">5. 完成付款後，你電郵會收到確認訊息，請點擊「面試問題及參考答案」的連結於線上瀏覽</p>
                </div>
                <div className="flex justify-center py-[20px] bg-lionsmane">
                    <Button onClick={addtoCart} className="bg-ruby text-3xl p-9 text-white font-black">
                        立即購買
                    </Button>
                </div>
            </>
                :<></>
            }
        </div>
    )
}