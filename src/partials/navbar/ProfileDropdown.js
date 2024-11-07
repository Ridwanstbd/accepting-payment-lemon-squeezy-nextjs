import { useState } from "react";
import Link from "next/link";
import navData from "./nav-data.json";

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                className="text-gray-400 hover:text-white focus:outline-none"
                onClick={toggleDropdown}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    {navData.profileMenu.map((item, index) => (
                        <Link href={item.href} key={index} onClick={closeDropdown}>
                            <div className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                                {item.label}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;