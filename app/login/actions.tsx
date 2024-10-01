'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(paying: string | string[] | undefined, formData: FormData) {
  const supabase = createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  if(paying == "true"){
    redirect('/checkout');
  }
  redirect('/dashboard');
}

export async function signup(paying: string | string[] | undefined, formData: FormData, ) {
  const supabase = createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const userData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const isUser = await checkUser();
  if(!isUser){
    const { data, error } = await supabase.auth.signUp(userData);
    if (error) {
      console.log(error);
      redirect('/error');
    }
  }
  else{
    const { data, error } = await supabase.auth.updateUser(userData);
    if (error) {
      console.log(error);
      redirect('/error');
    }
  }
  if(paying == "true"){
    redirect('/checkout');
  }
  redirect('/dashboard');
}

export async function checkUser(){
  const supabase = createClient();
  let { data, error } = await supabase.auth.getUser();
  if(error){
    return null;
  }
  else{
    return data;
  }
}

export async function checkAnon(){
  const supabase = createClient();
  let { data, error } = await supabase.auth.getUser();
  if(data.user?.is_anonymous || error){
    redirect('/login?paying=true');
  }
}

export async function startSession(){
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInAnonymously();
  return { data, error };
}