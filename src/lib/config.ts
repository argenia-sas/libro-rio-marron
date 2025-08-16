// lib/config.ts
export const BOOK_CONFIG = {
  title: "El Río Marrón",
  subtitle: "Un cuento interactivo con audio",
  totalPages: 21, // Páginas del 1 al 20 + carátula (home) + página secreta (0)
  
  // Función para obtener el número total de páginas
  // En el futuro, esto podría leer dinámicamente los archivos de audio
  getTotalPages: () => {
    return 21; // Por ahora, hardcodeado. Páginas del 0 al 20
  },
  
  // Metadatos de las páginas
  pages: {
    0: {
      title: "Página Secreta",
      subtitle: "Has encontrado la página secreta del libro",
      isHome: false,
      isSecret: true
    },
    // Las demás páginas se generan dinámicamente
  }
};

export function getPageMetadata(id: number) {
  if (id === 0) {
    return BOOK_CONFIG.pages[0];
  }
  
  return {
    title: `Página ${id}`,
    subtitle: `Contenido de la página ${id} del libro`,
    isHome: false,
    isSecret: false
  };
}
