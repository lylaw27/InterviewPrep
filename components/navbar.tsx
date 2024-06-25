import Image from "next/image";

export default function Navbar(){
    return(
        <nav className="flex justify-center items-center p-5">
            <Image className="rounded-full" src="/avatar.png" alt="logo" width={70} height={70}></Image>
        </nav>
    )
}