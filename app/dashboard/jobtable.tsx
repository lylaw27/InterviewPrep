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
import { useFormStatus } from "react-dom"
import { createClient } from "@/utils/supabase/client"

export default function JobTable(){
    const { pending } = useFormStatus();
    const [imagefile,setImagefile] = useState<any>(null)
    const [imageurl, setImageurl] = useState('')
    const [occupationlist,setOccupationlist] = useState<occupationType[] | null>([])
    const getOccupation = () =>{
        fetchCareer(-1).then((res)=>{
            setOccupationlist(res)
        })}
    const ImageChange = (event:any)=>{
        let fileimage = event.target.files[0]
        setImagefile(fileimage)
        setImageurl(Date.now() + '-' + fileimage?.name)
    }

    const deleteImage = async(deleteUrl: string) =>{
      const supabase = createClient()
      const imgurl = deleteUrl.split('Occupation/')[1]
      const { data, error } = await supabase
      .storage
      .from('avatars')
      .remove([imgurl])
      if (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
        getOccupation()
    },[pending])
    const getFileUrl = async(imagePath: string)=>{
      const supabase = createClient()
      const { data } = supabase
      .storage
      .from('public-bucket')
      .getPublicUrl(imagePath)
      return data.publicUrl
    }
    const submitNew = async(e:any)=>{
        e.preventDefault();
        const supabase = createClient()
        const imagePath = '/public/' + imageurl
        const { data, error } = await supabase
        .storage
        .from('Occupation')
        .upload(imagePath, imagefile, {
          cacheControl: '3600',
          upsert: false
        })
        const getImageUrl = await getFileUrl(imagePath)
        if (error) {
          console.log(error)
        }
        const formData = new FormData(e.currentTarget)
        formData.append("img_url", getImageUrl);
        formData.append("img_path", imagePath);
        insertCareer(formData)
      }
    return(
        <>
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
                          <TableHead>Image</TableHead>
                          <TableHead>Last Updated</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {occupationlist?.map((item,i)=>(
                          <TableRow key={i}>
                          <TableCell className="font-medium"><Link underline="hover" href={`/dashboard/${item.occupation_id}`}>{item.eng_name}</Link></TableCell>
                          <TableCell>{item.chi_name}</TableCell>
                          <TableCell><Link underline="hover"  href={item.img_url}>Preview</Link></TableCell>
                          <TableCell>{item.created_at.slice(0,10)}</TableCell>
                          <TableCell>
                          <Button color="danger" isLoading={pending} onClick={()=>{deleteCareer(item.occupation_id);getOccupation();deleteImage(item.img_url)}}>Delete</Button>
                          </TableCell>
                        </TableRow>
                        )
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
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
                        <Input name="imagefile" onChange={ImageChange} id="file" type="file" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button onSubmit={submitNew} variant="bordered" type="submit" isLoading={pending}>Upload</Button>
                  </CardFooter>
                </Card>
              </div>
        </>
    )
}

