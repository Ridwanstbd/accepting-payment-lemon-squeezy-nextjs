"use client"
import { usePathname } from 'next/navigation';
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";
import navData from './nav-data.json'

const Navbar = ({ }) => {
    const pathname = usePathname();
    return (
        <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center">
            <div className="flex items-center">
                <Link href="/">
                    <div className="text-white font-bold text-xl">My App</div>
                </Link>
                <ul className="ml-6 flex space-x-4">
                    {navData.items.map((item, index) => (
                        <li key={index}>
                            <Link href={item.href}>
                                <div
                                    className={`text-gray-400 hover:text-white ${pathname === item.href ? 'text-white' : ''
                                        }`}
                                >
                                    {item.label}
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center">
                <ProfileDropdown />
            </div>
        </nav>
    )
}
export default Navbar;