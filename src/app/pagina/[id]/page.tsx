// app/pagina/[id]/page.tsx
import Player from "./player";
import { BOOK_CONFIG } from "@/lib/config";

export async function generateStaticParams() {
  const totalPages = BOOK_CONFIG.getTotalPages();
  // Incluimos la página 0 (secreta) y las páginas del 1 al 20
  return Array.from({ length: totalPages }, (_, i) => ({
    id: String(i), // Genera páginas del 0 al 20
  }));
}

export default async function Pagina({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Player id={id} />;
}
