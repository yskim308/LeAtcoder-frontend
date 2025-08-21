"use client";
import { useTokenStore } from "@/store/token-store";
import { useQuery } from "@tanstack/react-query";
import { backendBaseUrl } from "@/lib/api";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface CompleteReponse {
  accessToken: string;
}

export default function CompletePage() {
  const tokenStore = useTokenStore();
  const { tempToken } = useParams();
  const router = useRouter();

  const completeAuth = async () => {
    const response = await axios.get<CompleteReponse>(
      `${backendBaseUrl}/complete/${tempToken}`,
    );
    return response.data;
  };

  const { data, isSuccess, isError } = useQuery({
    queryKey: ["complete"],
    queryFn: completeAuth,
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      router.push("/?error=login_complete_error");
      return;
    }
    if (isSuccess) {
      tokenStore.setToken(data.accessToken);
      router.push("/");
      return;
    }
  }, [data, isError, isSuccess, router, tokenStore]);

  return <h1>copmleting auth...</h1>;
}
