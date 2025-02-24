import type { Metadata } from "next";
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME, NEXT_PUBLIC_CLIENT_BASE_URL } from "@/constants";
import Providers from "@/providers/Providers";

export const metadata: Metadata = {
  title: {
    template: `%s | MayIssue`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(NEXT_PUBLIC_CLIENT_BASE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
