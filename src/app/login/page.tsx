"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const handleGoogleSignIn = () => {
    // TODO: Implement Google OAuth sign-in
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
