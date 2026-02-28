"use client";

import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";

export default function AuthNavigation() {
    const { user, isAuthenticated, clearIsAuthenticated } = useAuthStore();
    return (
        <>
            <li className={css.navigationItem}>
                <Link href="/profile" className={css.navigationLink} prefetch={false}>
                    Profile
                </Link>
            </li>
            {isAuthenticated ? (
                <li className={css.navigationItem}>
                    <p className={css.userEmail}>User email</p>
                    <button className={css.logoutButton} suppressHydrationWarning>
                        Logout
                    </button>
                </li>
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
