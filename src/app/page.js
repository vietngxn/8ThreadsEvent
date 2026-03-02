import Image from "next/image";
import Button from "@/components/common/Button/ConfirmButton.jsx";
import ProductItem from "@/components/common/ProductItem/ProductItem.jsx";
import Diagram from "@/components/common/Diagram/Diagram"


export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <main className="flex min-h-screen w-full">
        
        {/* LEFT – SƠ ĐỒ */}
        <section className="w-[65%] flex items-center justify-start pl-12">
          <Diagram />
        </section>

        {/* RIGHT – PANEL */}
        <section className="w-[35%] flex items-center justify-center">
          {/* Legend + Giỏ vé */}
        </section>

      </main>
    </div>
  )
}
