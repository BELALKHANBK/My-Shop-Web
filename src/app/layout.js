"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Navbar from "./componets/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Navbar/>
          {children}
          </SessionProvider>
      </body>
    </html>
  );
}
