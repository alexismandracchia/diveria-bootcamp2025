import { Roboto } from "next/font/google";
import "./globals.css";
import "flowbite";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}
