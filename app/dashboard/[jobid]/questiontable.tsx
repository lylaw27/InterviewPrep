'use client'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Textarea } from "@nextui-org/react"
import { Label } from "@/components/ui/label"
import { questionType } from "@/components/types/careerTypes"
import { useState, useEffect } from "react"
import { Button } from "@nextui-org/react"
import { useFormStatus } from 'react-dom'
import { deleteQuestion,insertQuestion,fetchQuestion, updateQuestion } from "./action"

interface questionStatus extends questionType{
    editing: boolean
}

export default function QuestionTable({occupationId}:{occupationId:number}){
    const today = new Date(Date.now());
    const { pending } = useFormStatus();
    const newSubmit = insertQuestion.bind(null, occupationId);
    const [questionlist,setQuestionlist] = useState<questionStatus[]>([])

    const editQuestion = (key: number) =>{
        let newList = [...questionlist]
        newList![key].editing = !questionlist![key].editing;
        setQuestionlist(newList)
    }

    const getQuestions = () =>{
        fetchQuestion(occupationId)
        .then((res)=>{
            const list = res.map((item)=>(
                {editing: false, ...item}
            ))
            setQuestionlist(list)
    })}
    useEffect(()=>{
        getQuestions();
    },[pending])
    return(
    <>
    <TableRow>
        <TableCell>New Question</TableCell>
        <TableCell className="font-medium w-[20%]">
            <Label htmlFor="newQuestion"></Label>
            <Textarea id="newQuestion" name="newQuestion" minRows={15} maxRows={40} fullWidth classNames={{inputWrapper:"h-full",base:"h-full"}}/>
        </TableCell>
        <TableCell className="font-medium w-[50%]">
            <Label htmlFor="newAnswer"></Label>
            <Textarea id="newAnswer" name="newAnswer" minRows={15} maxRows={40} fullWidth classNames={{inputWrapper:"h-full",base:"h-full"}}/>
        </TableCell>
        <TableCell>{today.toISOString().slice(0,10)}</TableCell>
        <TableCell>
        <Button variant="bordered" formAction={newSubmit} type="submit" isLoading={pending}>Upload</Button>
        </TableCell>    
    </TableRow>
        {questionlist?.map((item,i)=>(
            <TableRow key={i}>
            <TableCell>{`Q${i+1}`}</TableCell>
            <TableCell className="font-medium"><Textarea minRows={15} maxRows={40} fullWidth defaultValue={item.question} variant="bordered" readOnly={!item.editing} classNames={{inputWrapper: item.editing ? "bg-gray-50":"border-none outline-none resize-none bg-transparent shadow-none focus:border-none focus:outline-none"}}/></TableCell>
            <TableCell className="whitespace-pre-wrap"><Textarea minRows={15} maxRows={40} fullWidth defaultValue={item.answer} variant="bordered" readOnly={!item.editing} classNames={{inputWrapper: item.editing ? "bg-gray-50":"border-none outline-none resize-none bg-transparent shadow-none focus:border-none focus:outline-none"}}/></TableCell>
            <TableCell>{item.created_at.slice(0,10)}</TableCell>
            <TableCell>
                {item.editing ?  <Button color="success" onClick={()=>{editQuestion(i);updateQuestion(item)}} isLoading={pending}>Save</Button> : <Button onClick={()=>editQuestion(i)} isLoading={pending}>Edit</Button>}
                <div className="py-4"/>
                <Button color="danger" onClick={()=>{deleteQuestion(item.question_id);getQuestions()}} type="submit" isLoading={pending}>Delete</Button>
            </TableCell>
          </TableRow>
          )
        )}
        </>
    )
}