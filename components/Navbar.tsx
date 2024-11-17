import Link from "next/link";
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

const isLogedIn = true;

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32">
        <Link href="/">
          <Image
            src={logo}
            alt="logo"
            width={120}
            height={30}
            sizes="(max-width: 600px) 80vw, (max-width: 1200px) 60vw, 30vw"
          />
        </Link>
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
          {isLogedIn ? (
            <>
              <Bell className="my-2 w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors duration-300" />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="/avatar.jpg"
                      alt="avatar"
                      className="rounded-full w-12 h-12 border-2 border-gray-200"
                    />
                    <AvatarFallback className="bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                      U
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 w-48 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 cursor-pointer">
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
                  <DropdownMenuItem className="group flex items-center p-2 hover:bg-gray-100 transition-colors duration-300">
                    <span className="ml-2 text-gray-700 group-hover:text-gray-900">
                      Logout
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button className="px-8 py-2 rounded-full bg-gradient-to-r from-green-400 to-blue-500 text-white hover:from-blue-500 hover:to-green-400 transition-all duration-300">
                Sign Up
              </Button>
              <Button className="px-8 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-red-500 text-white hover:from-red-500 hover:to-yellow-400 transition-all duration-300">
                Login
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
