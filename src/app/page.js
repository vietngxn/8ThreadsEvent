import VoucherModal from "@/components/common/VoucherModal/VoucherModal";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212]">
      <VoucherModal isOpen />
    </div>
  );
}
