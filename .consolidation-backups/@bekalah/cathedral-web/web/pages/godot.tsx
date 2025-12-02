import Head from "next/head";

export default function GodotPage() {
  return (
    <>
      <Head>
        <title>Cathedral | Godot</title>
        <meta
          name="description"
          content="Godot HTML5 game export hosted under /godot/."
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
            padding: "1.5rem",
            textAlign: "center",
            borderBottom: "1px solid #4a0e4e",
            background: "rgba(20,10,30,.8)",
          }}>
          <h1 style={{ margin: 0 }}>🏰 Cathedral Godot</h1>
          <p style={{ color: "#ffd700", margin: ".5rem 0 0 0" }}>
            Static export served from <code>/godot/</code>
          </p>
        </header>
        <main style={{ maxWidth: 1200, margin: "1rem auto", padding: "1rem" }}>
          <iframe
            src="/godot/index.html"
            title="Godot Game"
            style={{
              width: "100%",
              height: "80vh",
              border: "1px solid #4a0e4e",
              borderRadius: 12,
              background: "#0b0f1a",
            }}
          />
          <div style={{ textAlign: "center", marginTop: "1rem" }}>
            <a
              href="/godot/"
              style={{ color: "#4ecdc4", textDecoration: "underline" }}>
              Open in full page
            </a>
          </div>
        </main>
      </div>
    </>
  );
}
