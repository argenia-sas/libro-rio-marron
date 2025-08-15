// app/pagina/[id]/page.tsx
import Player from "./player";

export async function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
  }));
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function Pagina({ params }: PageProps) {
  return <Player id={params.id} />;
}