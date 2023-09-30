import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Snippets",
    description: "Your favourite snippets",
};

export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return children;
  }