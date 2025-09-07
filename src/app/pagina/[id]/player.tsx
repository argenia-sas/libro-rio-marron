// app/pagina/[id]/player.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BOOK_CONFIG, getPageMetadata, getPageAssets } from "@/lib/config";

export default function Player({ id }: { id: string }) {
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
      
      // Reproducir automáticamente cuando se carga la página
      audioElement.play().catch((error) => {
        // Si falla la reproducción automática (políticas del navegador),
        // el usuario puede usar el botón manual
        console.log("Reproducción automática bloqueada:", error);
      });
    }
  }, [audioUrl]);

  const handlePlay = () => {
    if (audio) {
      audio.play();
    }
  };

  return (
    <main style={{ 
      padding: "1rem", 
      textAlign: "center",
      maxWidth: "100%",
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
          fontSize: "clamp(1.5rem, 5vw, 2.5rem)", 
          marginBottom: "1.5rem",
          color: "#2c3e50",
          fontFamily: "serif",
          padding: "0 0.5rem",
          lineHeight: "1.2"
        }}>
          {pageMetadata.title}
        </h1>

        {/* Imagen de la página */}
        <div style={{ 
          marginBottom: "1.5rem",
          display: "flex",
          justifyContent: "center",
          padding: "0 1rem"
        }}>
          {imageUrl ? (
            <Image 
              src={imageUrl}
              alt={`Imagen de la página ${id}`}
              width={400}
              height={300}
              style={{
                width: "100%",
                maxWidth: "400px",
                height: "auto",
                borderRadius: "10px",
                border: "2px solid #ddd",
                objectFit: "contain"
              }}
            />
          ) : (
            <div style={{
              width: "100%",
              maxWidth: "400px",
              height: "250px",
              backgroundColor: "#f0f0f0",
              border: "2px solid #ddd",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "clamp(0.9rem, 3vw, 1.2rem)",
              color: "#666",
              padding: "1rem",
              textAlign: "center"
            }}>
              {pageAssets.hasAssets 
                ? `Imagen no encontrada para ${pageAssets.folderName}`
                : `Página ${id} sin assets configurados`}
            </div>
          )}
        </div>

        {/* Control de audio */}
        {pageAssets.hasAssets && (
          <>
            <button
              style={{
                padding: "clamp(1rem, 3vw, 1.5rem)",
                fontSize: "clamp(2rem, 6vw, 3rem)",
                backgroundColor: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                marginBottom: "1.5rem",
                transition: "all 0.3s",
                width: "clamp(70px, 15vw, 100px)",
                height: "clamp(70px, 15vw, 100px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem auto",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
              }}
              onClick={handlePlay}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = "#c0392b";
                (e.target as HTMLButtonElement).style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.backgroundColor = "#e74c3c";
                (e.target as HTMLButtonElement).style.transform = "scale(1)";
              }}
              title="Escuchar audio"
            >
              🔊
            </button>

            <audio
              src={audioUrl || undefined}
              style={{ display: "none" }}
            />
          </>
        )}

        {!pageAssets.hasAssets && (
          <p style={{ 
            fontSize: "clamp(0.9rem, 2.5vw, 1rem)", 
            color: "#999",
            fontStyle: "italic",
            padding: "0 1rem",
            textAlign: "center"
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
        marginTop: "1.5rem",
        paddingTop: "1.5rem",
        borderTop: "1px solid #eee",
        flexWrap: "wrap",
        gap: "1rem"
      }}>
        {/* Página secreta: solo botón de volver al inicio */}
        {isSecretPage ? (
          <Link 
            href="/"
            style={{
              display: "inline-block",
              padding: "clamp(0.6rem, 2vw, 0.8rem) clamp(1rem, 3vw, 1.5rem)",
              fontSize: "clamp(0.9rem, 2.5vw, 1rem)",
              backgroundColor: "#e74c3c",
              color: "white",
              textDecoration: "none",
              borderRadius: "8px",
              transition: "background-color 0.3s",
              minWidth: "120px",
              textAlign: "center"
            }}
            onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = "#c0392b"}
            onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = "#e74c3c"}
          >
            🤫 Volver al Inicio
          </Link>
        ) : (
          <>
            {/* Botón anterior */}
            <div style={{ flex: "1", textAlign: "left", minWidth: "120px" }}>
              <Link 
                href={prevPage}
                style={{
                  display: "inline-block",
                  padding: "clamp(0.6rem, 2vw, 0.8rem) clamp(1rem, 3vw, 1.5rem)",
                  fontSize: "clamp(0.8rem, 2.2vw, 1rem)",
                  backgroundColor: "#95a5a6",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "8px",
                  transition: "background-color 0.3s",
                  width: "100%",
                  textAlign: "center",
                  boxSizing: "border-box"
                }}
                onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = "#7f8c8d"}
                onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = "#95a5a6"}
              >
                {isFirstPage ? "← Carátula" : "← Anterior"}
              </Link>
            </div>

            {/* Indicador de página */}
            <div style={{ 
              fontSize: "clamp(0.8rem, 2.2vw, 1rem)", 
              color: "#7f8c8d",
              fontWeight: "bold",
              minWidth: "60px",
              textAlign: "center"
            }}>
              {currentPage} / {totalPages - 1}
            </div>

            {/* Botón siguiente */}
            <div style={{ flex: "1", textAlign: "right", minWidth: "120px" }}>
              <Link 
                href={nextPage}
                style={{
                  display: "inline-block",
                  padding: "clamp(0.6rem, 2vw, 0.8rem) clamp(1rem, 3vw, 1.5rem)",
                  fontSize: "clamp(0.8rem, 2.2vw, 1rem)",
                  backgroundColor: "#3498db",
                  color: "white",
                  textDecoration: "none",
                  borderRadius: "8px",
                  transition: "background-color 0.3s",
                  width: "100%",
                  textAlign: "center",
                  boxSizing: "border-box"
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
