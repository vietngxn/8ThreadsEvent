import BackButton from "@/components/common/Button/BackButton";
import GoldButton from "@/components/common/Button/GoldButton";
import VoucherDetail from "@/components/common/VoucherDetail/VoucherDetail";
import VoucherModal from "@/components/common/VoucherModal/VoucherModal";
import FilterBar from "../components/FilterBar/FilterBar";
import FilterTags from "../components/FilterTags/FilterTags";
import Diagram from "@/components/Diagram/Diagram";
import StartingPage from "./startingPage";
import ViewTicketPageTest from "./page/viewticket/viewticket";
import ConcertsPage from "./page/concerts/page";
import ConcertEventCard from "@/components/Card/ConcertEventCard";
import ProductItem from "@/components/ProductItem/ProductItem";
import ConcertCard from "@/components/Card/ConcertCard";
import SelectSeatPage from "./page/selectSeat/page";
import ViewTicketPage from "./page/viewticket/viewticket";
import CheckoutRoutePage from "./page/checkout/page";
import HighlightPage from "./highlight/page";
import LoginPage from "./page/login/page";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileInfomation from "@/components/profile/ProfileInfomation/ProfileInfomation";
import MyTickets from "@/components/MyTicket/MyTicket";

import { redirect } from "next/navigation";
import ProfilePage from "./page/infomation/page";

export default function Home() {
  return (
    <StartingPage />
  )
}
