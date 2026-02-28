"use client";

import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";

export default function AuthNavigation() {
    const router = useRouter();
    const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();

    const handleLogoutBtn = async () => {
        try {
            await logout();
        } catch (e) {
            console.error("Logout failed", e);
        } finally {
            clearIsAuthenticated();
            router.push("/sign-in");
        }
    };

    return (
        <>
            <li className={css.navigationItem}>
                <Link href="/">Home</Link>
            </li>
            <li className={css.navigationItem}>
                <Link href="/notes/filter/all">Notes</Link>
            </li>
            {isAuthenticated ? (
                <>
                    <li className={css.navigationItem}>
                        <Link
                            href="/profile"
                            className={css.navigationLink}
                            prefetch={false}
                        >
                            Profile
                        </Link>
                    </li>
                    <li className={css.navigationItem}>
                        <p className={css.userEmail}>{user?.email}</p>
                        <button
                            className={css.logoutButton}
                            suppressHydrationWarning
                            onClick={handleLogoutBtn}
                        >
                            Logout
                        </button>
                    </li>
                </>
            ) : (
                <>
                    <li className={css.navigationItem}>
                        <Link
                            href="/sign-in"
                            className={css.navigationLink}
                            prefetch={false}
                            suppressHydrationWarning
                        >
                            Login
                        </Link>
                    </li>

                    <li className={css.navigationItem}>
                        <Link
                            href="/sign-up"
                            className={css.navigationLink}
                            prefetch={false}
                        >
                            Sign up
                        </Link>
                    </li>
                </>
            )}
        </>
    );
}
