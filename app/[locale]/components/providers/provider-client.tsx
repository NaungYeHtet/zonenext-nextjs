"use client";

import { ReactNode } from "react";
import AuthProvider from "./auth-context";

export default function AuthProviderClient({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
