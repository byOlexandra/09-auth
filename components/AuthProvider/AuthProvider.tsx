'use client'

import { getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    children: React.ReactNode,
}

const publicRoutes = ['/sign-in', '/register', '/sign-up'];

export default function AuthProvider({ children }: Props) {
    const [isLoading, setIsLoading] = useState(true);

    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            setIsLoading(true)
            try {
                const userData = await getMe();
                setUser(userData);
            } catch (error) {
                clearIsAuthenticated();
            } finally {
                setIsLoading(false);
            }
        }
        initAuth();
    }, [setUser, clearIsAuthenticated]);

    useEffect(() => {
        if (!isLoading) {
            const isAuthenticated = !!user;
            const isPublicRoute = publicRoutes.includes(pathname);

            if (!isAuthenticated && !isPublicRoute) {
                router.push('/sign-in');
            }
        }
    }, [pathname, user, isLoading, router]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    return children;
}