'use client'
import { Button } from "@nextui-org/react"
import { useFormStatus } from 'react-dom'

export default function SubmitButton(){
  const { pending } = useFormStatus()
  return(
    <Button id="submitbutton" type="submit" isLoading={pending}>Upload</Button>
  )
}

