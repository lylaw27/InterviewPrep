'use client'
import { Button } from "@nextui-org/react"
import { useFormStatus } from 'react-dom'
import { insertQuestion } from "./action"

export default function SubmitButton({propid}: {propid: number}){
  const { pending } = useFormStatus()
  const submitNew = insertQuestion.bind(null, propid)
  return(
    <Button formAction={submitNew} type="submit" isLoading={pending}>Upload</Button>
  )
}
