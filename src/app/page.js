import SearchInput from "@/components/common/SearchInput";
import Image from "next/image";
import Button from "@/components/common/Button/GoldButton.jsx";
import StartingPage from "./startingPage";
import ConcertEventCard from "@/components/Card/ConcertEventCard";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <CheckoutPage />
    </div>
  )
}
