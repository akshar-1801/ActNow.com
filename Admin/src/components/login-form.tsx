import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("token", "demo-token");
    window.location.href = "/dashboard";
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-8 items-center justify-center min-h-[60vh] bg-white rounded-xl shadow-lg p-8 w-full max-w-md mx-auto",
        className
      )}
      {...props}
    >
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center bg-green-100 rounded-full w-16 h-16 mb-2">
              <GalleryVerticalEnd className="size-8 text-green-700" />
            </div>
            <h1 className="text-2xl font-bold text-green-900">Welcome Back!</h1>
            <p className="text-gray-600 text-sm text-center max-w-xs">
              Sign in to your admin dashboard to manage projects, users, and
              more.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
