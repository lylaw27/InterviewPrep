'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(paying: string | string[] | undefined, formData: FormData) {
  const supabase = createClient()
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const logindata = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data,error } = await supabase.auth.signInWithPassword(logindata);
  if (error) {
    redirect('/error')
  }
  revalidatePath('/', 'layout')
  if(paying == "true"){
    redirect('/checkout');
  }
  if(data.user.id == "2c2faaf6-29ad-4459-a9e5-59edc85dd833"){
    redirect('/dashboard');
  }
  else{
    redirect('/myquestion');
  }
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
      redirect('/error');
    }
  }
  else{
    const { data, error } = await supabase.auth.updateUser(userData);
    if (error) {
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

export async function checkAdmin(){
  const supabase = createClient();
  let { data, error } = await supabase.auth.getUser();
  if (error) {
    redirect('/login');
  }
  if(data?.user?.id != "2c2faaf6-29ad-4459-a9e5-59edc85dd833"){
    redirect('/myquestion');
  }
}

export async function startSession(){
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInAnonymously();
  return { data, error };
}