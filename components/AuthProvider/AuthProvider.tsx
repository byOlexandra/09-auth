'use client'

import { api } from "@/lib/api/api";
import { getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode,
}

const publicRoutes = ['/login', '/register', '/'];

export default function AuthProvider({ children }: Props) {
    const [isLoading, setIsLoading] = useState(true);

    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            setIsLoading(true);
            try {
                await api.get('/auth/session');

                const userData = await getMe();

                setUser(userData);
            } catch (error) {
                clearIsAuthenticated();

                if (!publicRoutes.includes(pathname)) {
                    router.push('/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, [pathname, setUser, clearIsAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    const isAuthenticated = !!user;

    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
        return null;
    }

    return children;
}