import { useEffect } from "react";
import ViewTicketPage from "./viewticket";

export default function ViewTicketPageTest() {
    const [data, setData] = useState(null);
    useEffect()// FETCHING
    return (
        <ViewTicketPage props={data} />
    );
}