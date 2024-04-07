import {Button} from "@nextui-org/react";
import Image from "next/image";

export default function CareerSection(){
    return(
        <div>
            <div className="flex justify-center items-center flex-col bg-lionsmane h-auto p-3">
                <div className="flex h-auto items-center">
                    <div className="p-3">
                        <Image src="/number-1.png" alt="" width={30} height={30}/>
                    </div>
                    <div className="">
                        <h1 className="text-midnight text-xl p-[3px] font-black">
                        超過10個不同行業的面試問題及答案
                        </h1>
                    </div>
                </div>
                <div className="p-[10px] text-center">
                    <h1 className="text-lionsmane text-xl p-[3px] font-light">
                        你是否因爲不知道如何
                    </h1>
                    <h1 className="text-lionsmane text-3xl p-[3px] font-bold">
                        準備面試問題而感到焦慮？
                    </h1>
                d</div>

            </div>    
        </div>
    )
}