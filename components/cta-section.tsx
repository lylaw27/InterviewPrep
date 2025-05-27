import {Button} from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function CTASection(){
    return(
        <div>
            <div className="flex justify-center items-center flex-col bg-lavender text-midnight h-auto py-7  text-center">
            <div>
                    <Image src="/flash-sale.png" alt="" width={250} height={250}/>
                </div>
                <div className="p-[10px] text-2xl font-bold">
                    <h1>
                        特別優惠
                    </h1>
                    <h1>
                        現在購買，即享限時折扣！
                    </h1>
                </div>
                <h1 className="p-[10px] text-lg font-light">
                        讓我們助您一臂之力，贏得理想的工作機會。
                </h1>
                <div className="p-[10px]">
                <Button as={Link} href="/50qpage" className="bg-ruby text-3xl p-9 text-white font-black">
                👉 立即行動
                </Button>
                </div>
                <h1 className="p-[10px] text-lg font-light">
                    讓您的面試之路無往不利！
                </h1>
            </div>
        </div>
    )
}
