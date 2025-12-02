import { useEffect, useRef } from "react";
import Head from "next/head";

export default function CymaticsPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Dynamically load the minimal cymatic engine script from public/
    const script = document.createElement("script");
    script.src = "/engines/cymatics/cymatic-engine.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if ((window as any).Cymatic?.unmount) {
        try {
          (window as any).Cymatic.unmount();
        } catch {}
      }
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <title>144:99 Cymatics — Alchemical Visualization</title>
        <meta
          name="description"
          content="ND-safe, non-audio minimal cymatic visualization (a + b = d)."
        />
      </Head>
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
        }}>
        <section style={{ maxWidth: 960, width: "100%" }}>
          <h1 style={{ fontFamily: "Cinzel, serif", marginBottom: "1rem" }}>
            144:99 Cymatics — Alchemical Visualization
          </h1>
          <p style={{ opacity: 0.9, marginBottom: "1rem" }}>
            This is a minimal, non-audio cymatic bloom—safe by default. It draws
            a breathing mandala on the canvas. When you tap or click, it
            animates. No sound is required. Math: a + b = d.
          </p>
          <div
            style={{
              border: "1px solid #224",
              borderRadius: 8,
              overflow: "hidden",
            }}>
            <canvas
              id="cymatic"
              ref={canvasRef}
              style={{
                width: "100%",
                height: 420,
                display: "block",
                background:
                  "radial-gradient( circle at 50% 50%, #0a1628 0%, #05101a 100%)",
              }}
            />
          </div>
          <p style={{ marginTop: "0.75rem", fontSize: 14, opacity: 0.8 }}>
            Provenance: minimal placeholder engine served from{" "}
            <code>/public/engines/cymatics/</code>. Upgrade anytime to full
            audio-reactive bridge.
          </p>
        </section>
      </main>
    </>
  );
}
