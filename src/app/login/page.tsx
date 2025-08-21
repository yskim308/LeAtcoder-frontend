"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  if (!backendBaseUrl) {
    throw new Error("NEXT_PUBLIC_BACKEND_BASE_URL NOT SET IN .env");
  }

  const handleGoogleSignIn = () => {
    router.push(`${backendBaseUrl}/auth/login/google`);
    console.log("Google sign-in clicked");
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            className="w-full h-11 gap-2 bg-transparent"
          >
            <Image src="/google-logo.svg" alt="Google" width={30} height={30} />
            Continue with Google
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-foreground">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline hover:text-foreground">
              Privacy Policy
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
