import { Button, Image} from "@nextui-org/react";
import Navbar from "@/components/navbar";

export default function AtsPage(){
    return(
        <div>
            <Navbar/>
            <div className="flex items-center justify-center flex-col bg-lionsmane text-midnight h-auto px-10">
                <div className="h-auto py-3">
                        <h1 className="text-3xl py-3 font-black">
                        <b>ATS履歷優化</b>
                        </h1>
                        <Image className="w-full py-5" alt="ats" src="/ats-ads.jpg"/>
                        <p className="py-2 text-xl"><b>解鎖Full ATS CV Scan - 購買流程 </b></p>
                        <p className="py-2">1. 輸入名字及電郵</p>
                        <p className="py-2">2. 按 “Pay”</p>
                        <p className="py-2">3. 輸入信用卡號碼</p>
                        <p className="py-2">4. 見到 “Payment Processing”, 請耐心等候</p>
                        <p className="py-2">5. 完成付款後會收到確認訊息, 請跟據指示將你的CV, Job description及Cover Letter 發到阿P郵箱: pentagoform@gmail.com</p>
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