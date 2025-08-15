// app/pagina/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";

export async function generateStaticParams() {
  // Cambia el rango según el número de páginas de tu libro
  return Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function Pagina({ params }: { params: { id: string } }) {
  const audioUrl = `/audios/${params.id}.mp3`;
  const [canPlay, setCanPlay] = useState(false);
  const [audio] = useState(() => new Audio(audioUrl));

  useEffect(() => {
    audio.play()
      .then(() => setCanPlay(true))
      .catch(() => setCanPlay(false));
  }, [audio]);

  const handlePlay = () => {
    audio.play();
    setCanPlay(true);
  };

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Página {params.id}</h1>
      {!canPlay && (
        <button
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
          onClick={handlePlay}
        >
          ▶ Reproducir audio
        </button>
      )}
      <audio src={audioUrl} controls style={{ marginTop: "1rem", width: "100%" }} />
    </main>
  );
}
