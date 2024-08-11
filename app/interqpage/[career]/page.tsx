import { Button, Image, Accordion,AccordionItem} from "@nextui-org/react";
import Navbar from "@/components/navbar";
import { fetchQuestion } from "@/app/dashboard/[jobid]/action";
import { questionlist } from "@/app/dashboard/[jobid]/page";
import AccordionPage from "./accordianPage";

export default async function InterqPage({params} : {params : {career:string}}){
    const questionlist = await fetchQuestion(parseInt(params.career))
    // const list = [{
    //     title:"Q1. Can you tell us about yourself and your previous experience?",
    //     content:"Hi, my name's (name) and I have been a/an (position) for (number) years. You will see that I have acquired key experience during my working life and I confidently believe I am ready for this new role you are offering today. My last few jobs have all been within the (name) industry/sector and the time spent working there was particularly constructive and rewarding. In terms of myself, I feel I am an outgoing, hardworking person, able to meet deadlines within a team environment or indeed working solo. I enjoy many hobbies outside of work such as (hobby) and (hobby). I believe my continuous striving to better myself in all areas of my life has contributed to me being able to advance my career in the last few years and provide myself with a solid foundation from which to continue."
    // },
    // {
    //     title:"Q2. What experience do you have relevant to this role?",
    //     content:"It is clear that I do indeed have a wealth of experience directly related to the opportunity you are offering today. First let me talk about my previous roles in chronological order. I started out by working for (company) which gave me a really solid and foundational introduction to the industry. It was within this role that I began to excel, not only while working on my own but also within various teams where we had to continually ensure deadlines were met as well as objective targets completed. After some time, I felt my career progression somewhat stifled which led me onto my next job, working for (company). It was during this role that I learnt invaluable skills which I believe still aid my work and career today. Therefore, you can see this role particularly directly links in with the job you are offering today. I undoubtedly feel I will be able to offer a great deal to your company and hope I can be the candidate you are looking for."
    // },
    // {
    //     title:"Q3. Discuss your CV.",
    //     content:"As you will see my CV is arranged in chronological/job specific order. I believe it's fundamental to provide an employer with a clear and concise resume. First, you can see my key personal information at the top. Secondly, I have listed my educational and non-educational achievements with specific grades and qualifications. Thirdly, you can see all my previous contractual work, whereby I have listed out all my jobs in the last (number) years. I have omitted a few roles since I do not feel these are directly relevant or specifically related. However, if you request seeing such extra work, I would be happy to provide that for you. Lastly, I have put down some extra personal info such as hobbies, travel and extracurricular work."
    // },
    // {
    //     title:"Q4. Discuss your educational background.",
    //     content:"In terms of my educational background, you will see my significant qualification worthy of mention is my (degree/Masters/PhD). It was during this course that… I really enjoyed this course because… This course particularly helped me organise in my mind why I fell in love with… it was during this course that my passion for (position/industry) considerably grew. During this course, I was able to constantly develop the key skills that I am equipped with today. Going back a little further you will see my A-levels and GCSEs."
    // },
    // ]
    return(
        <div>
            <Navbar/>
            <div className="flex items-center justify-center flex-col bg-lionsmane text-midnight h-auto">
                <div className="h-auto py-3">
                    <div className="py-3 w-full px-10">
                        <h1 className="text-4xl font-black"><b>行業面試祕技</b></h1>
                        <h1 className="text-2xl font-black"><b>Accountant</b></h1>
                        <h1 className="text-lg font-black"><b>Interview Questions and Answers</b></h1>
                    </div>
                    <div className="h-auto px-5">
                    {/* {questionlist.map((item, index) => (
                        <div key={index} className="flex items-center py-3">
                            <Image alt="speech bubble" src="/speech-bubble.png" width={40} height={40}/>
                            <Accordion variant="splitted">
                            <AccordionItem classNames={{base: "!bg-transparent border-midnight border-2", indicator: "text-midnight text-lg"}} aria-label="Accordion 1" title={item.question}>
                                {item.answer}
                            </AccordionItem>
                            </Accordion>
                        </div>
                    ))} */}
                    <AccordionPage questionlist={questionlist}/>
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
                    <Button className="bg-ruby text-3xl p-9 text-white font-black">
                        立即購買
                    </Button>
                </div>
                </div>
            </div>
        </div>
    )
}