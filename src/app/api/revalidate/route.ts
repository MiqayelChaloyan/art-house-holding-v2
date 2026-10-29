import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

import {
  collectRevalidationTargets,
  extractSanityDocumentTypes,
  getAllCacheTags,
} from '@/src/lib/cache/tags';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function isAuthorized(request: Request): boolean {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return false;
  }

  const url = new URL(request.url);
  const querySecret = url.searchParams.get('secret');
  const headerSecret = request.headers.get('x-sanity-revalidate-secret');

  return querySecret === secret || headerSecret === secret;
}

function applyTagRevalidation(tags: string[]): void {
  for (const tag of tags) {
    revalidateTag(tag);
  }
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 });
  }

  const documentTypes = extractSanityDocumentTypes(payload);

  // Sanity's default webhook only sends document ids — refresh everything when _type is absent.
  if (documentTypes.length === 0) {
    const tags = getAllCacheTags();
    applyTagRevalidation(tags);
    revalidatePath('/sitemap.xml');

    return NextResponse.json({
      ok: true,
      documentTypes: [],
      revalidated: tags,
      sitemap: true,
      mode: 'all-tags',
    });
  }

  const { tags, revalidateSitemap } = collectRevalidationTargets(documentTypes);
  const effectiveTags = tags.length > 0 ? tags : getAllCacheTags();

  applyTagRevalidation(effectiveTags);

  if (revalidateSitemap || tags.length === 0) {
    revalidatePath('/sitemap.xml');
  }

  return NextResponse.json({
    ok: true,
    documentTypes,
    revalidated: effectiveTags,
    sitemap: revalidateSitemap || tags.length === 0,
    mode: tags.length > 0 ? 'typed' : 'all-tags-fallback',
  });
}
