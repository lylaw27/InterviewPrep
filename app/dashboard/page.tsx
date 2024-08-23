import { Link } from "@nextui-org/react"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { createClient } from "@/utils/supabase/server"
import Nav from "@/components/navbar"
import { redirect } from "next/navigation"
import JobTable from "./jobtable"

export async function getUserData(){
    const supabase = createClient();
    let { data, error } = await supabase.auth.getUser();
    if(error || !data){
      redirect('/login')
    }
    const username = data.user?.email?.split('@')[0] ?? 'user';
    return username
}


export default async function Dashboard() {
  const supabase = createClient();
  const username = await getUserData();
  const { data, error } = await supabase
  .from('occupation')
  .select()
  return (
    <div className="min-h-screen w-full">
      <Nav/>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="/login">
                        Login Page
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Upload Job</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            <div className="flex items-center gap-4">
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Welcome back, {username}!
              </h1>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <JobTable/>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
