"use client";

import { actions, useDispatch } from "@store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export type Props = {};

function Logout({}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(actions.user.logout());
    router.replace("/");
  });

  return null;
}

export default Logout;
