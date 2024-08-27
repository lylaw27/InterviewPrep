'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function insertCareer(formData: FormData) {
  const supabase = createClient()
  let data = {
    eng_name: formData.get('eng_name') as string,
    chi_name: formData.get('chi_name') as string,
    category: formData.get('category') as string,
    img_url: formData.get('img_url') as string,
    img_path: formData.get('img_path') as string,
    price: formData.get('price') as string,
  }

  //stripe api action
  const stripeUpload = await stripe.products.create({
    name: data.chi_name,
    default_price_data: {
      unit_amount: parseInt(data.price)*100,
      currency: 'hkd',
    },
    images:[data.img_url]
  });
  let newQuestion = {...data, price_id: stripeUpload.default_price}
  
  //supabase DB action
  const { error } = await supabase
  .from('occupation')
  .insert(newQuestion)
  if (error) {
    redirect('/error')
  }
  revalidatePath('/dashboard')
}

export async function deleteCareer(occupationId: number) {
    const supabase = createClient()
    const { error } = await supabase
    .from('occupation')
    .delete()
    .eq('occupation_id',occupationId)
    if (error) {
      redirect('/error')
    }
    revalidatePath('/dashboard')
  }

export async function fetchCareer(occupationId: number | string){
  const supabase = createClient()
  let query = supabase
  .from('occupation')
  .select()
  if(typeof occupationId === 'number'){
    query = query.eq('occupation_id', occupationId)
  }
  else if(occupationId === 'Career'){
    query = query.eq('category', 'Career')
  }
  else if(occupationId === 'Featured'){
    query = query.eq('category', 'Featured')
  }
  let {data,error} = await query
  if (error) {
    redirect('/error')
  }
  return(data)
}