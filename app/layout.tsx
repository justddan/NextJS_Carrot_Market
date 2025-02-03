import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Rubik_Scribble } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--roboto-text",
});

const rubick = Rubik_Scribble({
  subsets: ["latin"],
  style: "normal",
  weight: "400",
  variable: "--rubick-text",
});

// const metallica = localFont({
//   src: "./metalica.ttf",
// });

export const metadata: Metadata = {
  title: {
    template: "%s | Karrot Market",
    default: "Karrot Market",
  },
  description: "Sell and buy all the things!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${rubick.variable} antialiased bg-neutral-900 text-white max-w-screen-sm mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
