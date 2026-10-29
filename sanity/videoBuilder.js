import { getFileAsset } from '@sanity/asset-utils';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const VideoPreview = video => {
    const videoAsset = getFileAsset(video, {
        projectId,
        dataset
    });

    return videoAsset;
};

export default VideoPreview;