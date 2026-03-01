import { CreateNoteInForm, FetchNotesResponse, Note } from "@/types/note";
import { User } from "@/types/user";
import { api } from "./api";
import { AxiosResponse } from "axios";

export async function fetchNotes(
    query: string,
    page: number,
    tag?: string,
): Promise<FetchNotesResponse> {
    try {
        const { data } = await api.get<FetchNotesResponse>("/notes", {
            params: {
                search: query,
                page: page,
                tag: tag === "all" ? undefined : tag,
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
    const { data } = await api.get<Note>(`/notes/${id}`);
    return data;
}

export async function createNote(noteData: CreateNoteInForm): Promise<Note> {
    try {
        const { data } = await api.post<Note>("/notes", noteData);
        return data;
    } catch (error) {
        console.error("Error creating note:", error);
        throw error;
    }
}

export async function deleteNote(id: string): Promise<Note> {
    try {
        const { data } = await api.delete<Note>(`/notes/${id}`);
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
    const res = await api.post<User>("/auth/register", data);
    return res.data;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export async function login(data: LoginRequest): Promise<User> {
    const res = await api.post<User>("/auth/login", data);
    return res.data;
}

export async function logout(): Promise<void> {
    await api.post("/auth/logout");
}

export async function getMe(): Promise<User> {
    const res = await api.get<User>("/users/me");
    return res.data;
};

export interface UpdateUsername {
    username: string
}

export async function updateMe({ username }: UpdateUsername): Promise<User> {
    const res = await api.patch<User>("/users/me", { username });
    return res.data;
};

export interface SessionResponse {
    message: string;
}

export async function checkSession(): Promise<AxiosResponse<SessionResponse> | null> {
    try {
        const res = await api.get<SessionResponse>("/auth/session");
        return res;
    } catch (error) {
        return null;
    }
}