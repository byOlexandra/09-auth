"use client";

import { useState } from "react";
import css from "./SignUpPage.module.css";
import { useRouter } from "next/navigation";
import { ApiError } from "@/types/note";
import { register, RegisterRequest } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignUpPage() {
    const router = useRouter();
    const { setUser } = useAuthStore();

    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('')

        const formData = new FormData(e.currentTarget);
        try {
            const formValues = Object.fromEntries(formData) as RegisterRequest;
            const user = await register(formValues);
            if (user) {
                setUser(user);
                router.push("/profile");
            } else {
                setError("Registration failed. Please try again.");
            }
        } catch (error) {
            const backendMessage = (error as ApiError).response?.data?.message || (error as ApiError).response?.data?.error;
            const fallbackMessage = (error as ApiError).message || "Something went wrong";

            setError(backendMessage || fallbackMessage);
        }
    };

    return (
        <main className={css.mainContent}>
            <h1 className={css.formTitle}>Sign up</h1>
            <form className={css.form} onSubmit={handleSubmit}>
                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        className={css.input}
                        suppressHydrationWarning={true}
                        required
                    />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        className={css.input}
                        suppressHydrationWarning={true}
                        required
                    />
                </div>

                <div className={css.actions}>
                    <button
                        type="submit"
                        className={css.submitButton}
                        suppressHydrationWarning={true}
                    >
                        Register
                    </button>
                </div>

                {error && <p className={css.error}>{error}</p>}
            </form>
        </main>
    );
}
