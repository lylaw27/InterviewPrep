'use client'
import { Link } from "@nextui-org/react"
import { Button } from "@nextui-org/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { deleteCareer, fetchCareer, insertCareer } from "./action"
import { useEffect, useState } from "react"
import { occupationType } from "./page"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function JobTable(){
    const [occupationlist,setOccupationlist] = useState<occupationType[] | null>([])
    const getOccupation = () =>{
        fetchCareer(-1).then((res)=>{
            setOccupationlist(res)
        })}

    useEffect(()=>{
        getOccupation()
    },[])
    return(
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8 lg:col-span-2">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Manage Job</CardTitle>
                    <CardDescription>Click on the job to view questions!</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>English Name</TableHead>
                          <TableHead>Chinese Name</TableHead>
                          <TableHead>Last Updated</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {occupationlist?.map((item,i)=>(
                          <TableRow key={i}>
                          <TableCell className="font-medium"><Link underline="hover" href={`/dashboard/${item.occupation_id}`}>{item.eng_name}</Link></TableCell>
                          <TableCell>{item.chi_name}</TableCell>
                          <TableCell>{item.created_at.slice(0,10)}</TableCell>
                          <TableCell>
                          <Button color="danger" onClick={()=>{deleteCareer(item.occupation_id);getOccupation();}}>Delete</Button>
                          </TableCell>
                        </TableRow>
                        )
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
                <form action={insertCareer}>
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Add New Job</CardTitle>
                    <CardDescription>Fill in the details for the job</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">English Name:</Label>
                        <Input id="eng_name" name="eng_name" placeholder="Accountant" type="text" className="w-full" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Chinese Name:</Label>
                        <Input id="chi_name" name="chi_name" placeholder="會計" type="text" className="w-full" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="file">File</Label>
                        <Input id="file" type="file" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button type="submit" size="sm">Upload Job</Button>
                  </CardFooter>
                </Card>
                </form>
              </div>
              </div>
    )
}