// lib/config.ts
export const BOOK_CONFIG = {
  title: "El Río Marrón",
  subtitle: "Un cuento interactivo con audio",
  
  // Función para obtener el número total de páginas
  // En el futuro, esto podría leer dinámicamente las carpetas de assets
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

// Función para obtener la carpeta de assets de una página
export function getPageAssetFolder(pageId: number): string | null {
  // Lista de carpetas conocidas (en el futuro esto podría ser dinámico)
  const assetFolders: { [key: number]: string } = {
    1: "1-hornero",
    2: "2-nido-hornero", 
    3: "3-pajaro-carpintero",
    4: "4-nido-pajaro-carpintero",
    5: "5-tijereta",
    6: "6-nido-tijereta",
    7: "7-tero",
    8: "8-nido-tero",
    9: "9-paloma",
    10: "10-nido-paloma",
    11: "11-gorrion",
    12: "12-nido-gorrion",
    13: "13-loro",
    14: "14-nido-loro",
    15: "15-zorzal",
    16: "16-nido-zorzal",
    17: "17-calandria",
    18: "18-nido-calandria",
    19: "19-benteveo",
    20: "20-nido-benteveo"
  };
  
  return assetFolders[pageId] || null;
}

// Función para obtener las URLs de audio e imagen de una página
export function getPageAssets(pageId: number) {
  const folder = getPageAssetFolder(pageId);
  
  if (!folder) {
    return {
      audioUrl: null,
      imageUrl: null,
      hasAssets: false
    };
  }
  
  // Extraer el nombre base del archivo (después del número y guión)
  const baseName = folder.split('-').slice(1).join('-');
  
  return {
    audioUrl: `/assets/${folder}/${baseName}.ogg`,
    imageUrl: `/assets/${folder}/${baseName}.jpeg`,
    hasAssets: true,
    folderName: folder,
    baseName: baseName
  };
}
