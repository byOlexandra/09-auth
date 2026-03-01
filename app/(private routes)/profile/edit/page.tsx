"use client";

import Image from "next/image";
import css from "./EditProfilePage.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe, UpdateUsername } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { ApiError } from "@/types/note";
import { useState } from "react";

export default function EditProfilePage() {
    const router = useRouter();

    const [error, setError] = useState("");

    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);

    const handleSave = async (formData: FormData) => {
        const formValue = Object.fromEntries(formData);
        const updateData: UpdateUsername = {
            username: formValue.username as string,
        };

        try {
            const res = await updateMe(updateData);

            if (res) {
                if (setUser) setUser(res);
                router.push("/profile");
            }
        } catch (error) {
            const backendMessage =
                (error as ApiError).response?.data?.message ||
                (error as ApiError).response?.data?.error;
            setError(backendMessage || "Update failed");
        }
    };

    const handleCancel = () => {
        router.push("/profile");
    };

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image
                    src={user?.avatar || ""}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form className={css.profileInfo} action={handleSave}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            className={css.input}
                            defaultValue={user?.username || ""}
                        />
                    </div>

                    <p>Email: {user?.email || ""}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button
                            type="button"
                            className={css.cancelButton}
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
