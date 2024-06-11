import {Button} from "@nextui-org/react";

export default function HeroSection(){
    return(
        <div>
            <div className="flex justify-center items-center flex-col text-lionsmane bg-midnight h-auto py-7 text-center">
                <div className="p-[10px]">
                    <h1 className="text-xl p-[3px] font-light">
                        你是否因爲不知道如何
                    </h1>
                    <h1 className="text-3xl p-[3px] font-bold">
                        準備面試問題而感到焦慮？
                    </h1>
                </div>
                <div className="p-[10px]">
                    <h1 className="text-xl p-[3px] font-light">
                        是否擔心自己回答
                    </h1>
                    <h1 className="text-3xl p-[3px] font-bold">
                        得不夠完美而錯失機會?
                    </h1>
                </div>
                <div className="p-[10px]">
                    <h1 className="text-3xl p-[3px] font-bold">
                        不用再擔心了!
                    </h1>
                    <h1 className="text-xl p-[3px] font-light">
                        我們為您提供了一個全面的
                    </h1>
                </div>
                <div className="p-[20px]">
                <Button className="bg-lavender text-3xl p-9 text-midnight font-black">
                    面試準備工具包
                </Button>
                </div>
                <h1 className="text-xl p-[10px] font-light">
                    讓您在任何面試中都能脫穎而出。
                </h1>
            </div>
        </div>
    )
}