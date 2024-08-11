'use client'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { questionlist } from "./page"
import { useState, useEffect } from "react"
import { Button } from "@nextui-org/react"
import { useFormStatus } from 'react-dom'
import { deleteQuestion,insertQuestion,fetchQuestion } from "./action"

export default function QuestionTable({occupationId}:{occupationId:number}){
    const today = new Date(Date.now());
    const { pending } = useFormStatus();
    const newSubmit = insertQuestion.bind(null, occupationId);
    const [questionlist,setQuestionlist] = useState<questionlist[] | null>([])
    const getQuestions = () =>{
        fetchQuestion(occupationId)
        .then((res)=>{
            setQuestionlist(res)
    })}
    useEffect(()=>{
        getQuestions();
        
    },[pending])
    return(
    <>
    <TableRow>
        <TableCell>New Question</TableCell>
        <TableCell className="font-medium">
            <Label htmlFor="newQuestion"></Label>
            <Textarea id="newQuestion" name="newQuestion" className="min-h-32" />
        </TableCell>
        <TableCell>
            <Label htmlFor="newAnswer"></Label>
            <Textarea id="newAnswer" name="newAnswer" className="min-h-32" />
        </TableCell>
        <TableCell>{today.toISOString().slice(0,10)}</TableCell>
        <TableCell>
        <Button variant="bordered" formAction={newSubmit} type="submit" isLoading={pending}>Upload</Button>
        </TableCell>    
    </TableRow>
        {questionlist?.map((item,i)=>(
            <TableRow key={i}>
            <TableCell>{`Q${i+1}`}</TableCell>
            <TableCell className="font-medium">{item.question}</TableCell>
            <TableCell>{item.answer}</TableCell>
            <TableCell>{item.created_at.slice(0,10)}</TableCell>
            <TableCell><Button color="danger" onClick={()=>{deleteQuestion(item.question_id);getQuestions()}} type="submit" isLoading={pending}>Delete</Button></TableCell>
          </TableRow>
          )
        )}
        </>
    )
}