import { CreateNoteInForm, FetchNotesResponse, Note } from "@/types/note";
import { User } from "@/types/user";
import axios from "axios";
import { api } from "./api";

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
            }
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

export const clientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
    withCredentials: true,
});

export type RegisterRequest = {
    email: string;
    password: string;
};

export async function register(data: RegisterRequest): Promise<User> {
    const res = await clientApi.post<User>("/auth/register", data);
    return res.data;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export async function login(data: LoginRequest) {
    const res = await clientApi.post<User>("/auth/login", data);
    return res.data;
}

export async function logout(): Promise<void> {
    const res = await clientApi.post("/auth/logout");
    return res.data;
}

export async function getMe() {
    const res = await clientApi.get<User>("/users/me");
    return res.data;
};

export interface UpdateUsername {
    username: string,
    email: string
}

export async function updateMe({ email, username }: UpdateUsername): Promise<User> {
    const res = await clientApi.patch<User>("/users/me", { email, username });
    return res.data;
};