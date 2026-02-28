import { cookies } from 'next/headers';
import { api } from './api';

export const checkSession = async () => {
    const cookieStore = await cookies();
    const res = await api.get('/auth/session', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return res;
};
