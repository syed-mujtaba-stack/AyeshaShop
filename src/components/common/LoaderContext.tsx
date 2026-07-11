"use client";

import { createContext, useContext } from "react";

const LoaderContext = createContext(false);

export function useLoaderReady() {
  return useContext(LoaderContext);
}

export { LoaderContext };
