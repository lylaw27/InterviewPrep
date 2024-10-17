'use client'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export async function logoutUser(){
  const supabase = createClient();
  const {error} = await supabase.auth.signOut();
  if (error) {
    redirect('/login');
  }
  else{
    redirect('/');
  }
}