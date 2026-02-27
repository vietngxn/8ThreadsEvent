import SearchInput from "@/components/common/SearchInput";
import Image from "next/image";
import Button from "@/components/common/Button/ConfirmButton.jsx";
import StartingPage from "./startingPage";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <StartingPage />
    </div>
  );
}
