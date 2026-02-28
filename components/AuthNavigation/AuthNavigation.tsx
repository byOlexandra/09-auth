import Link from 'next/link';
import css from './AuthNavigation.module.css'

export default function AuthNavigation() {
    return (
        <>
            <li className={css.navigationItem}>
                <Link href="/profile" className={css.navigationLink} prefetch={false}>
                    Profile
                </Link>
            </li>

            <li className={css.navigationItem}>
                <p className={css.userEmail}>User email</p>
                <button className={css.logoutButton} suppressHydrationWarning>Logout</button>
            </li>

            <li className={css.navigationItem}>
                <Link href="/sign-in" className={css.navigationLink} prefetch={false} suppressHydrationWarning>
                    Login
                </Link>
            </li>

            <li className={css.navigationItem}>
                <Link href="/sign-up" className={css.navigationLink} prefetch={false}>
                    Sign up
                </Link>
            </li>
        </>
    );
}
