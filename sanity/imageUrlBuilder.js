import createImageUrlBuilder from '@sanity/image-url';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '';

const imageBuilder = createImageUrlBuilder({ baseUrl: 'https://cdn.sanity.io', projectId, dataset });


export const urlForImage = source => {
  if (!source || !source.asset) return;
  const dimensions = source?.asset?._ref.split("-")[2];

  const [width, height] = dimensions
    .split("x")
    .map(num => parseInt(num, 10));

  const url = imageBuilder
    .image(source)
    .auto("format")
    .width(Math.min(width, "2000"))
    .url();

  return {
    src: url,
    width: width,
    height: height
  };
};
