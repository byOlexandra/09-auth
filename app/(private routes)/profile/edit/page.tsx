'use client'

import Image from "next/image";
import css from './EditProfilePage.module.css'
import { useAuthStore } from "@/lib/store/authStore";

export default function EditProfilePage() {
    const user = useAuthStore((state) => state.user);

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                <Image src={user?.avatar}
                    alt="User Avatar"
                    width={120}
                    height={120}
                    className={css.avatar}
                />

                <form className={css.profileInfo}>
                    <div className={css.usernameWrapper}>
                        <label htmlFor="username">Username:</label>
                        <input id="username"
                            type="text"
                            className={css.input}
                            defaultValue={user?.username || ''}
                        />
                    </div>

                    <p>Email: {user?.email || ''}</p>

                    <div className={css.actions}>
                        <button type="submit" className={css.saveButton}>
                            Save
                        </button>
                        <button type="button" className={css.cancelButton}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>

    )
}