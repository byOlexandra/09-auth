import { CreateNoteInForm, FetchNotesResponse, Note } from "@/types/note";
import { api } from "./api";
import { User } from "@/types/user";

export async function fetchNotes(
    query: string,
    page: number,
    tag?: string
): Promise<FetchNotesResponse> {
    try {
        const { data } = await api.get<FetchNotesResponse>("/notes", {
            params: {
                search: query,
                page: page,
                tag: tag === 'all' ? undefined : tag
            },
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_URL}`,
            },
        });
        console.log(data);
        return {
            notes: data.notes || [],
            totalPages: data.totalPages || 1,
        };
    } catch (error) {
        console.error("Error while loading page:", error);
        throw error;
    }
}

export async function fetchNoteById(id: string): Promise<Note> {
    const { data } = await api.get<Note>(`/notes/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_URL}`,
        },
    });
    return data;
}

export async function createNote(noteData: CreateNoteInForm): Promise<Note> {
    try {
        const { data } = await api.post<Note>("/notes", noteData, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_URL}`,
            },
        });
        return data;
    } catch (error) {
        console.error("Error creating note:", error);
        throw error;
    }
}

export async function deleteNote(id: string): Promise<Note> {
    try {
        const { data } = await api.delete<Note>(`/notes/${id}`, {
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_URL}`,
            },
        });
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export type RegisterRequest = {
    email: string;
    password: string;
};

export async function register(data: RegisterRequest): Promise<User> {
    const res = await api.post<User>('/auth/register', data);
    return res.data;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export async function login(data: LoginRequest) {
    const res = await api.post<User>("/auth/login", data);
    return res.data;
}