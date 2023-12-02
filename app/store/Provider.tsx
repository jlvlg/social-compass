"use client";

import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import store from ".";

export type Props = {};

export function Provider({ children }: React.PropsWithChildren<Props>) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
