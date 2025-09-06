// app/pagina/[id]/player.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BOOK_CONFIG, getPageMetadata, getPageAssets } from "@/lib/config";

export default function Player({ id }: { id: string }) {
  const [canPlay, setCanPlay] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  
  // Configuración del libro
  const totalPages = BOOK_CONFIG.getTotalPages();
  const currentPage = parseInt(id);
  const pageMetadata = getPageMetadata(currentPage);
  const pageAssets = getPageAssets(currentPage);
  
  // URLs de assets
  const audioUrl = pageAssets.audioUrl;
  const imageUrl = pageAssets.imageUrl;
  
  // Navegación (la página 0 es secreta, no tiene navegación normal)
  const isSecretPage = currentPage === 0;
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages - 1;
  
  // Para la página secreta, solo puede ir al inicio
  const nextPage = isSecretPage ? "/" : (isLastPage ? "/" : `/pagina/${currentPage + 1}`);
  const prevPage = isSecretPage ? "/" : (isFirstPage ? "/" : `/pagina/${currentPage - 1}`);

  useEffect(() => {
    if (audioUrl) {
      const audioElement = new Audio(audioUrl);
      setAudio(audioElement);
      
      audioElement.play()
        .then(() => setCanPlay(true))
        .catch(() => setCanPlay(false));
    }
  }, [audioUrl]);

  const handlePlay = () => {
    if (audio) {
      audio.play();
      setCanPlay(true);
    }
  };

  return (
    <main style={{ 
      padding: "2rem", 
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}>
      {/* Contenido principal */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {/* Título de la página */}
        <h1 style={{ 
          fontSize: "2.5rem", 
          marginBottom: "2rem",
          color: "#2c3e50",
          fontFamily: "serif"
        }}>
          {pageMetadata.title}
        </h1>

        {/* Imagen de la página */}
        <div style={{ 
          marginBottom: "2rem",
          display: "flex",
          justifyContent: "center"
        }}>
          {imageUrl ? (
            <Image 
              src={imageUrl}
              alt={`Imagen de la página ${id}`}
              width={400}
              height={300}
              style={{
                maxWidth: "400px",
                maxHeight: "300px",
                borderRadius: "10px",
                border: "2px solid #ddd",
                objectFit: "contain"
              }}
            />
          ) : (
            <div style={{
              width: "400px",
              height: "300px",
              backgroundColor: "#f0f0f0",
              border: "2px solid #ddd",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              color: "#666"
            }}>
              {pageAssets.hasAssets 
                ? `Imagen no encontrada para ${pageAssets.folderName}`
                : `Página ${id} sin assets configurados`}
            </div>
          )}
        </div>

        {/* Subtítulo */}
        <p style={{ 
          fontSize: "1.3rem", 
          marginBottom: "2rem",
          color: "#7f8c8d",
          fontStyle: "italic"
        }}>
          {pageMetadata.subtitle}
        </p>

        {/* Control de audio */}
        {pageAssets.hasAssets && (
          <>
            {!canPlay && (
              <button
                style={{
                  padding: "1rem 2rem",
                  fontSize: "1.2rem",
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  marginBottom: "1rem",
                  transition: "background-color 0.3s"
                }}
                onClick={handlePlay}
                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#c0392b"}
                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = "#e74c3c"}
              >
                ▶ Reproducir audio
              </button>
            )}

            <audio
              src={audioUrl || undefined}
              controls
              style={{ width: "100%", maxWidth: "400px", marginTop: "1rem" }}
            />
          </>
        )}

        {!pageAssets.hasAssets && (
          <p style={{ 
            fontSize: "1rem", 
            color: "#999",
            fontStyle: "italic"
          }}>
            No hay audio disponible para esta página
          </p>
        )}
      </div>

      {/* Navegación */}
      <div style={{ 
        display: "flex", 
        justifyContent: isSecretPage ? "center" : "space-between", 
        alignItems: "center",
        marginTop: "2rem",
        paddingTop: "2rem",
        borderTop: "1px solid #eee"
      }}>
        {/* Página secreta: solo botón de volver al inicio */}
        {isSecretPage ? (
          <Link 
            href="/"
            style={{
              display: "inline-block",
              padding: "0.8rem 1.5rem",
              fontSize: "1rem",
              backgroundColor: "#e74c3c",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              transition: "background-color 0.3s"
            }}
            onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = "#c0392b"}
            onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = "#e74c3c"}
          >
            🤫 Volver al Inicio
          </Link>
        ) : (
          <>
            {/* Botón anterior */}
            <div style={{ width: "150px", textAlign: "left" }}>
              {!isFirstPage && (
                <Link 
                  href={prevPage}
                  style={{
                    display: "inline-block",
                    padding: "0.8rem 1.5rem",
                    fontSize: "1rem",
                    backgroundColor: "#95a5a6",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "8px",
                    transition: "background-color 0.3s"
                  }}
                  onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = "#7f8c8d"}
                  onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = "#95a5a6"}
                >
                  ← Anterior
                </Link>
              )}
            </div>

            {/* Indicador de página */}
            <div style={{ 
              fontSize: "1rem", 
              color: "#7f8c8d",
              fontWeight: "bold"
            }}>
              {currentPage} / {totalPages - 1}
            </div>

            {/* Botón siguiente */}
            <div style={{ width: "150px", textAlign: "right" }}>
              <Link 
                href={nextPage}
                style={{
                  display: "inline-block",
                  padding: "0.8rem 1.5rem",
                  fontSize: "1rem",
                  backgroundColor: "#3498db",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "8px",
                  transition: "background-color 0.3s"
                }}
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = "#2980b9"}
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = "#3498db"}
              >
                {isLastPage ? "← Inicio" : "Siguiente →"}
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
