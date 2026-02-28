import { cookies } from 'next/headers';
import { api } from './api';
import { ApiError } from '@/types/note';

export const checkSession = async () => {
    // const cookieStore = await cookies();
    // const res = await api.get('/auth/session', {
    //     headers: {
    //         Cookie: cookieStore.toString(),
    //     },
    // });
    // return res;
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    // 1. Якщо куків немає, навіть не робимо запит, 
    // просто повертаємо null або об'єкт з isLoggedIn: false
    if (!allCookies) {
        return { data: null, isLoggedIn: false };
    }

    try {
        const res = await api.get('/auth/session', {
            headers: {
                // Передаємо куки тільки якщо вони є
                Cookie: allCookies,
            },
        });
        return res;
    } catch (error) {
        console.error("Session check failed:", (error as ApiError).response?.status);
        return { data: null, isLoggedIn: false };
    }
};
