'use client';

import React from 'react';

import { BlogSiteKey } from '@/src/components/blog/config';

import Block from './Block';
import BlogDetailSkeleton from './BlogDetailSkeleton';
import BlogListSkeleton from './BlogListSkeleton';
import PostCardSkeleton from './PostCardSkeleton';

export {
    Block,
    BlogDetailSkeleton,
    BlogListSkeleton,
    PostCardSkeleton,
};

export type { BlogSkeletonTone } from './Block';

export default BlogListSkeleton;
