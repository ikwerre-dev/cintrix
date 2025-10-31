"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import timeAgo from "@/helpers/timeAgo";

import {
    Home,
    Settings,
    User,
    HelpCircle,
    LogOut,
    Menu,
    X,
    Bell,
    ChevronDown,
    Loader2Icon,
    FileText,
} from "lucide-react";
import { useUserData } from '@/hooks/useUserData';
import { useRouter } from 'next/navigation';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

interface UserData {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
    const [currentPageLabel, setCurrentPageLabel] = useState<string>("");

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const profile = document.getElementById('profile-menu');
            const profileButton = document.getElementById('profile-button');
            const notifications = document.getElementById('notifications-menu');
            const notificationsButton = document.getElementById('notifications-button');

            if (profile && profileButton &&
                !profile.contains(event.target as Node) &&
                !profileButton.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }

            if (notifications && notificationsButton &&
                !notifications.contains(event.target as Node) &&
                !notificationsButton.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = async () => {
        try {
            localStorage.removeItem('auth-token');
            router.push('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const navItems = [
        { name: "Dashboard", href: "/dashboard", icon: Home },
        { name: "Patient Queue", href: "/dashboard/queue", icon: User },
        { name: "Triage", href: "/dashboard/triage", icon: Bell },
        { name: "Resources", href: "/dashboard/resources", icon: Settings },
        { name: "Analytics", href: "/dashboard/analytics", icon: FileText },
        { name: "Staff", href: "/dashboard/staff", icon: User },
        { name: "Settings", href: "/dashboard/settings", icon: Settings },
        { name: "Help", href: "/dashboard/help", icon: HelpCircle },
    ];

    const isActive = (path: string) => {
        if (path === "/dashboard") {
            return pathname === path;
        }
        return pathname?.startsWith(path);
    };

    const getPageLabel = (path: string): string => {
        for (const item of navItems) {
            if (item.href === path) {
                return item.name;
            }
        }
        return "Dashboard";
    };

    useEffect(() => {
        const currentItem = navItems.find(item => item.href === pathname);
        if (currentItem) {
            setActiveMenu(pathname);
            setExpandedMenus([]);
        }
        setCurrentPageLabel(getPageLabel(pathname ? pathname : "Dashboard"));
    }, [pathname]);

    const { userData, loading, error } = useUserData();

    if (loading)
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
                <Loader2Icon className="text-[#194dbe] animate-spin" size={50} />
            </div>
        );
    if (error)
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
                <div className="text-[#f00]" >Error: {error}</div>
            </div>
        );

    if (!userData)
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-gray-50">
                <Loader2Icon className="text-[#194dbe] animate-spin" size={50} />
            </div>
        );

    return (
        <div className="flex h-screen bg-gray-50">
            <aside
                id="sidebar"
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#194dbe] text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:flex ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex z-10 flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b border-[#3a6ad4]">
                        <Link href="/dashboard" className="flex items-center">
                            <Image
                                src="/logo.png"
                                alt="MedFlow Logo"
                                width={50}
                                height={40}
                            />
                        </Link>
                        <button
                            className="p-1 rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex-1 px-2 py-4 overflow-y-auto">
                        <ul className="space-y-1">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center px-4 py-3 text-sm rounded-lg transition-colors ${isActive(item.href)
                                            ? "bg-white text-[#194dbe] font-medium"
                                            : "text-white hover:bg-[#3a6ad4]"
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5 mr-3" />
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="p-4 border-t border-[#3a6ad4]">
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-3 text-sm text-white rounded-lg hover:bg-[#3a6ad4] transition-colors">
                            <LogOut className="w-5 h-5 mr-3" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm z-10">
                    <div className="flex items-center justify-between px-4 py-3">
                        <div className="flex lg:hidden items-center lg:w-64">
                            <button
                                id="hamburger-button"
                                className="p-2 rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-[#194dbe]"
                                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            >
                                <Menu size={24} />
                            </button>
                            <div className="ml-4 lg:hidden">
                                <Image
                                    src="/logo.png"
                                    alt="MedFlow Logo"
                                    width={50}
                                    height={40}
                                />
                            </div>
                        </div>

                        <div className="hidden lg:flex items-start flex-1 px-4 mx-4 lg:mx-0 lg:px-0">
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button
                                    id="notifications-button"
                                    className="relative p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#194dbe]"
                                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                >
                                    <Bell size={20} />
                                </button>
                            </div>

                            {/* Profile Dropdown */}
                            <div className="relative z-50">
                                <button
                                    id="profile-button"
                                    className="flex items-center space-x-3 focus:outline-none"
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                >
                                    <div className="w-8 h-8 rounded-full bg-[#194dbe] flex items-center justify-center text-white">
                                        <span className="text-sm font-medium">
                                            {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                                        </span>
                                    </div>
                                </button>

                                {isProfileOpen && (
                                    <div
                                        id="profile-menu"
                                        className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg py-1 z-50 min-w-[12rem] sm:min-w-[18rem] max-w-[90vw]"
                                    >
                                        <div className="px-4 py-2 border-b z-50 border-gray-100">
                                            <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                                            <p className="text-sm text-gray-500 line-clamp-1">{userData.email}</p>
                                            <p className="text-xs text-gray-500 mt-1">Role: {userData.role}</p>
                                        </div>
                                        <div className="py-1 z-50 bg-white">
                                            <Link
                                                href="/dashboard/settings"
                                                className="block px-4 py-2 text-sm text-gray-700 z-50 hover:bg-gray-50"
                                            >
                                                Settings
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>

                {/* Mobile bottom navigation */}
                <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t shadow-sm">
                    <div className="grid grid-cols-4 text-xs">
                        <Link href="/dashboard" className={`flex flex-col items-center py-2 ${isActive('/dashboard') ? 'text-[#194dbe]' : 'text-gray-600'}`}>
                            <Home className="w-5 h-5" />
                            <span>Home</span>
                        </Link>
                        <Link href="/dashboard/queue" className={`flex flex-col items-center py-2 ${isActive('/dashboard/queue') ? 'text-[#194dbe]' : 'text-gray-600'}`}>
                            <User className="w-5 h-5" />
                            <span>Queue</span>
                        </Link>
                        <Link href="/dashboard/triage" className={`flex flex-col items-center py-2 ${isActive('/dashboard/triage') ? 'text-[#194dbe]' : 'text-gray-600'}`}>
                            <Bell className="w-5 h-5" />
                            <span>Triage</span>
                        </Link>
                        <Link href="/dashboard/resources" className={`flex flex-col items-center py-2 ${isActive('/dashboard/resources') ? 'text-[#194dbe]' : 'text-gray-600'}`}>
                            <Settings className="w-5 h-5" />
                            <span>Resources</span>
                        </Link>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default DashboardLayout;