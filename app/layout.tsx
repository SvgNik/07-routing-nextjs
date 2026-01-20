import type { Metadata } from "next";
import "./globals.css";
import Providers from "./Providers"; 

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Manage your notes",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          {modal}
        </Providers>
      </body>
    </html>
  );
}