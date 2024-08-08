'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function insertQuestion(occupationId: number,formData: FormData) {
  const supabase = createClient()
  const data = {
    question: formData.get('newQuestion') as string,
    answer: formData.get('newAnswer') as string,
  }
  console.log(data);
  const { error } = await supabase
  .from('interviewq')
  .insert({ question: data.question, answer: data.answer, occupation_id: occupationId })

  if (error) {
    redirect('/error')
  }
}

export async function deleteQuestion(occupationId: number,formData: FormData) {
    const supabase = createClient()
    const data = {
      question: formData.get('newQuestion') as string,
      answer: formData.get('newAnswer') as string,
    }
    console.log(data);
    const { error } = await supabase
    .from('interviewq')
    .insert({ question: data.question, answer: data.answer, occupation_id: occupationId })
  
    if (error) {
      redirect('/error')
    }
  }