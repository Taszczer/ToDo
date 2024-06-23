'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-y-hidden bg-white `}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
      </body>
      <Toaster position="top-right" closeButton theme="light" />
    </html>
  );
}
