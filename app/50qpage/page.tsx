'use client'
import Nav from "@/components/navbar-dyn";
import { createClient } from "@/utils/supabase/client";
import { Button, Image} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getCart, insertCart } from "../myquestion/[career]/action";
import { cartType } from "@/components/types/careerTypes";
import { startSession } from "../login/actions";

export default function FiftyPage(){
    const [cart,setCart] = useState(false);
    const [cartList,setCartList] = useState<cartType[] | null>([]);
    const [cartLoading,setCartLoading] = useState(false);
    const [user,setUser] = useState<boolean>(false);
    const getCartItems = async()=>{
        setCartLoading(true);
        const supabase = createClient();
            let currentUser = await supabase.auth.getSession();
            let userId = null;
            if(currentUser.data.session){
            userId = currentUser?.data?.session?.user?.id;
            setUser(!currentUser?.data?.session?.user?.is_anonymous!);
            const list = await getCart(userId);
            setCartList(list);
            }
            else{
            setCartList([]);
            }
        setCartLoading(false);
        }
        useEffect(()=>{
        getCartItems();
        },[])

    const addtoCart = async(occupationId: number) =>{
        setCartLoading(true);
        const supabase = createClient();
        supabase.auth.getSession().then((currentUser)=>{
            if(!currentUser.data.session){
                return startSession().then((newUser)=>{
                    return newUser?.data?.user?.id;
                })
            }
            else{
                return currentUser?.data?.session?.user?.id;
            }
        }
    ).then((userId)=>{
        // if(!cartList?.find((item)=>item.occupation_id === occupationId)){
        if(true){
            insertCart(userId, occupationId);
            getCartItems();
        }
    }).then(()=>{
        setCart(true)
    })
    }

    return(
        <div>
            <Nav user={user} cart={cart} openCartMenu={(open)=>setCart(open)} cartList={cartList} cartLoading={cartLoading} getCartItems={getCartItems}/>
            <div className=" bg-lionsmane text-midnight h-auto px-10">
                        <div className="flex justify-center py-5 bg-lionsmane">
                            <img className="w-full lg:w-[40%]" alt="ats" src="/50answers.jpg"/>
                        </div>
                        <div className="py-5 bg-lionsmane flex justify-center">
                            <div>
                                <p className="py-2 text-lg"><b>50題熱門面試題目及參考答案 - 購買流程 </b></p>
                                <p className="py-2">1. 輸入名字及電郵</p>
                                <p className="py-2">2. 按 “Pay”</p>
                                <p className="py-2">3. 輸入信用卡號碼</p>
                                <p className="py-2">4. 見到 “Payment Processing”, 請耐心等候</p>
                                <p className="py-2">5. 完成付款後，你電郵會收到確認訊息，請點擊「面試問題及參考答案」的連結於線上瀏覽</p>
                            </div>
                        </div>
                        <div className="flex justify-center py-5 bg-lionsmane">
                            <Button onClick={()=>addtoCart(76)} className="bg-ruby text-3xl p-9 text-white font-black">
                                立即購買
                            </Button>
                        </div>
                </div>
            
        </div>
    )
}
