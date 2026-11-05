import { Pages } from '@/src/constants/pages';

export function portfolioHref(courseSlug: string, portfolioKey: string) {
    return `${Pages.DESIGN_PORTFOLIOS}/${encodeURIComponent(courseSlug)}#${encodeURIComponent(portfolioKey)}`;
}

export function mapPortfolioToProjectItem(
    portfolio: {
        _key: string;
        image?: Asset;
        author?: string;
        title?: string;
    },
    courseSlug: string,
    categoryLabel: string,
    itemKey?: string,
): PROJECT_ITEM | null {
    if (!portfolio?.image?.asset || !courseSlug) return null;

    return {
        _key: itemKey || portfolio._key,
        title: portfolio.title || portfolio.author || '',
        category: categoryLabel,
        year: '',
        image: portfolio.image,
        href: portfolioHref(courseSlug, portfolio._key),
    };
}

export function mapPortfolioPicksToProjects(
    picks: SELECTED_WORK_PORTFOLIO_PICK[] | undefined,
): PROJECT_ITEM[] {
    return (picks || [])
        .map((pick) => {
            const portfolio = pick.portfolio;
            if (!portfolio) return null;
            return mapPortfolioToProjectItem(
                portfolio,
                pick.courseSlug || '',
                pick.courseLabel || '',
                pick._key,
            );
        })
        .filter(Boolean) as PROJECT_ITEM[];
}

export function mapCoursePortfoliosToProjects(
    portfolios: PORTFOLIO[] | undefined,
    courseSlug: string,
    courseLabel: string,
    limit = 10,
): PROJECT_ITEM[] {
    return (portfolios || [])
        .filter((item) => item?.image?.asset)
        .slice(0, limit)
        .map((item) => mapPortfolioToProjectItem(
            {
                _key: item._key,
                image: item.image,
                author: item.author,
                title: item.title_images_array?.[0]?.title,
            },
            courseSlug,
            courseLabel,
        ))
        .filter(Boolean) as PROJECT_ITEM[];
}
