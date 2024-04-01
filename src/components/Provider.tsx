"use client";
import React from "react";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
function Provider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      // attribute="class"
      // defaultTheme="system"
      // enableSystem
      // disableTransitionOnChange
      {...props}
    >
      <SessionProvider>{children}</SessionProvider>
    </NextThemesProvider>
  );
}

export default Provider;
