import "./globals.css";
import { Inter } from "next/font/google";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthCheck from "@/hoc/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CodeHub",
  description: "Crafted with ❤️ by Yash",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthCheck>
          {children}
          <ToastContainer />
        </AuthCheck>
      </body>
    </html>
  );
}
