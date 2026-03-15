import BackButton from "@/components/common/Button/BackButton";
import GoldButton from "@/components/common/Button/GoldButton";
import VoucherDetail from "@/components/common/VoucherDetail/VoucherDetail";
import VoucherModal from "@/components/common/VoucherModal/VoucherModal";
import FilterBar from "../components/FilterBar/FilterBar";
import FilterTags from "../components/FilterTags/FilterTags";
import Diagram from "@/components/Diagram/Diagram";

export default function Home() {
  const [filters, setFilters] = useState({
    city: null,
    price: null,
    genre: null,
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212]">
      <Diagram />
    </div>
  );
}
