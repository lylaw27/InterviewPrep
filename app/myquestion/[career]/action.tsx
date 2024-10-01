'use server'
import { createClient } from "@/utils/supabase/server"

export async function getCart(userId: string){
    const supabase = createClient();
    let {data,error} = await supabase
    .from('cart')
    .select(`cart_id,user_id,occupation_id, occupation(chi_name,price,img_url,price_id,eng_name)`)
    .eq('user_id',userId)
    if (error) {
        console.log(error)
      }
    return data
}

export async function insertCart(userId: string | undefined, occupationId: number){
    const supabase = createClient();
    let {error} = await supabase
    .from('cart')
    .insert({user_id: userId, occupation_id: occupationId})
    if (error) {
        console.log(error)
      }
}

export async function deleteCart(cartId: number){
    const supabase = createClient();
    let {error} = await supabase
    .from('cart')
    .delete()
    .eq('cart_id',cartId)
    if (error) {
        console.log(error)
      }
}

export async function boughtQuestion(lineItems: any){
  const supabase = createClient();
  const userId =  await supabase.auth.getUser();
  // let {data,error} = await supabase
  // .from('occupation')
  // .select('occupation_id')
  // .in('price_id',priceArray);
  // console.log(data);
  let priceArray:any = [];
  console.log(lineItems);
  lineItems.data.map((item: any)=>priceArray.push({user_id: userId.data.user?.id, price_id: item.price.id}));
  let {data,error} = await supabase
  .from('customers')
  .insert(priceArray);
  if (error) {
     console.log(error);
  }
  console.log(priceArray);
}