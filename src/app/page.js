import Image from "next/image";
import Button from "@/components/common/Button/GoldButton.jsx";
import StartingPage from "./startingPage";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import ProductItem from "@/components/ProductItem/ProductItem";
import LoginPage from "./login/page";
import Navbar from "@/components/common/Navbar/Navbar";
import ConcertCard from "@/components/Card/ConcertCard";
import ConcertDetail from "@/components/Card/ConCertDetail";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <ConcertDetail />
    </div>
  );
}
