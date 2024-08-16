'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

// async function getFileUrl(jobImage: any){
//   const supabase = createClient()
//   console.log(jobImage)
//   const { data, error } = await supabase
//   .storage
//   .from('Occupation')
//   .upload('avatar1.png', jobImage, {
//     cacheControl: '100000000',
//     upsert: false
//   })
//   if (error) {
//     redirect('/error')
//   }
//   return(data.fullPath)
// }

export async function insertCareer(formData: FormData) {
  const supabase = createClient()
  const data = {
    eng_name: formData.get('eng_name') as string,
    chi_name: formData.get('chi_name') as string,
    img_url: formData.get('img_url') as string,
    img_path: formData.get('img_path') as string,
  }

  const { error } = await supabase
  .from('occupation')
  .insert(data)
  if (error) {
    redirect('/error')
  }
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
  }

export async function fetchCareer(occupationId: number){
  const supabase = createClient()
  let query = supabase
  .from('occupation')
  .select()
  if(occupationId != -1){
    query = query.eq('occupation_id', occupationId)
  }
  let {data,error} = await query
  if (error) {
    redirect('/error')
  }
  return(data)
}