'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { copyCart } from '../myquestion/[career]/action'

export async function login(formData: FormData) {
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
  redirect('/dashboard')
}

export async function signup(formData: FormData) {
  const supabase = createClient();
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const userData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  const isUser = await checkUser();
  const { data, error } = await supabase.auth.signUp(userData);
    if (error) {
      console.log(error);
      redirect('/error');
    }
    await copyCart(data?.user?.id,isUser?.user?.id);
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
    redirect('/login');
  }
}

export async function startSession(){
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInAnonymously();
  return { data, error };
}