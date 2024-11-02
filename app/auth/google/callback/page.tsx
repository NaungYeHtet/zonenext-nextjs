"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { storeToken } from "@/app/[locale]/lib/actions";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authCode, setAuthCode] = useState<string | null>(null);

  useEffect(() => {
    const code = searchParams.get("code"); // Capture the `code` from query params
    if (code) {
      setAuthCode(code);
    }
  }, [searchParams]);

  useEffect(() => {
    if (authCode) {
      // Send `code` to your backend as a GET request to exchange for `access_token`
      fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/auth/google/callback?code=${authCode}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.data.access_token) {
            storeToken({ access_token: data.data.access_token });
            router.push("/profile"); // Redirect after storing the token
          }
        })
        .catch((error) => {
          console.error("Error exchanging code for token:", error);
          // Handle error, e.g., redirect to login with an error message
        });
    }
  }, [authCode, router]);

  return <p>Logging you in...</p>;
}
