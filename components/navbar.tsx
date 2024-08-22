'use client'
import {
    Link, 
    Navbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Dropdown,
  DropdownItem,
  DropdownMenu,
DropdownTrigger} from "@nextui-org/react"
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client";

async function UserLogout(){
  const supabase = createClient();
  await supabase.auth.signOut();
}

export default function Nav(){
  const [user,setUser] = useState<boolean>(false)
  useEffect(()=>{
    supabase.auth.getUser().then((res)=>{
      if(res.data.user){
        setUser(true)
      }
      else{
        setUser(false)
      }
    })
    
  })
  const supabase = createClient();

    const menuItems = [
        "Accounting",
        "Administration & Office Support",
        "Banking & Financial Services",
        "Construction",
        "Design",
        "Education",
        "Engineering",
        "Healthcare & Medical",
        "Information Technology",
        "Manufacturing & Logistics",
        "Marketing & Communications",
        "Real Estate & Property",
      ];
    const [isMenuOpen,setIsMenuOpen] = useState(false)
    return(
    <Navbar className="flex justify-center items-center py-5" onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      </NavbarContent>
      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarBrand className="self-center" as={Link} href="/" >
        
            <Image className="rounded-full" src="/avatar.png" alt="logo" width={70} height={70}></Image>
          
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
        <Dropdown>
          <DropdownTrigger>
              <Image radius="none" src="/user-interface.svg" alt="logo" width={25} height={25}></Image>
          </DropdownTrigger>
          {user ? 
          <DropdownMenu>
            <DropdownItem>
          <Link href="/myquestion" className="flex">我的面試問題</Link>
            </DropdownItem>
            <DropdownItem>
          <Link href="/"  onClick={UserLogout} className="flex">登出</Link>
            </DropdownItem>
          </DropdownMenu>
          :
          <DropdownMenu>
          <DropdownItem>
        <Link href="/login" className="flex">登入</Link>
          </DropdownItem>
        </DropdownMenu>
            }
        </Dropdown>
        </NavbarItem>
        <NavbarItem>
        <Dropdown>
          <DropdownTrigger>
            <Image radius="none" src="/shopping-bag.svg" alt="logo" width={30} height={30}></Image>
          </DropdownTrigger>
          <DropdownMenu variant="light" className="max-w-[500px]">
            <DropdownItem showDivider className="p-5">
              <div className="flex">
                <div className="w-[30%]">
                  <Image radius="none" alt="" src="/Nurse.jpg"/>
                </div>
                <div className="pl-10 pr-2 py-1 w-[65%]">
                  <div className="text-xl text-wrap">50題熱門面試題目及答案</div>
                  <div className="py-5 text-xl text-gray-500">$88</div>
                </div>
                <div>
                <Image radius="none" src="/cross.svg" alt="logo" width={30} height={30}></Image>
                </div>
              </div>
            </DropdownItem>
            <DropdownItem showDivider className="p-5">
              <div className="flex">
                <div className="w-[30%]">
                  <Image radius="none" alt="" src="/50answers.jpg"/>
                </div>
                <div className="pl-10 w-[60%]">
                  <div className="text-xl text-wrap">50題熱門面試題目及答案</div>
                  <div className="py-5 text-base text-gray-500">$88</div>
                </div>
              </div>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="py-[55px] pb-[70px]">
        <NavbarMenuItem>
          <Link className="w-full text-midnight text-3xl font-black py-2" href="#" size="lg">ATS履歷優化</Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link className="w-full text-midnight text-3xl font-black py-2" href="#" size="lg">所有行業面試問題及答案</Link>
        </NavbarMenuItem>
      {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full text-midnight px-12" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <Link className="w-full text-midnight text-3xl font-black py-2" href="#" size="lg">50個熱門面試問題及答案</Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
    );
}
