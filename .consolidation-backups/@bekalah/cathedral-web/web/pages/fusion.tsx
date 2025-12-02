import Head from "next/head";

export default function FusionKinkHeaven() {
  return (
    <>
      <Head>
        <title>Cathedral | 144:99 Alchemical Fusion Engine</title>
        <meta
          name="description"
          content="Status and links for the 144:99 Alchemical Fusion Engine. Consent-first, trauma-safe, ND-accommodations."
        />
      </Head>
      <div
        style={{
          minHeight: "100vh",
          background:
            "radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 100%)",
          color: "#fff",
        }}>
        <header
          style={{
            padding: "2rem",
            textAlign: "center",
            borderBottom: "2px solid #8b5a8c",
            background: "rgba(20,10,30,.8)",
          }}>
          <h1
            style={{
              margin: 0,
              fontSize: "2.2rem",
              background: "linear-gradient(135deg, #ffd700, #ff6b35, #4ecdc4)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
            ⚗️ 144:99 Alchemical Fusion Engine
          </h1>
          <p style={{ color: "#ffd700", margin: ".5rem 0 0 0" }}>
            Consent-first • Trauma-safe • ND accommodations
          </p>
        </header>

        <main
          style={{
            maxWidth: 1100,
            margin: "1.5rem auto",
            padding: "0 1rem 2rem",
          }}>
          <section
            style={{
              background: "rgba(139,90,140,.15)",
              border: "1px solid #8b5a8c",
              borderRadius: 12,
              padding: "1rem 1.25rem",
              marginBottom: "1rem",
            }}>
            <h2 style={{ marginTop: 0, color: "#8b5a8c" }}>Status</h2>
            <ul>
              <li>
                System present in repository: engines, APIs, and Godot/GD
                scripts reference fusion gates and combinations.
              </li>
              <li>
                Mathematics: simple compositional math a + b = d governs
                synthesis across data, sound, text, and form.
              </li>
              <li>
                Static site publishing: this page is included in the Next.js
                export for GitHub Pages and Vercel.
              </li>
              <li>
                Game slot: see{" "}
                <a style={{ color: "#4ecdc4" }} href="/godot/">
                  /godot/
                </a>{" "}
                for the HTML5 build drop-in.
              </li>
            </ul>
          </section>

          <section
            style={{
              background: "rgba(20,10,30,.6)",
              border: "1px solid #4a0e4e",
              borderRadius: 12,
              padding: "1rem 1.25rem",
              marginBottom: "1rem",
            }}>
            <h2 style={{ marginTop: 0, color: "#ffd700" }}>
              Where the features live
            </h2>
            <ul>
              <li>
                Godot fusion systems:{" "}
                <a
                  style={{ color: "#4ecdc4" }}
                  href="https://github.com/Bekalah/cathedral/tree/merge/cathedral-master-20251101/godot/scripts/core">
                  godot/scripts/core
                </a>
              </li>
              <li>
                Node systems (fusion gates, combos):{" "}
                <a
                  style={{ color: "#4ecdc4" }}
                  href="https://github.com/Bekalah/cathedral/search?q=fusion&type=code">
                  src/*
                </a>
              </li>
              <li>
                OpenSpec and project docs:{" "}
                <a
                  style={{ color: "#4ecdc4" }}
                  href="https://github.com/Bekalah/cathedral/tree/merge/cathedral-master-20251101/openspec">
                  openspec/*
                </a>
              </li>
            </ul>
          </section>

          <section
            style={{
              background: "rgba(45,90,39,.12)",
              border: "1px solid #7fb069",
              borderRadius: 12,
              padding: "1rem 1.25rem",
            }}>
            <h2 style={{ marginTop: 0, color: "#7fb069" }}>
              Quality, consent, and vision
            </h2>
            <p style={{ lineHeight: 1.6 }}>
              This is not sexual content. It’s alchemical, artistic synthesis:
              combining modalities so the user can channel a visionary
              point-of-view. Every experience is consent-first, trauma-safe,
              ND-accommodating, and off by default unless the user opts in.
            </p>
          </section>

          <div style={{ textAlign: "center", marginTop: "1.25rem" }}>
            <a
              href="/"
              style={{ color: "#4ecdc4", textDecoration: "underline" }}>
              ← Back to Home
            </a>
          </div>
        </main>
      </div>
    </>
  );
}
