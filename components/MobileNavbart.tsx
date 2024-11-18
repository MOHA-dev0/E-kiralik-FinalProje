import { useState } from "react";
import Link from "next/link";
import { Menu, Bell, User, Settings, LogOut } from "lucide-react";

interface MobileNavbarProps {
  session: any; // Replace 'any' with the appropriate type if known
  signOut: () => void;
}

const MobileNavbar = ({ session, signOut }: MobileNavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* زر القائمة */}
      <button
        className="text-gray-700 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* القائمة المنبثقة */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-lg p-4">
          <ul className="flex flex-col gap-4 text-gray-700 font-semibold">
            <li>
              <Link href="#Header" className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Home
              </Link>
            </li>
            <li>
              <Link href="#Contact" className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Contact Us
              </Link>
            </li>
          </ul>
          <div className="mt-4 flex flex-col gap-4">
            {session ? (
              <>
                <button className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Settings
                </button>
                <button
                  className="flex items-center gap-2"
                  onClick={() => signOut()}
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/api/auth/signin"
                className="text-gray-700 hover:text-gray-900"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
