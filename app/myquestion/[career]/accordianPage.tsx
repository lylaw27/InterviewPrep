'use client'
import { Button, Image, Accordion,AccordionItem} from "@nextui-org/react";
import { occupationType, questionType } from "@/components/types/careerTypes";
import { startSession } from "@/app/login/actions";
import { createClient } from "@/utils/supabase/client";
import { insertCart } from "./action";
import Nav from "@/components/navbar-dyn";
import { useEffect, useState } from "react";
import { cartType } from "@/components/types/careerTypes";
import { deleteCart, getCart } from "@/app/myquestion/[career]/action";

export default function AccordionPage({questionlist, occupationId, career} : {questionlist: questionType[], occupationId: number, career:occupationType[]|null}){
    const [cart,setCart] = useState(false)
    const [cartList,setCartList] = useState<cartType[] | null>([])
    const [cartLoading,setCartLoading] = useState(false)
    const [user,setUser] = useState<boolean>(false)

    const openCartMenu = (state:boolean) =>{
        setCart(state)
    }
    
    const getCartItems = async()=>{
        setCartLoading(true)
        const supabase = createClient();
          let currentUser = await supabase.auth.getSession()
          let userId = null;
          if(currentUser.data.session){
            userId = currentUser?.data?.session?.user?.id
            setUser(true);
            const list = await getCart(userId);
            setCartList(list)
          }
          else{
            return []
          }
          setCartLoading(false)
        }
            
      useEffect(()=>{
        getCartItems()
      },[cart])

    const addtoCart = async(occupationId: number) =>{
        const supabase = createClient();
        supabase.auth.getSession().then((currentUser)=>{
            if(!currentUser.data.session){
                return startSession().then((newUser)=>{
                    return newUser?.data?.user?.id
                })
            }
            else{
                return currentUser?.data?.session?.user?.id
            }
        }
    ).then((userId)=>{
        if(!cartList?.find((item)=>item.occupation_id === occupationId)){
            insertCart(userId, occupationId)
        }
    }).then(()=>{
        setCart(true)
    })
}

    return(
        <div>
        <Nav user={user} cart={cart} openCartMenu={(openCartMenu)} cartList={cartList} cartLoading={cartLoading} getCartItems={getCartItems}/>
            <div className="flex items-center justify-center flex-col bg-lionsmane text-midnight h-auto">
                <div className="h-auto py-3">
                    <div className="py-3 w-full px-10">
                        <h1 className="text-4xl font-black"><b>{career![0].chi_name}面試祕技</b></h1>
                        <h1 className="text-2xl font-black"><b>{career![0].eng_name}</b></h1>
                        <h1 className="text-lg font-black"><b>Interview Questions and Answers</b></h1>
                    </div>
        <div className="h-auto px-5">
        {questionlist.map((item, index) => (
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
                    <Button onClick={()=>addtoCart(occupationId)} className="bg-ruby text-3xl p-9 text-white font-black">
                        立即購買
                    </Button>
                </div>
            </>
                :<></>
            }
            </div>
        </div>
        </div>
        </div>
    )
}
