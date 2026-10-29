import 'server-only';

import { draftMode } from 'next/headers';
import { type QueryOptions, type QueryParams } from 'next-sanity';
import { client } from '@/sanity/client';


/** Default ISR window when no Sanity webhook fires (seconds). */
const DEFAULT_REVALIDATE_SECONDS = 60;

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = DEFAULT_REVALIDATE_SECONDS,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  const isDraftMode = draftMode().isEnabled;

  const dynamicRevalidate = isDraftMode ? 0 : revalidate;

  return client.fetch<QueryResponse>(query, params, {
    ...(isDraftMode &&
      ({
        perspective: "previewDrafts",
        stega: true,
      } satisfies QueryOptions)),
    next: {
      revalidate: dynamicRevalidate,
      tags,
    },
  });
};