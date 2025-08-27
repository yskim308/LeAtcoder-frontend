"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { backendBaseUrl } from "@/lib/api";

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    // Use top-level navigation for OAuth start
    window.location.href = `${backendBaseUrl}/auth/login/google`;
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleGoogleSignIn} variant="outline" className="w-full h-11 gap-2 bg-transparent">
            <Image src="/google-logo.svg" alt="Google" width={30} height={30} />
            Continue with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
