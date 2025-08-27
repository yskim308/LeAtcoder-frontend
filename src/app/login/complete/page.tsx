// app/login/complete/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { backendBaseUrl } from "@/lib/api"; // uses your NEXT_PUBLIC_BACKEND_BASE_URL

// Shape returned by your backend: { accessToken: string }
type CompleteResponse = { accessToken: string };

export default function CompletePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tempToken = searchParams.get("tempToken"); // URL has ?tempToken=...
  const ran = useRef(false);                       // guard to run only once
  const [message, setMessage] = useState("Completing auth...");

  useEffect(() => {
    if (ran.current) return;
    if (!tempToken) {
      setMessage("Missing tempToken in URL");
      return;
    }
    ran.current = true;

    (async () => {
      try {
        const url = `${backendBaseUrl}/auth/complete?token=${encodeURIComponent(tempToken)}`;
        console.log("[complete] requesting:", url);
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          // No credentials here; this call returns JSON and sets cookie server-side if you do
        });

        console.log("[complete] status:", res.status);
        const text = await res.text();             // read raw once for debugging
        console.log("[complete] raw body:", text);

        if (!res.ok) {
          setMessage(`Login complete failed (${res.status})`);
          return;
        }

        const data: CompleteResponse = JSON.parse(text);
        if (!data?.accessToken) {
          setMessage("No accessToken returned from server");
          return;
        }

        // Store the access token (mirror your current store logic)
        try {
          localStorage.setItem("accessToken", data.accessToken);
        } catch {}
        setMessage("Success! Redirecting...");
        // Use replace to avoid back button returning to complete page
        router.replace("/");
      } catch (e: any) {
        console.error("[complete] error:", e);
        setMessage("Network error during completion");
      }
    })();
  }, [tempToken, router]);

  // Render a visible status so you don't just see a semicolon or blank page
  return (
    <div style={{ padding: 16, fontFamily: "monospace" }}>
      <div>tempToken present: {String(!!tempToken)}</div>
      <div>{message}</div>
    </div>
  );
}
