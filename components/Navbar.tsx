import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import logo from "@/public/logo.png";
import { Bell, LogOut, Menu, Settings, User, LogIn } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import Notifications from "./userUi/Notifications";

function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // حالة لتحديد إذا كانت نافذة الإشعارات مفتوحة

  // دالة لفتح أو إغلاق نافذة الإشعارات
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
    console.log("Signed out");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-1 px-4 md:px-12 lg:px-22">
        {/* Logo */}
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

        {/* Desktop Navigation */}
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

        {/* Desktop User Options */}
        <div className="hidden md:flex gap-4 items-center">
          {session ? (
            <>
              <Bell
                className="my-2 w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors duration-300"
                onClick={toggleNotifications} // عند الضغط على الجرس
              />
              {/* نافذة الإشعارات */}
              {isOpen && <Notifications />}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="cursor-pointer">
                    <AvatarFallback className="bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                      <User />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-2 w-48 rounded-xl shadow-lg bg-white/80 backdrop-blur-md ring-1 ring-black/10 cursor-pointer">
                  <DropdownMenuItem className="group flex items-center p-3 hover:bg-purple-100 transition-all duration-300 cursor-default rounded-lg">
                    <a className="ml-4 text-gray-800 group-hover:text-purple-600 font-medium">
                      Welcome, {session?.user?.username || "User"}
                    </a>
                  </DropdownMenuItem>
                  <div className="border-b border-gray-200 my-2"></div>
                  <DropdownMenuItem className="group flex items-center p-3 hover:bg-blue-100 transition-all duration-300 rounded-lg">
                    <a
                      className="ml-4 text-gray-800 group-hover:text-blue-600 font-medium"
                      href={`/user/${session?.user?.tc}`}
                    >
                      Profile
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="group flex items-center p-3 hover:bg-green-100 transition-all duration-300 rounded-lg">
                    <span className="ml-4 text-gray-800 group-hover:text-green-600 font-medium">
                      Settings
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="group flex items-center p-3 hover:bg-red-100 transition-all duration-300 rounded-lg"
                    onClick={handleSignOut}
                  >
                    <span className="ml-4 text-gray-800 group-hover:text-red-600 font-medium">
                      Logout
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/auth/signup">
                <Button className="px-8 py-2 rounded-full">Sign Up</Button>
              </Link>
              <Link href="/auth/signin">
                <Button className="px-8 py-2 rounded-full">Login</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          {/* Menu Button */}
          <button
            className="text-foreground focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-16 right-0 max-w-xs shadow-lg p-4 rtl flex flex-col gap-4 bg-background">
              <ul className="flex flex-col gap-6 text-foreground font-semibold">
                <li>
                  <Link href="#Header" className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                  </Link>
                </li>
                <li>
                  <Link href="#Contact" className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                  </Link>
                </li>
              </ul>
              <div className="mt-4 flex flex-col gap-4">
                {session ? (
                  <>
                    <button className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                    </button>
                    <button
                      className="flex items-center gap-2"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <Link
                    href="/api/auth/signin"
                    className="text-foreground hover:text-muted-foreground"
                  >
                    <LogIn />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
