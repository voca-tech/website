import { ImageResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";
export const alt = "VOCA — plataforma de DHO para gestão, comunicação e inteligência de pessoas";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
    const logo = await readFile(path.join(process.cwd(), "public", "logo-voca-negativo.png"));
    const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "72px 80px",
                    background: "linear-gradient(135deg, #012e31 0%, #016b72 100%)",
                    position: "relative",
                }}
            >

                <svg
                    width="560"
                    height="560"
                    viewBox="0 0 28 28"
                    style={{ position: "absolute", right: -132, bottom: -18, opacity: 0.085 }}
                >
                    <rect x="10" width="18" height="18" rx="5" fill="#ffffff" fillOpacity="0.38" />
                    <path
                        fill="#ffffff"
                        d="M4 3h12a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-6l-6 7v-7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4z"
                    />
                </svg>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={logoSrc} alt="VOCA" width={232} height={74} />

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div
                        style={{
                            display: "flex",
                            fontSize: 60,
                            lineHeight: 1.15,
                            color: "#ffffff",
                            maxWidth: 880,
                            letterSpacing: "-0.02em",
                        }}
                    >
                        A plataforma de DHO que conecta, organiza e ativa as pessoas da sua empresa
                    </div>

                    <div style={{ display: "flex", marginTop: 40, alignItems: "center" }}>
                        <div style={{ display: "flex", width: 72, height: 4, background: "#5eead4" }} />
                        <div style={{ display: "flex", marginLeft: 24, fontSize: 30, color: "#8fd8d5" }}>
                            21 funcionalidades · 1 plataforma
                        </div>
                    </div>
                </div>
            </div>
        ),
        size
    );
}
