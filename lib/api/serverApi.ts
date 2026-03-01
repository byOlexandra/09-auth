import { cookies } from 'next/headers';
import { api } from '../../app/api/api';
import { ApiError } from '@/types/note';

export const checkSession = async () => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    if (!allCookies) {
        return { data: null, isLoggedIn: false };
    }

    try {
        const res = await api.get('/auth/session', {
            headers: {
                Cookie: allCookies,
            },
        });
        return res;
    } catch (error) {
        console.error("Session check failed:", (error as ApiError).response?.status);
        return { data: null, isLoggedIn: false };
    }
};
