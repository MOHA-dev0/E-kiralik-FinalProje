"use client";
import { signIn, signOut, useSession } from "next-auth/react"; // استيراد useSession و signOut من next-auth
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import logo from "@/public/logo.png";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import MobileNavbar from "./MobileNavbart";

function Navbar() {
  // البيانات الخاصة بالجلسة
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32">
        <div className="relative w-[100px] aspect-square">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              fill
              className="object-center object-contain"
            />
          </Link>
        </div>
        <ul className="hidden md:flex gap-7 text-gray-700 font-semibold">
          <li>
            <Link
              href="#Header"
              className="cursor-pointer transition-colors duration-300 hover:text-gray-500"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="#Contact"
              className="cursor-pointer transition-colors duration-300 hover:text-gray-500"
            >
              Contact Us
            </Link>
          </li>
        </ul>
        <div className="hidden md:flex gap-4 items-center">
          {session ? (
            <>
              <Bell className="my-2 w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors duration-300" />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={session?.user?.image || ""}
                      alt="avatar"
                      className="rounded-full w-12 h-12 border-2 border-gray-200"
                    />
                    <AvatarFallback className="bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                      {session?.user?.name} {/* عرض الحرف الأول من الاسم */}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 cursor-pointer">
                  {/* رسالة الترحيب */}
                  <DropdownMenuItem className="group flex items-center p-2 hover:bg-gray-100 transition-colors duration-300 cursor-default">
                    <span className="ml-2 text-gray-700 group-hover:text-gray-900">
                      Welcome, {session?.user?.name || "User"}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="group flex items-center p-2 hover:bg-gray-100 transition-colors duration-300">
                    <span className="ml-2 text-gray-700 group-hover:text-gray-900">
                      Profile
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="group flex items-center p-2 hover:bg-gray-100 transition-colors duration-300">
                    <span className="ml-2 text-gray-700 group-hover:text-gray-900">
                      Settings
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="group flex items-center p-2 hover:bg-gray-100 transition-colors duration-300"
                    onClick={() => signOut()} // تسجيل الخروج
                  >
                    <span className="ml-2 text-gray-700 group-hover:text-gray-900">
                      Logout
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button className="px-8 py-2 rounded-full">Sign Up</Button>
              <Link href="/api/auth/signin">
                <Button className="px-8 py-2 rounded-full">Login</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center">
          <MobileNavbar session={session} signOut={signOut} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
