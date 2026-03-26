"use client";

import dynamic from "next/dynamic";
import localFont from "next/font/local";

const fogtwono5 = localFont({
    src: "../../../public/assets/fonts/fogtwono5/FogtwoNo5.otf",
    variable: "--font-fogtwono5",
    display: "swap",
});

const brunoace = localFont({
    src: "../../../public/assets/fonts/Bruno_Ace_SC/BrunoAceSC-Regular.ttf",
    variable: "--font-brunoace",
    display: "swap",
});

const Clock = dynamic(() => import("@/components/common/Clock"), { ssr: false });

export default function ClockPage() {
    return (
        <Clock
            fontFamilyDigital={brunoace.style.fontFamily}
            fontFamilyMessage={fogtwono5.style.fontFamily}
        />
    );
}
