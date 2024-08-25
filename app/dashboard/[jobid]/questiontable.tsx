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

export default function QuestionTable({occupationId, fetchedList}:{occupationId:number, fetchedList:questionStatus[]}){
    const today = new Date(Date.now());
    const { pending } = useFormStatus();
    const newSubmit = insertQuestion.bind(null, occupationId);
    const [questionlist,setQuestionlist] = useState<questionStatus[]>(fetchedList)
    const questionChange = (value: string, key: number, field: string) =>{
        let newList = [...questionlist];
        newList![key][field] = value;
        console.log(fetchedList)
        setQuestionlist(newList)
    }
    const cancelEdit = (key: number) =>{
        let newList = [...questionlist];
        newList![key].question = fetchedList[key].question;
        newList![key].answer = fetchedList[key].answer;
        newList![key].editing = !questionlist![key].editing;
       
        setQuestionlist(newList)
    }

    const editQuestion = (key: number) =>{
        let newList = [...questionlist]
        newList![key].editing = !questionlist![key].editing;
        setQuestionlist(newList)
    }

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
            <TableCell className="font-medium"><Textarea onValueChange={(value)=>questionChange(value,i,'question')} minRows={15} maxRows={40} fullWidth value={item.question} variant="bordered" readOnly={!item.editing} classNames={{inputWrapper: item.editing ? "bg-gray-50":"border-none outline-none resize-none bg-transparent shadow-none focus:border-none focus:outline-none"}}/></TableCell>
            <TableCell className="whitespace-pre-wrap"><Textarea onValueChange={(value)=>questionChange(value,i,'answer')} minRows={15} maxRows={40} fullWidth value={item.answer} variant="bordered" readOnly={!item.editing} classNames={{inputWrapper: item.editing ? "bg-gray-50":"border-none outline-none resize-none bg-transparent shadow-none focus:border-none focus:outline-none"}}/></TableCell>
            <TableCell>{item.created_at.slice(0,10)}</TableCell>
            <TableCell>
                {item.editing ?  
                <>
                <Button color="success" onClick={()=>{editQuestion(i);updateQuestion(questionlist[i])}} isLoading={pending}>Save</Button>
                <div className="py-4"/>
                <Button onClick={()=>{cancelEdit(i)}} isLoading={pending}>Cancel</Button>
                </>
                : 
                <Button color="primary" onClick={()=>editQuestion(i)} isLoading={pending}>Edit</Button>}
                <div className="py-4"/>
                <Button color="danger" onClick={()=>{deleteQuestion(item.question_id);getQuestions()}} type="submit" isLoading={pending}>Delete</Button>
            </TableCell>
          </TableRow>
          )
        )}
        </>
    )
}