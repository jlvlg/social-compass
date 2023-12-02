"use client";

import { useSelector } from "@store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export type Props = {};

function EnsureLogin({ children }: React.PropsWithChildren<Props>) {
  const user = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!user.token) router.replace("/signin");
  });

  return children;
}

export default EnsureLogin;
