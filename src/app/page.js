import BackButton from "@/components/common/Button/BackButton";
import GoldButton from "@/components/common/Button/GoldButton";
import VoucherDetail from "@/components/common/VoucherDetail/VoucherDetail";
import VoucherModal from "@/components/common/VoucherModal/VoucherModal";
import FilterBar from "../components/FilterBar/FilterBar";
import FilterTags from "../components/FilterTags/FilterTags";
import Diagram from "@/components/Diagram/Diagram";
import StartingPage from "./startingPage";
import ConcertsPage from "./page/concerts/page";
import ConcertEventCard from "@/components/Card/ConcertEventCard";
import ProductItem from "@/components/ProductItem/ProductItem";
import ConcertCard from "@/components/Card/ConcertCard";

export default function Home() {
  return (
    <ConcertsPage/>

  );
}
