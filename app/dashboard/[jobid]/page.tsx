import Link from "next/link"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { createClient } from "@/utils/supabase/server"
import Nav from "@/components/navbar"
import { redirect } from "next/navigation"
import QuestionTable from "./questiontable"

async function getUserData(supabase: any){
    let { data, error } = await supabase.auth.getUser();
    if(error || !data){
      redirect('/login')
    }
    const username = data.user?.email?.split('@')[0] ?? 'user';
    return username
}

export default async function QuestionList({ params }: { params: { jobid: string } }) {
  const supabase = createClient();
  const username = await getUserData(supabase);
  const occupationId: number = parseInt(params.jobid);
  // const { data, error } = await supabase
  // .from('interviewq')
  // .select()
  // .eq('occupation_id', occupationId)
  // const questionlist: questionlist[] | null = data;

  return (
    <div className="min-h-screen w-full">
      <Nav/>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid w-[80%] flex-1 auto-rows-max gap-4">
      <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/login" prefetch={false}>
                    Login Page
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard" prefetch={false}>
                    Upload Job
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Upload Question</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
            <div className="flex items-center gap-4">
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Welcome back, {username}!
              </h1>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8 lg:col-span-3">
                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Manage Question</CardTitle>
                    <CardDescription>Click on the Question to edit!</CardDescription>
                  </CardHeader>
                  <CardContent>
                        <form action='#'>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>No.</TableHead>
                          <TableHead>Quesiton</TableHead>
                          <TableHead>Answer</TableHead>
                          <TableHead>Last Updated</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>  
                      <TableBody> 
                        <QuestionTable occupationId={occupationId}/>
                      </TableBody>
                    </Table>
                      </form> 
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
