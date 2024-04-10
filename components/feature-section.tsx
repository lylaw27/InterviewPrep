
import Image from "next/image";

export default function FeatureSection(){
    return(
        <div>
            <div className="flex justify-center flex-col text-lionsmane bg-midnight h-auto px-3 py-7">
                <div className="flex h-auto py-3">
                    <div className="px-3">
                        <Image className="max-w-none" src="/thumbs-up.png" alt="" width={40} height={40}/>
                    </div>
                    <div>
                        <h1 className="text-3xl p-[3px] font-black">
                        為什麼選擇我們？
                        </h1>
                    </div>
                </div>
                <div className="flex h-auto py-3">
                    <div className="px-3">
                        <Image className="max-w-none" src="/checkmark.png" alt="" width={30} height={30}/>
                    </div>
                    <div>
                        <h1 className="text-base p-[3px] font-light">
                        專業見解：我們的問題和答案由行業專家精心準備，確保您獲得最新、最有價值的資訊。
                        </h1>
                    </div>
                </div>
                <div className="flex h-auto py-3">
                    <div className="px-3">
                        <Image className="max-w-none" src="/checkmark.png" alt="" width={30} height={30}/>
                    </div>
                    <div>
                        <h1 className="text-base p-[3px] font-light">
                        廣泛覆蓋：不論您申請的是初級職位還是高管職位，我們的資源都能滿足您的需求。
                        </h1>
                    </div>
                </div>
                <div className="flex h-auto py-3">
                    <div className="px-3">
                        <Image className="max-w-none" src="/checkmark.png" alt="" width={30} height={30}/>
                    </div>
                    <div>
                        <h1 className="text-base p-[3px] font-light">
                        即時存取：購買後，您將能夠立刻下載所有內容，隨時隨地開始準備。
                        </h1>
                    </div>
                </div>
                </div>
        </div>
    )
}
