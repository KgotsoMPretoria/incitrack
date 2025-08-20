// src/components/layout.tsx
import Link from "next/link";
import { ReactNode } from "react";
import { auth, signOut } from "@/auth";

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await auth();

    async function doSignOut() {
        "use server";
        await signOut({ redirectTo: "/login" });
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 p-4">
                <h1 className="text-2xl font-bold mb-6">Incitrack</h1>
                <nav className="flex flex-col space-y-2">
                    <Link href="/incidents" className="text-gray-700 hover:text-black">
                        Incidents
                    </Link>
                    <Link href="/postmortems" className="text-gray-700 hover:text-black">
                        Postmortems
                    </Link>
                    <Link href="/changelog" className="text-gray-700 hover:text-black">
                        Changelog
                    </Link>
                    <Link href="/settings" className="text-gray-700 hover:text-black">
                        Settings
                    </Link>
                </nav>

                <div className="mt-8 border-t pt-4">
                    {session?.user ? (
                        <form action={doSignOut}>
                            <button
                                type="submit"
                                className="text-sm text-red-600 hover:text-red-700"
                            >
                                Sign out ({session.user.role})
                            </button>
                        </form>
                    ) : (
                        <Link href="/login" className="text-sm text-blue-600 hover:underline">
                            Sign in
                        </Link>
                    )}
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}
