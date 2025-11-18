"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type UserRole = "admin" | "chang" | "nang";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "chang" as UserRole,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.password) {
        setError("Vui lòng điền đầy đủ thông tin");
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Mật khẩu không trùng khớp");
        setLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        setError("Mật khẩu phải tối thiểu 6 ký tự");
        setLoading(false);
        return;
      }

      // Check if email already exists
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.some((u: any) => u.email === formData.email)) {
        setError("Email này đã được đăng ký");
        setLoading(false);
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      // Auto login
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        })
      );

      router.push("/");
    } catch {
      setError("Có lỗi xảy ra");
    } finally {
      setLoading(false);
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "Quản trị viên";
      case "chang":
        return "Chàng";
      case "nang":
        return "Nàng";
      default:
        return role;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Đăng ký
          </CardTitle>
          <CardDescription>Tạo tài khoản mới trong thế giới của chúng ta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Tên của bạn
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Nhập tên"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Xác nhận mật khẩu
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Vai trò của bạn</label>
              <RadioGroup value={formData.role} onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as UserRole }))}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="chang" id="chang" />
                  <Label htmlFor="chang" className="font-normal cursor-pointer">Chàng</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nang" id="nang" />
                  <Label htmlFor="nang" className="font-normal cursor-pointer">Nàng</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="font-normal cursor-pointer">Quản trị viên</Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              disabled={loading}
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Đã có tài khoản?{" "}
              <Link
                href="/auth/login"
                className="text-primary hover:underline font-medium"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
