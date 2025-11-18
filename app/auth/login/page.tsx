"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!user) {
        setError("Email hoặc mật khẩu không đúng");
        setLoading(false);
        return;
      }

      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        })
      );

      router.push("/");
    } catch {
      setError("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Love Date
          </CardTitle>
          <CardDescription>Đăng nhập để vào thế giới của chúng ta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Mật khẩu
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Chưa có tài khoản?{" "}
              <Link
                href="/auth/register"
                className="text-primary hover:underline font-medium"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
