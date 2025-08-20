// src/components/layout.tsx
import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
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
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
}
