import createImageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '';

const imageBuilder = createImageUrlBuilder({ baseUrl: 'https://cdn.sanity.io', projectId, dataset });


export const urlForImage = (source, maxWidth = 1600) => {
  if (!source || !source.asset) return;

  const dimensions = source?.asset?._ref?.split("-")[2] || "";
  const [rawWidth, rawHeight] = dimensions.split("x").map((num) => parseInt(num, 10));
  const width = Number.isFinite(rawWidth) && rawWidth > 0 ? rawWidth : maxWidth;
  const height = Number.isFinite(rawHeight) && rawHeight > 0 ? rawHeight : maxWidth;
  const target = Math.max(1, Math.min(width, maxWidth));

  const url = imageBuilder
    .image(source)
    .auto("format")
    .width(target)
    .quality(75)
    .url();

  return {
    src: url,
    width: target,
    height: Math.max(1, Math.round(height * (target / width))),
  };
};
