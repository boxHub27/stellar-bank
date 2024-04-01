import "@/styles/globals.css";

import { Poppins } from "next/font/google";
import { headers } from "next/headers";
import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "@/trpc/react";
// import NavBar from "./components/NavBar";
// import NavHolder from "./components/NavHolder";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";
// import { Suspense } from "react";
// import Loading from "./profilemanagement/loading";

const poppins = Poppins({
  subsets: ["latin-ext"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Stellar Online Banking",
  description: "Invest and save your Money Securedly",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className}`}>
        <TRPCReactProvider headers={headers()}>
          <Provider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </Provider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
