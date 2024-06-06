import {Card, CardBody, Image} from "@nextui-org/react";
import {Link} from "@nextui-org/react";

export default function LinkSection(){
    return(
        <div>
            <div className="flex justify-center items-center flex-col bg-lavender text-midnight h-auto px-10 py-7">
                <div className="flex h-auto py-3 w-[350px]">
                    <div className="px-3">
                        <Image src="/number-1.png" alt="" width={30} height={30}/>
                    </div>
                    <div>
                        <Link href="/" underline="always" className="text-4xl p-[3px] font-black text-midnight">
                        ATS履歷優化
                        </Link>
                        <p className="text-2xl font-normal">
                        運用關鍵字策略
                        </p>
                        <p className="text-2xl font-normal">
                        打造最佳個人形象
                        </p>
                        <p className="text-2xl font-normal">
                        讓你脫穎而出
                        </p>
                    </div>
                </div>
                <div className="flex h-auto py-11 w-[350px]">
                    <div className="px-3">
                        <Image src="/number-1.png" alt="" width={30} height={30}/>
                    </div>
                    <div>
                        <Link href="/" underline="always" className="text-4xl p-[3px] font-black text-midnight">
                        行業面試祕技
                        </Link>
                        <p className="text-2xl font-normal">
                        提供各行業面試問題
                        </p>
                        <p className="text-2xl font-normal">
                        及答案
                        </p>
                    </div>
                </div>
                <div className="flex h-auto py-3 w-[350px]">
                    <div className="px-3">
                        <Image src="/number-1.png" alt="" width={30} height={30}/>
                    </div>
                    <div>
                        <Link href="/" underline="always" className="text-4xl p-[3px] font-black text-midnight">
                        50題熱門面試題
                        </Link>
                        <p className="text-2xl font-normal">
                        解鎖面試技巧
                        </p>
                        <p className="text-2xl font-normal">
                        讓你自信應對面試挑戰
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
