// app/pagina/[id]/page.tsx
import Player from "./player";

export async function generateStaticParams() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default async function Pagina({
  params,
}: {
  params: { id: string };
}) {
  return <Player id={params.id} />;
}
