import Image from "next/image";

export default function Navbar(){
    return(
        <nav className="flex justify-center items-center p-5">
            <Image className="rounded-full" src="/avatar.png" alt="logo" width={100} height={100}></Image>
        </nav>
    )
}