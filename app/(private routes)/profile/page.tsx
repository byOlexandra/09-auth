import { Metadata } from "next";
import { getMe } from "@/lib/api/serverApi";
import ProfilePage from "./ProfilePage";

export async function generateMetadata(): Promise<Metadata> {
    try {
        const user = await getMe();

        return {
            title: `${user?.username.charAt(0).toUpperCase() + user?.username.slice(1) || 'User'} profile`,
            description: `${user?.email || 'User'}`,
            openGraph: {
                title: `${user?.username.charAt(0).toUpperCase() || 'User'} profile`,
                description: `${user?.email || 'User'}`,
                url: `/profile`,
                images: [
                    {
                        url: `${user?.avatar}`,
                        width: 1200,
                        height: 630,
                        alt: `Note: ${user?.username.charAt(0).toUpperCase() || 'User'} profile`
                    }
                ]
            }
        }
    } catch (error) {
        return {
            title: "User Profile",
            description: "View your personal profile on NoteHub"
        };
    }
}

export default async function Profile() {
    const user = await getMe();

    return (
        <ProfilePage user={user} />
    )
}
