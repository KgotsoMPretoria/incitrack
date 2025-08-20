"use client";

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const params = useSearchParams();
    const callbackUrl = params.get("callbackUrl") || "/incidents";

    const [email, setEmail] = useState("admin@incitrack.dev");
    const [password, setPassword] = useState("Admin123!");
    const [loading, setLoading] = useState(false);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false, // we’ll manually redirect on success
            callbackUrl,
        });
        setLoading(false);

        if (res?.error) {
            toast.error("Invalid email or password");
            return;
        }
        toast.success("Welcome back!");
        router.push(callbackUrl);
    }

    return (
        <div className="max-w-sm mx-auto mt-16 bg-white p-6 rounded-2xl shadow">
            <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm mb-1">Email</label>
                    <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        placeholder="you@example.com"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm mb-1">Password</label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        placeholder="••••••••"
                        required
                    />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? "Signing in..." : "Sign in"}
                </Button>
            </form>

            <p className="text-xs text-gray-500 mt-4">
                Forgot credentials? Try the seeded admin:{" "}
                <span className="font-mono">admin@incitrack.dev / Admin123!</span>
            </p>

            <p className="text-xs text-gray-500 mt-2">
                Don’t have an account?{" "}
                <Link className="underline" href="/">
                    Go back
                </Link>
            </p>
        </div>
    );
}
