'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { questionType } from '@/components/types/careerTypes'
import { checkUser } from '@/app/login/actions'

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
  revalidatePath('/dashboard/[jobid]','page')
  if (error) {
    redirect('/error')
  }
}

export async function deleteQuestion(questionId: number) {
    const supabase = createClient()
    const { error } = await supabase
    .from('interviewq')
    .delete()
    .eq('question_id',questionId)
    revalidatePath('/dashboard/[jobid]','page')
    if (error) {
      redirect('/error')
    }
  }

export async function fetchQuestion(occupationId: number){
  const supabase = createClient()
  const userData = await checkUser()
  let query = supabase
  .from('interviewq')
  .select()
  .eq('occupation_id', occupationId)
  if(!userData.data || userData.error){
    query = query.limit(5)
  }
  const {data,error} = await query
  if (error) {
    redirect('/error')
  }
  return data
}

export async function updateQuestion(newQuestion: questionType) {
  const supabase = createClient()
  console.log(newQuestion);
  const { error } = await supabase
  .from('interviewq')
  .update({
    question: newQuestion.question,
    answer: newQuestion.answer
  })
  .eq('question_id',newQuestion.question_id)
  revalidatePath('/dashboard/[jobid]','page')
  if (error) {
    redirect('/error')
  }
}