"use client";

import { useRef, useCallback } from "react";
import localFont from "next/font/local";
import Clock from "@/components/common/Clock";
const fogtwono5 = localFont({
    src: "../../public/assets/fonts/fogtwono5/FogtwoNo5.otf",
    variable: "--font-fogtwono5",
    display: "swap",
});
const blocusregular = localFont({
    src: "../../public/assets/fonts/blocus/Blocus/Blocus-webfont/blocuswebfont.ttf",
    variable: "--font-blocusregular",
    display: "swap",
});
const brunoace = localFont({
    src: "../../public/assets/fonts/Bruno_Ace_SC/BrunoAceSC-Regular.ttf",
    variable: "--font-brunoace",
    display: "swap",
});
export default function Highlight() {
    const containerRef = useRef(null);



    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const el = containerRef.current;
        if (el) {
            el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
            el.style.setProperty("--my", `${e.clientY - rect.top}px`);
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        const el = containerRef.current;
        if (el) {
            el.style.setProperty("--mx", "-9999px");
            el.style.setProperty("--my", "-9999px");
        }
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-screen overflow-hidden"
            style={{ "--mx": "-9999px", "--my": "-9999px" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('/FirstPage.png')",
                    filter: "brightness(1.4)",
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle 200px at var(--mx) var(--my), transparent 0%, rgba(0,0,0,0.5) 100%)",
                    transition: "background 0.05s ease",
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: "radial-gradient(circle 180px at var(--mx) var(--my), rgba(255,255,255,0.2) 0%, transparent 100%)",
                    mixBlendMode: "screen",
                    transition: "background 0.05s ease",
                }}
            />

            {/* Sweeping spotlight beams */}
            <div className="absolute inset-0 pointer-events-none spotlight-beam beam-1" />
            <div className="absolute inset-0 pointer-events-none spotlight-beam beam-2" />
            <div className="absolute inset-0 pointer-events-none spotlight-beam beam-3" />

            <div className="relative z-10 flex flex-col items-center min-h-screen text-white text-center px-6">
                <img style={{
                    width: "150px"
                }
                } src="/assets/images/logo.png" alt="" />
                <img src="/assets/images/anh_trai_vuot_ngan_chong_gai.png" alt="" style={{
                    width: "100%",
                }} />

                <div style={
                    {
                        width: "1200px",
                        marginTop: "100px"
                    }
                }>
                    <Clock
                        fontFamilyDigital={brunoace.style.fontFamily}
                        fontFamilyMessage={fogtwono5.style.fontFamily}
                    />
                    <div
                        className="relative z-10"
                        style={{
                            backgroundImage: "url('/assets/images/common-panel 1.png')",
                            backgroundRepeat: "no-repeat",
                            width: "40%",
                            height: "1500px",
                        }}>
                        <div>
                            <span style={{
                                fontFamily: fogtwono5.style.fontFamily,
                                color: "black",
                                fontSize: "100px"
                            }}>TRENDING</span>
                            <span style={{
                                display: "block",
                                fontFamily: fogtwono5.style.fontFamily,
                                color: "black",
                                fontSize: "100px",
                                rotate: "90deg",
                                transform: "translate(5%, -100%)",

                            }}>TRACK</span>
                            <span style={{
                                fontFamily: blocusregular.style.fontFamily,
                                color: "black",
                                fontSize: "30px",
                                width: "200px",
                                display: "block",
                                transform: "translate(50%, -45%)",
                            }}>
                                The most-played and talked-about songs from live concerts.
                            </span>
                            <img style={{
                                width: "400px",
                                margin: "auto",
                                display: "block",
                            }} src="/assets/images/nhasaosang.png" alt="" />
                            <span style={{
                                fontFamily: fogtwono5.style.fontFamily,
                                color: "black",
                                fontSize: "60px",
                                display: "block",
                            }}>Trong Com</span>
                            <span style={{
                                fontFamily: brunoace.style.fontFamily,
                                color: "black",
                                fontSize: "25px",
                                display: "block",
                            }}>
                                14,162,110
                                <span
                                    style={{
                                        fontFamily: brunoace.style.fontFamily,
                                        color: "black",
                                        fontSize: "18px",
                                    }}
                                >          views</span>
                            </span>
                            <span style={{
                                fontFamily: fogtwono5.style.fontFamily,
                                fontSize: "48px",
                                display: "block",
                                backgroundColor: "black",
                                color: "white",
                                width: "340px",
                                height: "30px",
                                marginLeft: "140px",
                                lineHeight: "30px",
                                marginTop: "40px",
                                textAlign: "left",
                            }}>
                                <a style={{ width: "100%", display: "block" }} href="https://www.youtube.com">PLAY NOW</a>
                            </span>
                            <span style={{
                                fontFamily: fogtwono5.style.fontFamily,
                                fontSize: "48px",
                                display: "block",
                                backgroundColor: "black",
                                color: "white",
                                width: "340px",
                                height: "30px",
                                marginLeft: "140px",
                                lineHeight: "30px",
                                marginTop: "20px",
                                textAlign: "left",
                            }}>
                                <a style={{ width: "100%", display: "block" }} href="https://www.youtube.com">SHARE</a>
                            </span>
                            <div style={{
                                marginTop: "30px"
                            }}>
                                <span style={{
                                    fontFamily: fogtwono5.style.fontFamily,
                                    color: "black",
                                    fontSize: "20px",
                                    display: "block",
                                    textAlign: "left",
                                    marginLeft: "100px",
                                }}>
                                    Song: Trong Com
                                </span>
                                <span style={{
                                    fontFamily: fogtwono5.style.fontFamily,
                                    color: "black",
                                    fontSize: "20px",
                                    display: "block",
                                    textAlign: "left",
                                    marginLeft: "100px",
                                }}>
                                    Performed by: Nha Sao Sang
                                </span>
                                <span style={{
                                    fontFamily: fogtwono5.style.fontFamily,
                                    color: "black",
                                    fontSize: "20px",
                                    display: "block",
                                    textAlign: "left",
                                    marginLeft: "100px",
                                }}>
                                    Composer: Dan Ca Quan Ho Bac Ninh
                                </span>
                                <span style={{
                                    fontFamily: fogtwono5.style.fontFamily,
                                    color: "black",
                                    fontSize: "20px",
                                    display: "block",
                                    textAlign: "left",
                                    marginLeft: "100px",
                                }}>
                                    Music Director: Slim V
                                </span>
                                <span style={{
                                    fontFamily: fogtwono5.style.fontFamily,
                                    color: "black",
                                    fontSize: "20px",
                                    display: "block",
                                    textAlign: "left",
                                    marginLeft: "100px",
                                }}>
                                    Music Producer: Slim V
                                </span>
                                <span style={{
                                    fontFamily: fogtwono5.style.fontFamily,
                                    color: "black",
                                    fontSize: "20px",
                                    display: "block",
                                    textAlign: "left",
                                    marginLeft: "100px",
                                }}>
                                    Arrangers: Kriss Ngo, Slim V
                                </span>
                            </div>
                            <img src="/assets/images/img1.png" style={{ width: "80%", margin: "auto", marginTop: "30px" }} alt="" />

                        </div>

                    </div>
                    <div
                        className="relative z-10"
                        style={{
                            backgroundImage: "url('/assets/images/common-panel 1.png')",
                            backgroundRepeat: "no-repeat",
                            width: "40%",
                            height: "1200px",
                            float: "right",
                            top: "-400px"
                        }}>

                        <div>
                            <span style={{
                                fontFamily: fogtwono5.style.fontFamily,
                                color: "black",
                                fontSize: "100px"
                            }}>8THREADS</span>
                            <span style={{
                                display: "block",
                                fontFamily: fogtwono5.style.fontFamily,
                                color: "black",
                                fontSize: "100px",
                                rotate: "90deg",
                                transform: "translate(0%, -110%)",

                            }}>FES'25</span>
                            <span style={{
                                fontFamily: blocusregular.style.fontFamily,
                                color: "black",
                                fontSize: "30px",
                                width: "200px",
                                display: "block",
                                transform: "translate(50%, -75%)",
                            }}>
                                Some highlights from 8Threads Fes'25
                            </span>
                            <img src="./assets/images/image 2.png" style={{ width: "80%", margin: "auto", marginTop: "30px" }} alt="" />
                            <img src="./assets/images/image 3.png" style={{ width: "80%", margin: "auto", marginTop: "30px" }} alt="" />
                            <img src="./assets/images/image 4.png" style={{ width: "80%", margin: "auto", marginTop: "30px" }} alt="" />

                        </div>
                    </div>
                    <div
                        className="relative z-10"
                        style={{
                            backgroundImage: "url('/assets/images/common-panel 1.png')",
                            backgroundRepeat: "no-repeat",
                            width: "40%",
                            height: "1300px",
                            float: "left",
                            top: "600px"
                        }}>
                        <div>
                            <span style={{
                                fontFamily: fogtwono5.style.fontFamily,
                                color: "black",
                                fontSize: "100px"
                            }}>MOST VIEW</span>
                            <span style={{
                                display: "block",
                                fontFamily: fogtwono5.style.fontFamily,
                                color: "black",
                                fontSize: "100px",
                                rotate: "90deg",
                                transform: "translate(0%, -110%)",

                            }}>CLIP</span>
                            <span style={{
                                fontFamily: blocusregular.style.fontFamily,
                                color: "black",
                                fontSize: "30px",
                                width: "200px",
                                display: "block",
                                transform: "translate(50%, -95%)",
                            }}>
                                Top performance in 8Threads Fes'25
                            </span>
                            <iframe
                                width="80%"
                                height="215"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ margin: "auto", marginTop: "30px", display: "block" }}
                            ></iframe>
                        </div>

                    </div>
                </div>

            </div>

        </div >
    );
}
