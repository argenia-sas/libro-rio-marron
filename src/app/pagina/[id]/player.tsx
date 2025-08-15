// app/pagina/[id]/player.tsx
"use client";

import { useEffect, useState } from "react";

export default function Player({ id }: { id: string }) {
  const audioUrl = `/audios/${id}.mp3`;
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
      <h1>Página {id}</h1>

      {!canPlay && (
        <button
          style={{
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
          onClick={handlePlay}
        >
          ▶ Reproducir audio
        </button>
      )}

      <audio
        src={audioUrl}
        controls
        style={{ width: "100%", marginTop: "1rem" }}
      />
    </main>
  );
}
