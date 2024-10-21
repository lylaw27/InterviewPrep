'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { checkUser } from '../login/actions';

export async function checkCustomer(occupationId: number) {
    const supabase = createClient();
    const userData = await checkUser();
    if(!userData){
        return false;
    }
    else if(userData?.user?.id === "2c2faaf6-29ad-4459-a9e5-59edc85dd833"){
        return true;
    }
    const { data, error } = await supabase
    .from('customers')
    .select(`occupation(occupation_id)`)
    .eq('user_id', userData?.user?.id)
    .eq('occupation.occupation_id',occupationId)
    if (error) {
        redirect('/error')
      }
    if(!data![0]?.occupation){
        return false;
    }
    else{
        return true;
    }

}