import { cookies } from 'next/headers';
import { ApiError, FetchNotesResponse, Note } from '@/types/note';
import axios from 'axios';
import { User } from '@/types/user';

export const serverApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
})

export const checkSession = async () => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    if (!allCookies) {
        return { data: null, isLoggedIn: false };
    }

    try {
        const res = await serverApi.get('/auth/session', {
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

export const fetchNotes = async (query: string, page: number, tag?: string): Promise<FetchNotesResponse> => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    const { data } = await serverApi.get<FetchNotesResponse>('/notes', {
        params: {
            search: query,
            page: page,
            tag: tag === "all" ? undefined : tag,
        },
        headers: {
            Cookie: allCookies,
        },
    })
    return data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    const { data } = await serverApi.get<Note>(`/notes/${id}`, {
        headers: {
            Cookie: allCookies,
        },
    })
    return data;
}

export const getMe = async (): Promise<User> => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    const { data } = await serverApi.get<User>(`/users/me`, {
        headers: {
            Cookie: allCookies,
        },
    })
    return data;
}