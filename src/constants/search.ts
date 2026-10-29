/** Default debounce delay for list/table search inputs (ms). */
export const SEARCH_DEBOUNCE_MS = 400;

export function appendSearchParam(
  params: Record<string, string | number>,
  search: string,
): Record<string, string | number> {
  const trimmed = search.trim();
  if (trimmed) params.search = trimmed;
  return params;
}
