"use client";

import AuthLayout from "@components/auth";
import { actions, useDispatch, useSelector } from "@store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export type Props = {};

function EnsureLogin({ children }: React.PropsWithChildren<Props>) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const res = dispatch(actions.user.loadUser(savedUser));

    return () => {
      res.abort();
    };
  }, [dispatch, router]);

  return (
    <>
      {user.token ? (
        <div>
          <div>
            <div></div>
            {children}
          </div>
        </div>
      ) : (
        <AuthLayout />
      )}
    </>
  );
}

export default EnsureLogin;
