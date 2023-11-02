import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "~/components/theme-provider";
import { NavBar } from "./components/navbar";
import { TopMenu } from "./components/top-menu";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Navigator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-background font-sans ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider headers={headers()}>
            <NavBar />
            <div className="flex pt-10 min-h-screen">
              <div className="flex flex-col items-center border-r bg-black w-[60px]">
                <TopMenu />
              </div>
              <div className="flex-1">{children}</div>
            </div>
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
