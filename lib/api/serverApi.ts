import { cookies } from "next/headers";
import { ApiError, FetchNotesResponse, Note } from "@/types/note";
import { User } from "@/types/user";
import { api } from "./api";
import { AxiosResponse } from "axios";

export interface SessionResponse {
    message: string;
}

export const checkSession =
    async (): Promise<AxiosResponse<SessionResponse> | null> => {
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString();

        if (!allCookies) {
            return null;
        }

        try {
            const res = await api.get("/auth/session", {
                headers: {
                    Cookie: allCookies,
                },
            });
            return res;
        } catch (error) {
            console.error(
                "Session check failed:",
                (error as ApiError).response?.status,
            );
            return null;
        }
    };

export const fetchNotes = async (
    query: string,
    page: number,
    tag?: string,
): Promise<FetchNotesResponse> => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();
    const { data } = await api.get<FetchNotesResponse>("/notes", {
        params: {
            search: query,
            page: page,
            tag: tag === "all" ? undefined : tag,
        },
        headers: {
            Cookie: allCookies,
        },
    });
    return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    const { data } = await api.get<Note>(`/notes/${id}`, {
        headers: {
            Cookie: allCookies,
        },
    });
    return data;
};

export const getMe = async (): Promise<User> => {
    const cookieStore = await cookies();
    const allCookies = cookieStore.toString();

    const { data } = await api.get<User>(`/users/me`, {
        headers: {
            Cookie: allCookies,
        },
    });
    return data;
};
