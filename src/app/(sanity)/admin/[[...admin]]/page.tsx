
import Studio from '../studio';

export const dynamic = 'force-dynamic';

export { metadata } from 'next-sanity/studio/metadata';
export { viewport } from 'next-sanity/studio/viewport';

export default function StudioPage() {
  return <Studio />
};