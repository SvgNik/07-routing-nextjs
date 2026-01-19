import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesFilterClient from "./NotesFilter.client";

interface PageProps {
  params: Promise<{ tag: string[] }>;
}

export default async function NotesFilterPage({ params }: PageProps) {
  const resolvedParams = await params;

  const tag = resolvedParams.tag[0] || "all";

  const queryClient = new QueryClient();
  const PER_PAGE = 6;

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes({ page: 1, perPage: PER_PAGE, search: "", tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesFilterClient key={tag} />
    </HydrationBoundary>
  );
}
