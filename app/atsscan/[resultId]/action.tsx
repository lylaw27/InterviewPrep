'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'


export async function getResult(result: string | string[]) {
    const supabase = createClient()
    const {data, error} = await supabase.from('resumeRating')
    .select()
    .eq('resume_id', result)
    if (error) {
        redirect('/error')
    }
    return data[0];
}
