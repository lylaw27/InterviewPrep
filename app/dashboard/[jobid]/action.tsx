'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function insertquestion(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    question: formData.get('newQuestion') as string,
    answer: formData.get('newAnswer') as string,
  }
  console.log(data);
  const { error } = await supabase
  .from('interviewq')
  .insert({ question: data.question, answer: data.answer })

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
