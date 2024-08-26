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
                    <div className="h-auto px-5">
                    <AccordionPage questionlist={questionlist}/>
                    </div>
                    {questionlist?.length === 5 ? 
                    <>
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
                </>
                :<></>
                }
                </div>
            </div>
        </div>
    )
}