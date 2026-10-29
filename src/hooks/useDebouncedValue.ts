import { useEffect, useState } from 'react';

import { SEARCH_DEBOUNCE_MS } from '@/src/constants/search';

/**
 * Returns a debounced copy of `value`.
 * Clears immediately when `value` becomes empty (no debounce on reset).
 */
export function useDebouncedValue<T>(value: T, delayMs = SEARCH_DEBOUNCE_MS): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const isEmptyString = typeof value === 'string' && !value.trim();
    const delay = isEmptyString ? 0 : delayMs;

    const timer = window.setTimeout(() => setDebounced(value), delay);
    return () => window.clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

/**
 * Debounced search text safe for API calls — only updates once debounced value
 * matches the current input (avoids stale partial queries while typing).
 */
export function useSyncedDebouncedSearch(input: string, delayMs = SEARCH_DEBOUNCE_MS): string {
  const debounced = useDebouncedValue(input, delayMs);
  const [applied, setApplied] = useState(() => input.trim());

  useEffect(() => {
    const trimmed = debounced.trim();
    if (trimmed !== input.trim()) return;
    setApplied(trimmed);
  }, [debounced, input]);

  return applied;
}
