import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <div className="text-blue-600 text-lg font-semibold">page</div>;
}
