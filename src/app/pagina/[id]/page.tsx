// app/pagina/[id]/page.tsx
import Player from "./player";

export async function generateStaticParams() {
  return Array.from({ length: 21 }, (_, i) => ({
    id: String(i),
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
