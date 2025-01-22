import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

// Components
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Notifications from "./userUi/Notifications";
import DaysLeft from "./userUi/DaysLeft";

// Icons
import {
  Bell,
  LogOut,
  Menu,
  Settings,
  User,
  LogIn,
  CirclePlus,
} from "lucide-react";

// UI Library (Radix)
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

// Assets
import logo from "@/public/logo.png";

function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [isDaysLeftModalOpen, setIsDaysLeftModalOpen] = useState(false);

  useEffect(() => {
    const fetchNotificationCount = async () => {
      try {
        if (!session) return;
        const userId = session?.user.tc;
        const response = await fetch(
          `/api/notifications-count?userId=${userId}`
        );
        const data = await response.json();

        if (response.ok) {
          setNotificationCount(data.count);
        } else {
          console.error("Failed to fetch notification count:", data.message);
        }
      } catch (error) {
        console.error("Error fetching notification count:", error);
      }
    };

    fetchNotificationCount();
  }, [session]);

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsDropdownOpen(false);
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  const openDaysLeftModal = () => setIsDaysLeftModalOpen(true);
  const closeDaysLeftModal = () => setIsDaysLeftModalOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md h-[75px] sm:h-24">
      <div className="container mx-auto flex justify-between items-center py-0 px-4 md:px-6">
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
        <ul className="hidden md:flex gap-7 text-gray-700 font-semibold justify-center">
          <li>
            <Link
              href="/"
              className="cursor-pointer transition-colors duration-300 hover:text-gray-500"
            >
              Home
            </Link>
          </li>
        </ul>

        {/* Desktop User Options */}
        <div className="hidden md:flex gap-4 items-center">
          {session ? (
            <>
              <div className="relative">
                <Bell
                  className={`my-2 w-6 h-6 ${
                    isNotificationsOpen ? "text-gray-900" : "text-gray-600"
                  } cursor-pointer hover:text-gray-900 transition-colors duration-300`}
                  onClick={toggleNotifications}
                />
                {notificationCount >= 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                    {notificationCount}
                  </span>
                )}
              </div>
              {isNotificationsOpen && (
                <Notifications setNotificationCount={setNotificationCount} />
              )}
              <DropdownMenu
                open={isDropdownOpen}
                onOpenChange={(open) => {
                  setIsDropdownOpen(open);
                  if (open) setIsNotificationsOpen(false);
                }}
                modal={false}
              >
                <DropdownMenuTrigger asChild>
                  <div>
                    <Avatar className="cursor-pointer">
                      <AvatarFallback className="bg-gray-500 text-white rounded-full w-12 h-12 flex items-center justify-center left-2">
                        <User />
                      </AvatarFallback>
                    </Avatar>
                  </div>
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
                  <DropdownMenuItem
                    className="group flex items-center p-3 hover:bg-green-100 transition-all duration-300 rounded-lg"
                    onClick={openDaysLeftModal}
                  >
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

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <Menu
            className="w-6 h-6 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-0 max-w-xs shadow-lg p-4 rtl flex flex-col gap-4 bg-background">
          {session ? (
            <ul className="flex flex-col gap-6 text-foreground font-semibold">
              <li>
                <Link
                  href={`/user/${session?.user?.tc}`}
                  className="flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                </Link>
              </li>
              <li>
                <button
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={toggleNotifications}
                >
                  <Bell className="w-5 h-5" />
                </button>
              </li>
              <li>
                <button
                  onClick={openDaysLeftModal}
                  className="flex items-center gap-2"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </li>
              <li>
                <button
                  className="flex items-center gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </li>
            </ul>
          ) : (
            <div className="mt-4 flex flex-col gap-4">
              <Link
                href="/api/auth/signin"
                className="text-foreground hover:text-muted-foreground"
              >
                <LogIn />
              </Link>
              <Link href="/auth/signup">
                <CirclePlus />
              </Link>
            </div>
          )}
        </div>
      )}

      {isNotificationsOpen && (
        <Notifications setNotificationCount={setNotificationCount} />
      )}

      {isDaysLeftModalOpen && (
        <DaysLeft
          onClose={closeDaysLeftModal}
          tenantId={session?.user.id || ""}
        />
      )}
    </nav>
  );
}

export default Navbar;
