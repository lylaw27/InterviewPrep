'use client'
import { Link } from "@nextui-org/react"
import { Button } from "@nextui-org/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { deleteCareer, fetchCareer, insertCareer } from "./action"
import { useEffect, useState } from "react"
import { occupationType } from "@/components/types/careerTypes"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/utils/supabase/client"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"

export default function JobTable(){
    const [pending,setPending] = useState(false)
    const [imagefile,setImagefile] = useState<any>(null)
    const [imageurl, setImageurl] = useState('')
    const [occupationlist,setOccupationlist] = useState<occupationType[] | null>([])
    const getOccupation = () =>{
        fetchCareer('all').then((res)=>{ setOccupationlist(res) })}
        const deleteImage = async(deleteUrl: string) =>{
          setPending(true);
          const supabase = createClient()
          const { data, error } = await supabase
          .storage
          .from('Occupation')
          .remove([deleteUrl])
          if (error) {
            console.log(error)
          }
          setPending(false);
        }

        useEffect(()=>{
          getOccupation()
        },[pending])
        const ImageChange = (event:any)=>{
            let fileimage = event.target.files[0]
            if(fileimage.size > 2097152) {
              alert("File larger than 2MB!");
              event.target.value = ""
              setImagefile(null)
           }
           else{
             setImagefile(fileimage)
             setImageurl(Date.now() + '-' + fileimage?.name)
           }
        }

    const getFileUrl = async(imagePath: string)=>{
      const supabase = createClient()
      const { data } = supabase
      .storage
      .from('Occupation')
      .getPublicUrl(imagePath)
      return data.publicUrl
    }

    const submitNew = async(e:any)=>{
      const formData = new FormData(e.currentTarget)
        e.preventDefault();
        setPending(true);
        const supabase = createClient()
        const imagePath = 'public/' + imageurl
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
        formData.append("img_url", getImageUrl);
        formData.append("img_path", imagePath);
        await insertCareer(formData)
        getOccupation()
        setPending(false);
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
                          <TableHead>Upload Date</TableHead>
                          <TableHead>Delete</TableHead>
                          <TableHead>Preview</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {occupationlist?.map((item,i)=>(
                          <TableRow key={i}>
                          <TableCell className="font-medium"><Link underline="hover" href={`/dashboard/${item.occupation_id}`}>{item.eng_name}</Link></TableCell>
                          <TableCell>{item.chi_name}</TableCell>
                          <TableCell>{item.created_at.slice(0,10)}</TableCell>
                          <TableCell>
                          <Button color="danger" isLoading={pending} onClick={()=>{deleteCareer(item.occupation_id);getOccupation();deleteImage(item.img_path)}}>Delete</Button>
                          </TableCell>
                          <TableCell><Button color="primary" as={Link} href={`/interqpage/${item.occupation_id}`}>Preview</Button></TableCell>
                        </TableRow>
                        )
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-1 lg:gap-8">
                <form onSubmit={submitNew} id="jobform">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Add New Job</CardTitle>
                    <CardDescription>Fill in the details for the job</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">English Name:</Label>
                        <Input required name="eng_name" placeholder="Accountant" type="text" className="w-full" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Chinese Name:</Label>
                        <Input required name="chi_name" placeholder="會計" type="text" className="w-full" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Price:</Label>
                        <div className="flex">
                        <div className="p-2">$</div>
                        <Input required name="price" placeholder="33.90" type="number" className="w-full" />
                        </div>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="name">Category:</Label>
                        <Select name="category" defaultValue="Career">
                          <SelectTrigger>
                            <SelectValue/>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="Career">Career</SelectItem>
                              <SelectItem value="Featured">Featured</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="file">Cover Image:</Label>
                        <Input required onChange={ImageChange} id="file" type="file" accept="image/*"/>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-end">
                    <Button variant="bordered" type="submit" isLoading={pending}>Upload</Button>
                  </CardFooter>
                </Card>
              </form>
              </div>
        </>
    )
}

