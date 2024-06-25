import Navbar from "@/components/navbar";
import { Button, Image} from "@nextui-org/react";

export default function FiftyPage(){
    return(
        <div>
            <Navbar/>
            <div className="flex items-center justify-center flex-col bg-lionsmane text-midnight h-auto px-10">
                <div className="h-auto py-3">
                        <Image className="w-full py-5" alt="ats" src="/50answers.jpg"/>
                        <p className="py-2 text-lg"><b>50題熱門面試題目及參考答案 - 購買流程 </b></p>
                        <p className="py-2">1. 輸入名字及電郵</p>
                        <p className="py-2">2. 按 “Pay”</p>
                        <p className="py-2">3. 輸入信用卡號碼</p>
                        <p className="py-2">4. 見到 “Payment Processing”, 請耐心等候</p>
                        <p className="py-2">5. 5. 完成付款後，你電郵會收到確認訊息，請點擊「面試問題及參考答案」的連結於線上瀏覽</p>
                <div className="flex justify-center py-5 bg-lionsmane">
                    <Button className="bg-ruby text-3xl p-9 text-white font-black">
                        立即購買
                    </Button>
                </div>
                </div>
            </div>
        </div>
    )
}