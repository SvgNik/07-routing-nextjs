import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesFilterPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug =
    resolvedParams.slug && resolvedParams.slug.length > 0
      ? resolvedParams.slug[0]
      : "all";

  const queryClient = new QueryClient();
  const PER_PAGE = 6;

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", slug],
    queryFn: () =>
      fetchNotes({ page: 1, perPage: PER_PAGE, search: "", tag: slug }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={slug} />
    </HydrationBoundary>
  );
}
