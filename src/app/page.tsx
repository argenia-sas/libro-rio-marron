// app/page.tsx
"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main style={{ 
      padding: "2rem", 
      textAlign: "center",
      maxWidth: "800px",
      margin: "0 auto",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}>
      {/* Título principal */}
      <h1 style={{ 
        fontSize: "3rem", 
        marginBottom: "2rem",
        color: "#2c3e50",
        fontFamily: "serif"
      }}>
        El Río Marrón
      </h1>

      {/* Imagen de carátula */}
      <div style={{ 
        marginBottom: "2rem",
        display: "flex",
        justifyContent: "center"
      }}>
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
          Imagen de Carátula
          <br />
          (coloca tu imagen en /public/images/caratula.jpg)
        </div>
      </div>

      {/* Subtítulo */}
      <p style={{ 
        fontSize: "1.5rem", 
        marginBottom: "3rem",
        color: "#7f8c8d",
        fontStyle: "italic"
      }}>
        Un cuento interactivo con audio
      </p>

      {/* Botón de navegación */}
      <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
        <Link 
          href="/pagina/1"
          style={{
            display: "inline-block",
            padding: "1rem 2rem",
            fontSize: "1.2rem",
            backgroundColor: "#3498db",
            color: "white",
            textDecoration: "none",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.3s"
          }}
          onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = "#2980b9"}
          onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.backgroundColor = "#3498db"}
        >
          Comenzar Lectura →
        </Link>
      </div>
    </main>
  );
}
